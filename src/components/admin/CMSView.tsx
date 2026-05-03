import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import {
  Plus, Trash2, Edit, Loader2, RefreshCw,
  ShieldCheck, Search, ChevronRight, X, Image as ImageIcon
} from "lucide-react";
import { categoryTypes, knowledgeCategories } from "../../data/types";
import { mockListings } from "../../data/mockListings";
import { mockEvents, mockNews, mockKnowledge } from "../../data/mockContent";
import { api } from "../../utils/api";
import { performAuthenticatedAction } from "./supabaseAdmin";
import { Label, ImageUploader } from "./AdminUI";
import type { Session } from "@supabase/supabase-js";

const titles: Record<string, string> = {
    listings: "Directory",
    events: "Events",
    news: "News",
    knowledge: "Explore"
};

interface CMSViewProps {
    type: string;
    session: Session;
}

export function CMSView({ type, session }: CMSViewProps) {
    const [items, setItems] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await api.getContent(type as 'listings' | 'events' | 'news' | 'knowledge', true);
          setItems(data as Record<string, unknown>[]);
          setSelectedItem(null);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Failed to load content");
          toast.error("Connection failed. Please retry.");
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    const handleCreateNew = () => {
        const defaultValues: Record<string, Record<string, unknown>> = {
            listings: { name: 'New Community', category: 'Community Space', location: { city: '', country: '' }, tags: [], offerings: [] },
            events: { title: 'New Event', description: '', startDate: new Date().toISOString(), location: { type: 'in-person' }, price: { type: 'paid' }, tags: [] },
            news: { title: 'New Article', content: '', category: 'insight', tags: [], publishedAt: new Date().toISOString() },
            knowledge: { title: 'New Wisdom', content: '', category: 'foundational-knowledge', tags: [], publishedAt: new Date().toISOString() }
        };
        setSelectedItem({ ...defaultValues[type], id: 'new' });
    };

    const handleSave = async (formData: Record<string, unknown>) => {
        const isNew = formData.id === 'new';
        const finalId = isNew ? crypto.randomUUID() : formData.id;

        const newItem = {
            ...formData,
            id: finalId,
            updatedAt: new Date().toISOString(),
            createdAt: (formData.createdAt as string) || new Date().toISOString()
        };

        const updatedItems = isNew
          ? [newItem, ...items]
          : items.map(i => i.id === newItem.id ? newItem : i);

        setItems(updatedItems);
        if (isNew) setSelectedItem(newItem);

        try {
          await performAuthenticatedAction((token) => api.saveContent(type, updatedItems, token));
          toast.success("Saved successfully");
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "";
          if (message === "No active session. Please sign in.") {
              toast.error("Session expired. Please reload the page to reconnect.", {
                  action: { label: "Reload", onClick: () => window.location.reload() }
              });
          } else {
              toast.warning("Saved locally only. Server sync failed.", {
                  description: "Your changes are saved to this device but not the server. Try again later."
              });
          }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this item permanently?")) return;

        const updatedItems = items.filter(i => i.id !== id);
        setItems(updatedItems);
        setSelectedItem(null);

        try {
          await performAuthenticatedAction((token) => api.saveContent(type, updatedItems, token));
          toast.success("Item deleted");
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "";
          if (message === "No active session. Please sign in.") {
              toast.error("Session expired. Please reload.", {
                  action: { label: "Reload", onClick: () => window.location.reload() }
              });
          } else {
              toast.warning("Deleted locally only. Server sync failed.");
          }
        }
    };

    const handleImportMock = async () => {
        if(!confirm(`Overwrite current ${type} with mock data? This will replace existing items.`)) return;

        const toastId = toast.loading("Importing mock data...");

        let mockData: Record<string, unknown>[] = [];
        if (type === 'listings') mockData = mockListings as unknown as Record<string, unknown>[];
        else if (type === 'events') mockData = mockEvents as unknown as Record<string, unknown>[];
        else if (type === 'news') mockData = mockNews as unknown as Record<string, unknown>[];
        else if (type === 'knowledge') mockData = mockKnowledge as unknown as Record<string, unknown>[];

        setItems(mockData);

        try {
          await performAuthenticatedAction((token) => api.saveContent(type, mockData, token));
          toast.success(`Successfully imported ${mockData.length} items`, { id: toastId });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "";
            if (message === "No active session. Please sign in.") {
                toast.error("Session expired. Reload to reconnect.", { id: toastId });
            } else {
                toast.warning("Imported locally only. Server sync failed.", { id: toastId });
            }
        }
    };

    const filteredItems = items.filter(item => {
        const term = searchQuery.toLowerCase();
        const name = ((item.name || item.title || '') as string).toLowerCase();
        return name.includes(term);
    });

    return (
        <>
            {/* Pane 2: List View */}
            <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col z-10">
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-[#1d1d1f] text-lg">{titles[type]}</h2>
                        <div className="flex gap-2">
                             <Button variant="ghost" size="icon" onClick={fetchData} className="h-8 w-8 text-gray-400">
                                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                             </Button>
                             {items.length > 0 && (
                                <Button variant="ghost" size="icon" onClick={() => {
                                    if(confirm(`Are you sure you want to DELETE ALL ${items.length} items in ${titles[type]}? This cannot be undone.`)) {
                                        setItems([]);
                                        setSelectedItem(null);
                                        performAuthenticatedAction((token) => api.saveContent(type, [], token))
                                            .then(() => toast.success("All items deleted"))
                                            .catch((err) => {
                                                const msg = err instanceof Error ? err.message : "";
                                                if (msg === "No active session. Please sign in.") {
                                                    toast.error("Session expired. Please reload.");
                                                } else {
                                                    toast.warning("Deleted locally only. Server sync failed.");
                                                }
                                            });
                                    }
                                }} className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                             )}
                             <Button size="sm" onClick={handleCreateNew} className="bg-[#7935F8] hover:bg-[#6929d6] h-8 text-xs px-3">
                                <Plus className="w-3 h-3 mr-1" /> New
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search ${titles[type]}...`}
                            className="pl-9 bg-gray-50 border-transparent focus:bg-white text-sm h-9 rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {loading ? (
                        <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-gray-300" /></div>
                    ) : error ? (
                        <div className="text-center py-12 px-4 space-y-4">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Connection Failed</p>
                                <p className="text-xs text-gray-500 mt-1">Could not fetch data from server.</p>
                            </div>
                            <Button size="sm" onClick={fetchData} className="w-full bg-[#7935F8]">
                                <RefreshCw className="w-3 h-3 mr-2" /> Retry Connection
                            </Button>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <p className="text-sm text-gray-400 mb-4">No items found</p>
                            <Button variant="outline" size="sm" onClick={handleImportMock} className="text-xs w-full">
                                Import Mock Data
                            </Button>
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div
                                key={item.id as string}
                                onClick={() => setSelectedItem(item)}
                                className={`
                                    group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border
                                    ${selectedItem?.id === item.id
                                        ? 'bg-[#F5F5F7] border-gray-200 shadow-sm'
                                        : 'bg-white border-transparent hover:bg-gray-50'
                                    }
                                `}
                            >
                                <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                                    {item.image ? (
                                        <img src={item.image as string} alt={(item.title || "Content preview") as string} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-4 h-4" /></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-medium truncate ${selectedItem?.id === item.id ? 'text-[#7935F8]' : 'text-gray-900'}`}>
                                        {(item.name || item.title) as string}
                                    </div>
                                    <div className="text-[11px] text-gray-400 truncate mt-0.5">
                                        {(item.category || new Date(item.createdAt as string).toLocaleDateString()) as string}
                                    </div>
                                </div>
                                <ChevronRight className={`w-4 h-4 text-gray-300 ${selectedItem?.id === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pane 3: Editor View */}
            <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative">
                {selectedItem ? (
                    <ItemEditor
                        key={selectedItem.id as string}
                        type={type}
                        item={selectedItem}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onClose={() => setSelectedItem(null)}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-[#FBFBFD]">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                            <Edit className="w-8 h-8 text-gray-200" />
                        </div>
                        <p className="font-medium text-gray-400">Select an item to edit</p>
                    </div>
                )}
            </div>
        </>
    );
}

interface ItemEditorProps {
    type: string;
    item: Record<string, unknown>;
    onSave: (data: Record<string, unknown>) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

function ItemEditor({ type, item, onSave, onDelete, onClose }: ItemEditorProps) {
    const [formData, setFormData] = useState<Record<string, unknown>>(item);
    const [isDirty, setIsDirty] = useState(false);

    const handleChange = (field: string, value: unknown) => {
        setIsDirty(true);
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: { ...(prev[parent] as Record<string, unknown>), [child]: value }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleSaveClick = () => {
        onSave(formData);
        setIsDirty(false);
    };

    const handleArrayAdd = (field: string, value: string) => {
        if (!value.trim()) return;
        setFormData((prev) => ({
            ...prev,
            [field]: [...((prev[field] as string[]) || []), value]
        }));
        setIsDirty(true);
    };

    const handleArrayRemove = (field: string, index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: ((prev[field] as string[]) || []).filter((_, i) => i !== index)
        }));
        setIsDirty(true);
    };

    const location = formData.location as Record<string, unknown> | undefined;
    const price = formData.price as Record<string, unknown> | undefined;

    return (
        <div className="flex flex-col h-full">
            {/* Editor Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                        <X className="w-5 h-5" />
                    </Button>
                    <h2 className="text-xl font-bold text-[#1d1d1f]">
                        {(formData.name || formData.title || 'Untitled') as string}
                    </h2>
                    {isDirty && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Unsaved changes</span>}
                </div>
                <div className="flex items-center gap-2">
                    {item.id !== 'new' && (
                        <Button variant="ghost" onClick={() => onDelete(item.id as string)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleSaveClick} className="bg-[#7935F8] hover:bg-[#6929d6] shadow-lg shadow-[#7935F8]/20 min-w-[100px]">
                        Save
                    </Button>
                </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-8 lg:px-12 bg-[#FBFBFD]">
                <div className="max-w-4xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="xl:col-span-2 space-y-8">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <h3 className="text-sm font-bold text-gray-900">Basic Information</h3>
                            <div className="space-y-3">
                                <Label>{type === 'listings' ? 'Directory Name' : 'Title'}</Label>
                                <Input
                                    value={(formData.name || formData.title || '') as string}
                                    onChange={e => handleChange(type === 'listings' ? 'name' : 'title', e.target.value)}
                                    className="text-lg h-12"
                                    placeholder="Enter title..."
                                />
                            </div>
                            <div className="space-y-3">
                                <Label>{type === 'listings' ? 'About' : 'Content / Description'}</Label>
                                <textarea
                                    className="w-full min-h-[240px] rounded-xl border border-gray-200 focus:border-[#7935F8] focus:ring-4 focus:ring-[#7935F8]/10 p-4 text-sm outline-none transition-all resize-none leading-relaxed"
                                    value={(formData.about || formData.description || formData.content || '') as string}
                                    onChange={e => handleChange(type === 'listings' ? 'about' : type === 'events' ? 'description' : 'content', e.target.value)}
                                    placeholder="Start writing..."
                                />
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <h3 className="text-sm font-bold text-gray-900">Details</h3>
                            {(type === 'listings' || type === 'events') && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <Label>City</Label>
                                        <Input value={(location?.city || '') as string} onChange={e => handleChange('location.city', e.target.value)} />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Country</Label>
                                        <Input value={(location?.country || '') as string} onChange={e => handleChange('location.country', e.target.value)} />
                                    </div>
                                </div>
                            )}
                            {type === 'events' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label>Start Date</Label>
                                            <Input type="date" value={formData.startDate ? (formData.startDate as string).split('T')[0] : ''} onChange={e => handleChange('startDate', new Date(e.target.value).toISOString())} />
                                        </div>
                                        <div className="space-y-3">
                                            <Label>End Date</Label>
                                            <Input type="date" value={formData.endDate ? (formData.endDate as string).split('T')[0] : ''} onChange={e => handleChange('endDate', new Date(e.target.value).toISOString())} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label>Location Type</Label>
                                            <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#7935F8]" value={(location?.type || 'in-person') as string} onChange={e => handleChange('location.type', e.target.value)}>
                                                <option value="in-person">In-Person</option>
                                                <option value="online">Online</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label>Organizer</Label>
                                            <Input value={(formData.organizer || '') as string} onChange={e => handleChange('organizer', e.target.value)} placeholder="Event organizer..." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label>Price Type</Label>
                                            <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#7935F8]" value={(price?.type || 'free') as string} onChange={e => handleChange('price.type', e.target.value)}>
                                                <option value="free">Free</option>
                                                <option value="paid">Paid</option>
                                                <option value="donation">Donation</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label>Price Amount</Label>
                                            <Input value={(price?.amount || '') as string} onChange={e => handleChange('price.amount', e.target.value)} placeholder="e.g. 150" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <div className="space-y-3">
                                <Label>Category</Label>
                                <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#7935F8]" value={(formData.category || '') as string} onChange={e => handleChange('category', e.target.value)}>
                                    {type === 'listings' && categoryTypes.map(c => <option key={c} value={c}>{c}</option>)}
                                    {type === 'events' && ['Workshop', 'Retreat', 'Ceremony', 'Class', 'Gathering'].map(c => <option key={c} value={c}>{c}</option>)}
                                    {type === 'news' && ['insight', 'story', 'research', 'announcement'].map(c => <option key={c} value={c}>{c}</option>)}
                                    {type === 'knowledge' && knowledgeCategories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                                </select>
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <h3 className="text-sm font-bold text-gray-900">Media</h3>
                            <ImageUploader
                                currentImage={(formData.image || '') as string}
                                onImageChange={(url: string) => handleChange('image', url)}
                            />
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <div className="space-y-3">
                                <Label>External Link / Website</Label>
                                <Input
                                    value={(formData.website || (location?.url as string) || '') as string}
                                    onChange={e => type === 'events' ? handleChange('location.url', e.target.value) : handleChange('website', e.target.value)}
                                    placeholder="https://"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Tags</Label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {((formData.tags as string[]) || []).map((tag: string, i: number) => (
                                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center gap-1">
                                            {tag}
                                            <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleArrayRemove('tags', i)} />
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        id="tag-input"
                                        placeholder="Add tag"
                                        className="h-9 text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const input = e.target as HTMLInputElement;
                                                handleArrayAdd('tags', input.value);
                                                input.value = '';
                                            }
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const input = document.getElementById('tag-input') as HTMLInputElement;
                                            handleArrayAdd('tags', input.value);
                                            input.value = '';
                                        }}
                                        className="rounded-lg px-3 border-gray-200"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {type === 'listings' && (
                                <div className="space-y-3">
                                    <Label>Essence / Tagline</Label>
                                    <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7935F8] outline-none" rows={3} value={(formData.essence || '') as string} onChange={e => handleChange('essence', e.target.value)} placeholder="Short essence of the community..." />
                                </div>
                            )}

                            {type === 'news' && (
                                <>
                                    <div className="space-y-3">
                                        <Label>Excerpt</Label>
                                        <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7935F8] outline-none" rows={2} value={(formData.excerpt || '') as string} onChange={e => handleChange('excerpt', e.target.value)} placeholder="Short summary shown in lists..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3"><Label>Author</Label><Input value={(formData.author || '') as string} onChange={e => handleChange('author', e.target.value)} placeholder="Author name" /></div>
                                        <div className="space-y-3"><Label>Read Time</Label><Input value={(formData.readTime || '') as string} onChange={e => handleChange('readTime', e.target.value)} placeholder="e.g. 5 min read" /></div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Published Date</Label>
                                        <Input type="date" value={formData.publishedAt ? (formData.publishedAt as string).split('T')[0] : ''} onChange={e => handleChange('publishedAt', new Date(e.target.value).toISOString())} />
                                    </div>
                                </>
                            )}

                            {type === 'knowledge' && (
                                <>
                                    <div className="space-y-3">
                                        <Label>Excerpt</Label>
                                        <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7935F8] outline-none" rows={2} value={(formData.excerpt || '') as string} onChange={e => handleChange('excerpt', e.target.value)} placeholder="Short summary shown in lists..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3"><Label>URL Slug</Label><Input value={(formData.slug || '') as string} onChange={e => handleChange('slug', e.target.value)} placeholder="e.g. understanding-integration" /></div>
                                        <div className="space-y-3"><Label>Read Time</Label><Input value={(formData.readTime || '') as string} onChange={e => handleChange('readTime', e.target.value)} placeholder="e.g. 5 min read" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label>Published Date</Label>
                                            <Input type="date" value={formData.publishedAt ? (formData.publishedAt as string).split('T')[0] : ''} onChange={e => handleChange('publishedAt', new Date(e.target.value).toISOString())} />
                                        </div>
                                        <div className="space-y-3 flex items-end">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={(formData.featured as boolean) || false} onChange={e => handleChange('featured', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#7935F8] focus:ring-[#7935F8]" />
                                                <span className="text-sm text-gray-700">Featured article</span>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
