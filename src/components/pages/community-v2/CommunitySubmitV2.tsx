import { useState } from "react";
import { Send, Image, MapPin, Tag, FileText, Store, Newspaper, Calendar, ChevronDown, Check, X, Plus, Link } from "lucide-react";
import { toast } from "sonner";

type SubmitType = "article" | "directory" | "event" | "news";

const SUBMIT_TYPES = [
  { id: "article" as const, label: "Article / Resource", icon: FileText, description: "Share a guide, essay, or educational resource" },
  { id: "directory" as const, label: "Directory Listing", icon: Store, description: "Submit a retreat center, practitioner, or space" },
  { id: "event" as const, label: "Event", icon: Calendar, description: "Share an upcoming workshop, ceremony, or gathering" },
  { id: "news" as const, label: "News", icon: Newspaper, description: "Submit a relevant news story or announcement" },
];

const SUGGESTED_TAGS = [
  "Psychedelics", "Breathwork", "Meditation", "Plant Medicine", "Integration",
  "Retreat", "Ceremony", "Research", "Wellness", "Community", "Yoga", "Nature"
];

export function CommunitySubmitV2() {
  const [type, setType] = useState<SubmitType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const addCustomTag = () => {
    const t = customTag.trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
      setCustomTag("");
    }
  };

  const handleSubmit = async () => {
    if (!type || !title.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Submitted for review!");
  };

  const reset = () => {
    setType(null);
    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
    setLocation("");
    setDate("");
    setTags([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#066237]/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#066237]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#e8e0d8]">Submitted for review</h2>
          <p className="text-[#857c73] text-sm max-w-sm mx-auto leading-relaxed">
            The FTO team will review your submission and curate it for the platform. You'll be notified once it's published.
          </p>
        </div>
        <button
          onClick={reset}
          className="text-sm font-medium text-[#7935F8] hover:text-[#B197FF] transition-colors"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#e8e0d8]">Submit to FTO</h2>
        <p className="text-sm text-[#857c73]">
          Share a resource, listing, or event with the community. All submissions are reviewed by the FTO team before publishing.
        </p>
      </div>

      {/* Type Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest">What are you submitting?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUBMIT_TYPES.map((t) => {
            const Icon = t.icon;
            const isActive = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-[#7935F8]/30 bg-[#7935F8]/[0.06]"
                    : "border-white/[0.06] bg-[#252220] hover:border-white/[0.12]"
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-[#7935F8]/10 text-[#7935F8]" : "bg-white/[0.04] text-[#6b635b]"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${isActive ? "text-[#e8e0d8]" : "text-[#b8afa6]"}`}>{t.label}</p>
                  <p className="text-[11px] text-[#6b635b] mt-0.5 leading-relaxed">{t.description}</p>
                </div>
                {isActive && (
                  <Check className="w-4 h-4 text-[#7935F8] shrink-0 mt-1 ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Fields — only show after type is selected */}
      {type && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === "directory" ? "e.g. Sacred Valley Retreat Center" : type === "event" ? "e.g. Full Moon Breathwork Ceremony" : "e.g. The Science of Integration"}
              className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your submission..."
              rows={4}
              className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all resize-none"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest flex items-center gap-1.5">
              <Link className="w-3 h-3" />
              Link / URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest flex items-center gap-1.5">
              <Image className="w-3 h-3" />
              Cover Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all"
            />
            {imageUrl && (
              <div className="mt-2 h-32 rounded-lg bg-[#1f1c1a] border border-white/[0.06] overflow-hidden">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </div>

          {/* Location — for directory & events */}
          {(type === "directory" || type === "event") && (
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={type === "event" ? "e.g. Online (Zoom) or Amsterdam, NL" : "e.g. Cusco, Peru"}
                className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all"
              />
            </div>
          )}

          {/* Date — for events */}
          {type === "event" && (
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Saturday, April 12 at 10:00 AM CET"
                className="w-full bg-[#252220] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:ring-1 focus:ring-[#7935F8]/20 focus:border-[#7935F8]/30 transition-all"
              />
            </div>
          )}

          {/* Tags */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected
                        ? "bg-[#7935F8]/15 text-[#B197FF] border border-[#7935F8]/20"
                        : "bg-[#252220] text-[#6b635b] border border-white/[0.06] hover:text-[#9e958c] hover:border-white/[0.1]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {/* Custom tag input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
                placeholder="Add custom tag..."
                className="flex-1 bg-[#252220] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-[#e8e0d8] placeholder:text-[#524b45] focus:outline-none focus:border-white/[0.12] transition-colors"
              />
              <button
                onClick={addCustomTag}
                disabled={!customTag.trim()}
                className="p-2 rounded-lg text-[#6b635b] hover:text-[#9e958c] disabled:opacity-30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {/* Selected custom tags */}
            {tags.filter(t => !SUGGESTED_TAGS.includes(t)).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.filter(t => !SUGGESTED_TAGS.includes(t)).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-[#7935F8]/15 text-[#B197FF] border border-[#7935F8]/20">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submission info */}
          <div className="rounded-xl bg-[#7935F8]/[0.04] border border-[#7935F8]/10 p-4">
            <p className="text-xs text-[#857c73] leading-relaxed">
              <span className="text-[#B197FF] font-medium">How it works:</span> Your submission will be reviewed by the FTO team.
              Approved content gets curated and published on the platform with proper attribution.
              This usually takes 1-3 business days.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7935F8] text-white text-sm font-medium hover:bg-[#6929d6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit for Review
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-4 py-3 rounded-xl text-sm text-[#6b635b] hover:text-[#9e958c] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
