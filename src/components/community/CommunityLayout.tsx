import { useState } from "react";
import { Home, MessageCircle, Bookmark, User, Menu, Search, Bell } from "lucide-react";
import { Button } from "../ui/button";

interface CommunityLayoutProps {
  children: React.ReactNode;
  activeTab: "feed" | "chat" | "bookmarks" | "profile";
  onTabChange: (tab: "feed" | "chat" | "bookmarks" | "profile") => void;
  onExit: () => void;
}

export function CommunityLayout({ children, activeTab, onTabChange, onExit }: CommunityLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F3] text-stone-800 font-sans flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-stone-100 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-semibold text-lg text-stone-900">FTO Community</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-stone-500">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-stone-500">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onExit()} className="text-stone-400">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-stone-100 h-screen sticky top-0 p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#066237] rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="font-semibold text-lg tracking-tight">FTO Community</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavButton 
            active={activeTab === "feed"} 
            onClick={() => onTabChange("feed")} 
            icon={<Home className="w-5 h-5" />} 
            label="Home" 
          />
          <NavButton 
            active={activeTab === "chat"} 
            onClick={() => onTabChange("chat")} 
            icon={<MessageCircle className="w-5 h-5" />} 
            label="Community" 
          />
          <NavButton 
            active={activeTab === "bookmarks"} 
            onClick={() => onTabChange("bookmarks")} 
            icon={<Bookmark className="w-5 h-5" />} 
            label="Bookmarks" 
          />
          <NavButton 
            active={activeTab === "profile"} 
            onClick={() => onTabChange("profile")} 
            icon={<User className="w-5 h-5" />} 
            label="Profile" 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-stone-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-stone-500 hover:text-stone-900 hover:bg-stone-50"
            onClick={onExit}
          >
            Exit Demo
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-64px)] md:min-h-screen pb-20 md:pb-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full md:py-8 md:px-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-3 flex justify-between items-center z-50 pb-safe">
        <MobileNavButton 
          active={activeTab === "feed"} 
          onClick={() => onTabChange("feed")} 
          icon={<Home className="w-6 h-6" />} 
        />
        <MobileNavButton 
          active={activeTab === "chat"} 
          onClick={() => onTabChange("chat")} 
          icon={<MessageCircle className="w-6 h-6" />} 
        />
        <MobileNavButton 
          active={activeTab === "bookmarks"} 
          onClick={() => onTabChange("bookmarks")} 
          icon={<Bookmark className="w-6 h-6" />} 
        />
        <MobileNavButton 
          active={activeTab === "profile"} 
          onClick={() => onTabChange("profile")} 
          icon={<User className="w-6 h-6" />} 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? "bg-[#FCF8F3] text-[#066237] font-medium" 
          : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl transition-colors ${
        active 
          ? "text-[#066237]" 
          : "text-stone-400 hover:text-stone-600"
      }`}
    >
      {icon}
    </button>
  );
}
