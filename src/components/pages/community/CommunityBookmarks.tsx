import { useState, useEffect, useRef } from "react";
import { Bookmark, Sparkles, MessageCircle, Store, Compass, Newspaper, Calendar, Megaphone, ChevronDown, Check, FileText, MapPin, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { ImageWithFallback } from "../../shared/ImageWithFallback";
import { toast } from "sonner";

const initialSavedItems = [
  { 
    id: 1, 
    type: "Explore", 
    title: "The Science of Breath: Understanding Prana", 
    date: "Saved 2 days ago",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Breathwork"
  },
  { 
    id: 2, 
    type: "Threads", 
    title: "Discussion: Integration techniques after retreat", 
    date: "Saved 1 week ago",
    image: null, 
    category: "Integration",
    replies: 42
  },
  { 
    id: 3, 
    type: "Directory", 
    title: "Sacred Valley Retreat Center", 
    date: "Saved 2 weeks ago",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Cusco, Peru"
  },
  { 
    id: 4, 
    type: "News", 
    title: "Find The Others Partners with MAPS for Research", 
    date: "Saved 3 weeks ago",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Partnership"
  },
  {
    id: 5,
    type: "Events",
    title: "Global Community Breathwork: Monthly Session",
    date: "Saved 1 month ago",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Online (Zoom)"
  },
  {
    id: 6,
    type: "Announcements",
    title: "Community Guidelines Update 2024",
    date: "Saved 1 month ago",
    image: null,
    category: "Official"
  }
];

type FilterType = "All" | "Explore" | "Threads" | "News" | "Events" | "Announcements" | "Directory";

interface CommunityBookmarksProps {
  onNavigate?: (tab: "feed" | "chat" | "bookmarks" | "profile") => void;
}

export function CommunityBookmarks({ onNavigate }: CommunityBookmarksProps) {
  const [items, setItems] = useState(initialSavedItems);
  const [filter, setFilter] = useState<FilterType>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = items.filter(item => filter === "All" || item.type === filter);

  const handleRemove = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from bookmarks");
  };

  const handleItemClick = (item: typeof items[0]) => {
    if (item.type === "Threads" && onNavigate) {
      onNavigate("chat");
      toast.info("Navigating to discussion...");
    } else if (item.image) {
       toast.success(`Opening ${item.type}: ${item.title}`);
    }
  };

  const filters = [
    { id: 'All', label: 'All Items', icon: Sparkles },
    { id: 'Explore', label: 'Explore', icon: Compass },
    { id: 'Threads', label: 'Threads', icon: MessageCircle },
    { id: 'News', label: 'News', icon: Newspaper },
    { id: 'Events', label: 'Events', icon: Calendar },
    { id: 'Announcements', label: 'Announcements', icon: Megaphone },
    { id: 'Directory', label: 'Directory', icon: Store },
  ];

  const activeFilterLabel = filters.find(f => f.id === filter)?.label;
  const ActiveIcon = filters.find(f => f.id === filter)?.icon || Sparkles;

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-8 pt-8">
         <div className="flex items-center justify-between pb-6">
           <div className="space-y-3">
             <div className="h-10 w-40 bg-[#352f2c] rounded-lg animate-pulse" />
             <div className="h-5 w-60 bg-[#2a2523] rounded-lg animate-pulse" />
           </div>
           <div className="w-40 h-12 bg-[#352f2c] rounded-full animate-pulse" />
         </div>
         <div className="space-y-6">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-8 p-8 bg-[#252220] rounded-[2.5rem] border border-white/[0.06]">
               <div className="w-48 h-36 bg-[#2a2523] rounded-3xl animate-pulse shrink-0" />
               <div className="flex-1 space-y-4 py-2">
                 <div className="h-6 w-3/4 bg-[#2a2523] rounded animate-pulse" />
                 <div className="h-4 w-1/2 bg-[#1f1c1a] rounded animate-pulse" />
               </div>
             </div>
           ))}
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#e8e0d8] tracking-tight">Saved</h2>
          <p className="text-[#857c73] text-sm">Your bookmarked content</p>
        </div>
        
        {/* Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#252220] border border-white/[0.08] hover:border-[#101010]/20 shadow-sm transition-all hover:shadow-md active:scale-95 group min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ActiveIcon className="w-4 h-4 text-[#e8e0d8]/70 group-hover:text-[#e8e0d8]" />
              <span className="font-semibold text-[#e8e0d8] text-[15px]">{activeFilterLabel}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#857c73] transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#252220] rounded-xl shadow-xl border border-white/[0.06] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="space-y-1">
                {filters.map((f) => {
                  const Icon = f.icon;
                  const isActive = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFilter(f.id as FilterType);
                        setIsFilterOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isActive 
                          ? 'bg-[#1c1917] text-[#066237]' 
                          : 'text-[#e8e0d8]/70 hover:bg-[#1f1c1a] hover:text-[#e8e0d8]'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#066237]/10' : 'bg-transparent'}`}>
                           <Icon className={`w-4 h-4 ${isActive ? 'text-[#066237]' : 'text-[#857c73]'}`} />
                        </div>
                        {f.label}
                      </div>
                      {isActive && <Check className="w-4 h-4 text-[#066237]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-[#857c73] bg-[#252220] rounded-2xl border border-white/[0.06] border-dashed group">
          <div className="w-24 h-24 bg-[#1c1917] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Bookmark className="w-10 h-10 text-[#e8e0d8]/20" />
          </div>
          <h3 className="text-xl font-bold text-[#e8e0d8] mb-2">No items found</h3>
          <p className="text-base max-w-xs mx-auto mb-8 leading-relaxed text-[#857c73]">
            {filter === "All" ? "Items you bookmark will appear here." : `No ${filter.toLowerCase()} items saved yet.`}
          </p>
          {filter !== "All" && (
            <Button 
              onClick={() => setFilter("All")} 
              className="rounded-full bg-[#2a2523] text-[#e8e0d8] hover:bg-[#352f2c] px-6 h-10 font-medium transition-colors"
            >
              View all items
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group flex flex-col md:flex-row gap-5 p-5 bg-[#252220] rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-pointer relative overflow-hidden items-start md:items-center"
            >
              {/* Image / Icon Container */}
              <div className="w-full md:w-44 h-44 md:h-32 rounded-xl bg-[#2a2523] overflow-hidden shrink-0 relative">
                {item.image ? (
                   <ImageWithFallback 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1c1917] text-[#A8C5B5]">
                    <div className="p-4 bg-[#252220]/50 rounded-2xl backdrop-blur-sm">
                       {/* Contextual Icon based on type */}
                       {item.type === 'Explore' ? <Compass className="w-10 h-10 opacity-50" /> :
                        item.type === 'Threads' ? <MessageCircle className="w-10 h-10 opacity-50" /> :
                        item.type === 'News' ? <Newspaper className="w-10 h-10 opacity-50" /> :
                        item.type === 'Events' ? <Calendar className="w-10 h-10 opacity-50" /> :
                        item.type === 'Announcements' ? <Megaphone className="w-10 h-10 opacity-50" /> :
                        item.type === 'Directory' ? <Store className="w-10 h-10 opacity-50" /> :
                        <Bookmark className="w-10 h-10 opacity-50" />
                       }
                    </div>
                  </div>
                )}
                
                {/* Tag Overlay */}
                <div className="absolute top-4 left-4">
                  <span className={`
                    text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md
                    ${item.type === 'Explore' ? 'bg-[#7935F8]/20 text-[#B197FF]' :
                      item.type === 'Directory' ? 'bg-[#066237]/20 text-[#4ade80]' :
                      item.type === 'Threads' ? 'bg-orange-500/15 text-orange-400' :
                      item.type === 'News' ? 'bg-blue-500/15 text-blue-400' :
                      item.type === 'Events' ? 'bg-[#7935F8]/15 text-[#B197FF]' :
                      item.type === 'Announcements' ? 'bg-[#066237]/15 text-[#4ade80]' :
                      'bg-white/[0.08] text-[#b8afa6]'}
                  `}>
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center min-w-0 w-full py-2 space-y-3">
                <div className="flex items-start justify-between gap-4 pr-10">
                  <h3 className="font-semibold text-base text-[#e8e0d8] line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-[#857c73]/80 mt-2">
                   {item.category && (
                     <span className="flex items-center gap-2 bg-[#1f1c1a] px-3 py-1 rounded-lg border border-white/[0.06]">
                       {item.type === 'Explore' ? <Compass className="w-3.5 h-3.5 opacity-60" /> : <FileText className="w-3.5 h-3.5 opacity-60" />}
                       {item.category}
                     </span>
                   )}
                   {item.location && (
                     <span className="flex items-center gap-2 bg-[#1f1c1a] px-3 py-1 rounded-lg border border-white/[0.06]">
                       <MapPin className="w-3.5 h-3.5 opacity-60" />
                       {item.location}
                     </span>
                   )}
                   {item.replies && (
                     <span className="flex items-center gap-2 bg-[#1f1c1a] px-3 py-1 rounded-lg border border-white/[0.06]">
                       <MessageCircle className="w-3.5 h-3.5 opacity-60" />
                       {item.replies} replies
                     </span>
                   )}
                   
                   <span className="flex items-center gap-2 ml-auto text-xs opacity-60">
                     <Calendar className="w-3.5 h-3.5" />
                     {item.date}
                   </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="absolute top-6 right-6 md:static md:opacity-0 md:group-hover:opacity-100 md:-ml-4 transition-all duration-300">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => handleRemove(item.id, e)}
                  className="h-9 w-9 text-[#6b635b] hover:text-red-400 hover:bg-red-400/10 bg-[#1f1c1a] border border-white/[0.06] rounded-full transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
