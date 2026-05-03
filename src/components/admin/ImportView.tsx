import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2, Upload, Users, Newspaper, BookOpen, FileText } from "lucide-react";
import { api } from "../../utils/api";
import { parseCSV, mapDirectoryCSV, mapNewsCSV, mapExploreCSV } from "../../utils/csvImport";
import { performAuthenticatedAction } from "./supabaseAdmin";

type ContentType = 'listings' | 'news' | 'knowledge';

interface ImportViewProps {
    session: unknown;
}

export function ImportView({ session: _session }: ImportViewProps) {
    const [stats, setStats] = useState<Record<ContentType, number>>({ listings: 0, news: 0, knowledge: 0 });
    const [previews, setPreviews] = useState<Record<ContentType, Record<string, unknown>[]>>({ listings: [], news: [], knowledge: [] });
    const [importing, setImporting] = useState<string | null>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: ContentType) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            const rows = parseCSV(text);

            let mappedData: Record<string, unknown>[] = [];
            if (type === 'listings') mappedData = mapDirectoryCSV(rows);
            else if (type === 'news') mappedData = mapNewsCSV(rows);
            else if (type === 'knowledge') mappedData = mapExploreCSV(rows);

            setStats(prev => ({ ...prev, [type]: mappedData.length }));
            setPreviews(prev => ({ ...prev, [type]: mappedData }));
            toast.success(`Parsed ${mappedData.length} items for ${type}`);
        };
        reader.readAsText(file);
    };

    const handleImport = async (type: ContentType) => {
        if (previews[type].length === 0) return;
        if (!confirm(`Are you sure you want to import ${previews[type].length} items into ${type}? This will merge with existing data.`)) return;

        setImporting(type);
        const toastId = toast.loading(`Importing ${type}...`);

        try {
            const existing = await performAuthenticatedAction((token) => api.getContent(type, true)) as Record<string, unknown>[];

            const newItems = previews[type];
            const mergedMap = new Map<string, Record<string, unknown>>();
            existing.forEach((item) => mergedMap.set(item.id as string, item));

            newItems.forEach((newItem) => {
                let existingId: string | null = null;

                if (type === 'knowledge') {
                    const found = existing.find((e) => (e as { slug?: string }).slug === (newItem as { slug?: string }).slug);
                    if (found) existingId = found.id as string;
                } else if (type === 'news') {
                     const found = existing.find((e) => (e as { title?: string }).title === (newItem as { title?: string }).title);
                     if (found) existingId = found.id as string;
                } else if (type === 'listings') {
                    if (mergedMap.has(newItem.id as string)) existingId = newItem.id as string;
                }

                if (existingId) {
                    const old = mergedMap.get(existingId);
                    mergedMap.set(existingId, { ...old, ...newItem, id: existingId });
                } else {
                    mergedMap.set(newItem.id as string, newItem);
                }
            });

            const finalData = Array.from(mergedMap.values());
            await performAuthenticatedAction((token) => api.saveContent(type, finalData, token));
            toast.success(`Imported successfully! Total items: ${finalData.length}`, { id: toastId });

            setPreviews(prev => ({ ...prev, [type]: [] }));
            setStats(prev => ({ ...prev, [type]: 0 }));

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Import failed";
            if (message === "No active session. Please sign in.") {
                toast.error("Session expired. Please reload to reconnect.", { id: toastId });
            } else {
                toast.error(`Import failed: ${message}`, { id: toastId });
            }
        } finally {
            setImporting(null);
        }
    };

    const cards: { type: ContentType; icon: typeof Users; label: string; file: string; color: string }[] = [
        { type: 'listings', icon: Users, label: 'Directory', file: 'listings.csv', color: 'blue' },
        { type: 'news', icon: Newspaper, label: 'News', file: 'news-articles.csv', color: 'purple' },
        { type: 'knowledge', icon: BookOpen, label: 'Explore', file: 'explore-articles.csv', color: 'emerald' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-[#1d1d1f]">Content Import</h1>
                <p className="text-gray-500">Bulk import content from CSV files. Please ensure your CSV headers match the expected format.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map(({ type, icon: Icon, label, file, color }) => (
                    <div key={type} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{label}</h3>
                                <p className="text-xs text-gray-400">{file}</p>
                            </div>
                        </div>

                        <div className={`border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-${color}-500 hover:bg-${color}-50 transition-colors cursor-pointer relative`}>
                            <input
                                type="file"
                                accept=".csv"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleFileSelect(e, type)}
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <span className="text-xs text-gray-500 font-medium">Click to upload CSV</span>
                        </div>

                        {stats[type] > 0 && (
                            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                                 <FileText className="w-4 h-4" />
                                 Found {stats[type]} items
                            </div>
                        )}

                        <Button
                            className="w-full bg-[#1d1d1f] text-white hover:bg-black"
                            disabled={stats[type] === 0 || importing === type}
                            onClick={() => handleImport(type)}
                        >
                            {importing === type ? <Loader2 className="w-4 h-4 animate-spin" /> : `Import ${label}`}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
