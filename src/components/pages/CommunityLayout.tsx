import { ReactNode } from "react";
import { Sparkles, MessageCircle, Bookmark, User, LogOut } from "lucide-react";
import { cn } from "../ui/utils";
import logoImage from "figma:asset/2c142ae2d239863afbacda06ffe7aadd18b38a7e.webp";

interface CommunityLayoutProps {
  children: ReactNode;
  activeTab: "feed" | "chat" | "bookmarks" | "profile";
  onTabChange: (tab: "feed" | "chat" | "bookmarks" | "profile") => void;
  onExit: () => void;
}

export function CommunityLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  onExit 
}: CommunityLayoutProps) {
  
  const navItems = [
    { id: "feed", icon: Sparkles, label: "FTO Updates" },
    { id: "chat", icon: MessageCircle, label: "Community Chat" },
    { id: "bookmarks", icon: Bookmark, label: "Bookmarked" },
    { id: "profile", icon: User, label: "My Profile" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#FCF8F3] text-[#101010] font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-[#101010]/5 bg-[#FCF8F3]/80 backdrop-blur-xl shrink-0 z-40 transition-all duration-300">
        {/* BIG LOGO AREA */}
        <div className="p-8 pb-8 flex flex-col gap-4">
          <img 
            src={logoImage} 
            alt="Find The Others" 
            className="h-12 w-auto object-contain self-start"
          />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative",
                activeTab === item.id 
                  ? "bg-white text-[#066237] shadow-sm shadow-[#101010]/5 font-bold" 
                  : "text-muted-foreground hover:bg-white/60 hover:text-[#101010] font-medium"
              )}
            >
              <div className={cn(
                "w-1 h-5 rounded-full absolute left-0 bg-[#066237] transition-all duration-300",
                 activeTab === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
              )} />
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-300", 
                activeTab === item.id ? "scale-110 stroke-[2.5px]" : "group-hover:scale-110 stroke-2"
              )} />
              <span className="tracking-wide text-[15px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mx-4 mb-4 rounded-2xl bg-[#066237]/5 border border-[#066237]/10">
           <div className="flex items-center gap-3 mb-3">
             <div className="w-9 h-9 rounded-full bg-[#066237] text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-white">
               GU
             </div>
             <div className="min-w-0">
               <p className="text-sm font-bold truncate text-[#101010]">Guest User</p>
               <p className="text-[10px] text-[#066237] font-semibold tracking-wide uppercase truncate">Explorer Member</p>
             </div>
           </div>
           <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-white hover:text-red-600 hover:shadow-sm transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen md:h-screen pb-24 md:pb-0 overflow-x-hidden",
        activeTab === "chat" ? "md:overflow-hidden" : "md:overflow-y-auto"
      )}>
        <div className={cn(
          "w-full h-full mx-auto",
          activeTab === "chat" ? "max-w-full" : "max-w-3xl p-4 md:p-10"
        )}>
           {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#101010]/5 px-4 py-1.5 pb-safe z-50">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-all duration-300 py-1.5 px-3 rounded-xl",
                activeTab === item.id ? "text-[#066237]" : "text-[#101010]/30"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                activeTab === item.id ? "stroke-[2.5px]" : ""
              )} />
              <span className="text-[9px] font-medium">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile Header with Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#FCF8F3]/90 backdrop-blur-md z-40 px-4 h-14 border-b border-[#101010]/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <img src={logoImage} alt="FTO" className="h-8 w-auto object-contain" />
         </div>
         <button 
           onClick={onExit}
           className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
         >
           <LogOut className="w-5 h-5" />
         </button>
      </div>
    </div>
  );
}
