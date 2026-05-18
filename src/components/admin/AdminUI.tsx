import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import {
  Trash2, Upload, Link as LinkIcon, Loader2,
  Users, Calendar, Newspaper, BookOpen, Settings
} from "lucide-react";
import { projectId } from "../../utils/supabase/info";
import { api } from "../../utils/api";
import { performAuthenticatedAction } from "./supabaseAdmin";

export function Label({ children }: { children: React.ReactNode }) {
    return <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">{children}</label>;
}

interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon: string;
}

export function NavButton({ active, onClick, children, icon }: NavButtonProps) {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
        users: Users,
        calendar: Calendar,
        news: Newspaper,
        book: BookOpen,
        settings: Settings,
        upload: Upload
    };
    const Icon = icons[icon];

    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                    ? 'bg-[#7935F8]/5 text-[#7935F8]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-[#7935F8]' : 'text-gray-400'}`} />
            {children}
        </button>
    );
}

interface ImageUploaderProps {
    currentImage: string;
    onImageChange: (url: string) => void;
}

export function ImageUploader({ currentImage, onImageChange }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [useUrl, setUseUrl] = useState(!!currentImage && !currentImage.includes(projectId));

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];

        try {
            const result = await performAuthenticatedAction((token) => api.uploadFile(file, token)) as { url: string; localOnly?: boolean };
            onImageChange(result.url);
            toast.success(result.localOnly ? "Image preview loaded (local only)" : "Image uploaded!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-3">
             <div className="flex items-center justify-between">
                <Label>Cover Image</Label>
                <button
                    onClick={() => setUseUrl(!useUrl)}
                    className="text-[10px] text-[#7935F8] font-medium hover:underline flex items-center gap-1"
                >
                    {useUrl ? <><Upload className="w-3 h-3" /> Switch to Upload</> : <><LinkIcon className="w-3 h-3" /> Use URL instead</>}
                </button>
             </div>

             <div className="h-40 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 border-dashed relative group hover:border-[#7935F8]/50 transition-colors">
                {currentImage ? (
                    <>
                        <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="sm" onClick={() => onImageChange('')} className="rounded-full bg-white text-red-500 hover:text-red-600 hover:bg-white">
                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        {useUrl ? (
                            <div className="w-full px-4">
                                <Input
                                    placeholder="https://..."
                                    className="bg-white text-center text-xs h-8"
                                    onChange={(e) => onImageChange(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <>
                                <div
                                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin text-[#7935F8]" /> : <Upload className="w-5 h-5 text-gray-400" />}
                                </div>
                                <span className="text-xs font-medium text-gray-500">Upload Image</span>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
             </div>
        </div>
    );
}
