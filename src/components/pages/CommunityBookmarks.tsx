import { useState, useEffect, useRef } from "react";
import { Bookmark, Sparkles, MessageCircle, Store, Compass, Newspaper, Calendar, Megaphone, ChevronDown, Check, FileText, MapPin, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
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
             <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
             <div className="h-5 w-60 bg-gray-100 rounded-lg animate-pulse" />
           </div>
           <div className="w-40 h-12 bg-gray-200 rounded-full animate-pulse" />
         </div>
         <div className="space-y-6">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-8 p-8 bg-white rounded-[2.5rem] border border-[#101010]/5">
               <div className="w-48 h-36 bg-gray-100 rounded-3xl animate-pulse shrink-0" />
               <div className="flex-1 space-y-4 py-2">
                 <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />
                 <div className="h-4 w-1/2 bg-gray-50 rounded animate-pulse" />
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-[#101010] tracking-tight flex items-center gap-3">
            Saved Items
            <Bookmark className="w-8 h-8 text-[#101010]/10 hidden sm:block" />
          </h2>
          <p className="text-muted-foreground text-lg">Your personal collection of community content</p>
        </div>
        
        {/* Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-[#101010]/10 hover:border-[#101010]/20 shadow-sm transition-all hover:shadow-md active:scale-95 group min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ActiveIcon className="w-4 h-4 text-[#101010]/70 group-hover:text-[#101010]" />
              <span className="font-semibold text-[#101010] text-[15px]">{activeFilterLabel}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-xl border border-[#101010]/5 p-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-[#101010]/5">
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
                        w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all
                        ${isActive 
                          ? 'bg-[#FCF8F3] text-[#066237]' 
                          : 'text-[#101010]/70 hover:bg-gray-50 hover:text-[#101010]'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#066237]/10' : 'bg-transparent'}`}>
                           <Icon className={`w-4 h-4 ${isActive ? 'text-[#066237]' : 'text-muted-foreground'}`} />
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
        <div className="text-center py-24 text-muted-foreground bg-white rounded-[2.5rem] border border-[#101010]/5 border-dashed group">
          <div className="w-24 h-24 bg-[#FCF8F3] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Bookmark className="w-10 h-10 text-[#101010]/20" />
          </div>
          <h3 className="text-xl font-bold text-[#101010] mb-2">No items found</h3>
          <p className="text-base max-w-xs mx-auto mb-8 leading-relaxed text-muted-foreground">
            {filter === "All" ? "Items you bookmark will appear here." : `No ${filter.toLowerCase()} items saved yet.`}
          </p>
          {filter !== "All" && (
            <Button 
              onClick={() => setFilter("All")} 
              className="rounded-full bg-[#101010] text-white hover:bg-[#000000] px-8 h-12 font-semibold transition-all hover:shadow-lg"
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
              className="group flex flex-col md:flex-row gap-8 p-8 bg-white rounded-[2.5rem] border border-[#101010]/5 hover:shadow-xl hover:shadow-[#066237]/5 hover:border-[#066237]/20 transition-all cursor-pointer relative overflow-hidden hover:-translate-y-1 items-start md:items-center animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            >
              {/* Image / Icon Container */}
              <div className="w-full md:w-56 h-56 md:h-40 rounded-3xl bg-gray-100 overflow-hidden shrink-0 relative shadow-inner">
                {item.image ? (
                   <ImageWithFallback 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#FCF8F3] text-[#A8C5B5]">
                    <div className="p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
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
                    text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md border border-white/20 backdrop-blur-md
                    ${item.type === 'Explore' ? 'bg-[#E9D5FF]/90 text-[#6B21A8]' : 
                      item.type === 'Directory' ? 'bg-[#DCFCE7]/90 text-[#15803D]' : 
                      item.type === 'Threads' ? 'bg-[#FFEDD5]/90 text-[#C2410C]' :
                      item.type === 'News' ? 'bg-blue-100/90 text-blue-700' :
                      item.type === 'Events' ? 'bg-[#7935F8]/20 text-[#7935F8] bg-white' :
                      item.type === 'Announcements' ? 'bg-[#066237]/20 text-[#066237] bg-white' :
                      'bg-gray-100/90 text-gray-700'}
                  `}>
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center min-w-0 w-full py-2 space-y-3">
                <div className="flex items-start justify-between gap-4 pr-12">
                  <h3 className="font-bold text-2xl text-[#101010] group-hover:text-[#066237] transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground/80 mt-2">
                   {item.category && (
                     <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-[#101010]/5">
                       {item.type === 'Explore' ? <Compass className="w-3.5 h-3.5 opacity-60" /> : <FileText className="w-3.5 h-3.5 opacity-60" />}
                       {item.category}
                     </span>
                   )}
                   {item.location && (
                     <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-[#101010]/5">
                       <MapPin className="w-3.5 h-3.5 opacity-60" />
                       {item.location}
                     </span>
                   )}
                   {item.replies && (
                     <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-[#101010]/5">
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
                  className="h-10 w-10 text-muted-foreground hover:text-red-600 hover:bg-red-50 bg-white shadow-sm border border-[#101010]/5 rounded-full hover:shadow-md hover:border-red-100 transition-all"
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
