import { ReactNode } from "react";
import { Sparkles, MessageCircle, Bookmark, User, ArrowLeft, Hash, LogOut, Pin, TrendingUp, Newspaper, ChevronRight, PlusCircle } from "lucide-react";
import { cn } from "../../ui/utils";
import logoImage from "figma:asset/2c142ae2d239863afbacda06ffe7aadd18b38a7e.webp";

interface CommunityLayoutProps {
  children: ReactNode;
  activeTab: "feed" | "chat" | "bookmarks" | "profile" | "submit";
  onTabChange: (tab: "feed" | "chat" | "bookmarks" | "profile" | "submit") => void;
  onExit: () => void;
  activeChannel?: string;
  onChannelChange?: (channel: string) => void;
}

const channels = [
  { category: "Community", items: [
    { id: "general", name: "general" },
    { id: "announcements", name: "announcements" },
  ]},
  { category: "Topics", items: [
    { id: "psychedelics", name: "psychedelics" },
    { id: "breathwork", name: "breathwork" },
    { id: "meditation", name: "meditation" },
  ]},
];

const PINNED = {
  title: "Community Guidelines Updated",
  excerpt: "We've updated our guidelines to foster safer spaces for connection and growth.",
};

const TODAYS_NEWS = [
  { title: "VA Breaks 60-Year Silence on Psychedelics", time: "2h", category: "Policy" },
  { title: "Your Brain Is Literally Glowing", time: "5h", category: "Research" },
  { title: "The $500B Loneliness Economy", time: "1d", category: "Insight" },
];

const TRENDING = ["meditation", "integration", "breathwork", "plant-medicine", "community"];

export function CommunityLayoutV2({
  children,
  activeTab,
  onTabChange,
  onExit,
  activeChannel,
  onChannelChange,
}: CommunityLayoutProps) {

  const navItems = [
    { id: "feed", icon: Sparkles, label: "Feed" },
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "submit", icon: PlusCircle, label: "Submit" },
    { id: "bookmarks", icon: Bookmark, label: "Saved" },
    { id: "profile", icon: User, label: "Profile" },
  ] as const;

  const handleChannelClick = (channelId: string) => {
    onChannelChange?.(channelId);
    onTabChange("chat");
  };

  return (
    <div className="min-h-screen bg-[#1c1917] text-white font-sans">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {/* Left Sidebar */}
        <aside className="w-[240px] h-screen flex flex-col border-r border-white/[0.06] bg-[#1c1917] shrink-0 overflow-y-auto">
          {/* Logo */}
          <div className="px-5 py-4 flex items-center gap-3">
            <button onClick={onExit} className="opacity-60 hover:opacity-100 transition-opacity">
              <img src={logoImage} alt="FTO" className="h-6 w-auto object-contain brightness-0 invert" />
            </button>
          </div>

          {/* Main Nav */}
          <nav className="px-3 space-y-0.5">
            <NavItem
              icon={Sparkles}
              label="Feed"
              active={activeTab === "feed"}
              onClick={() => onTabChange("feed")}
            />

            {/* Chat with inline channels */}
            <NavItem
              icon={MessageCircle}
              label="Chat"
              active={activeTab === "chat"}
              onClick={() => onTabChange("chat")}
            />

            {/* Inline channels */}
            <div className="pl-4 space-y-0.5">
              {channels.map(group => (
                <div key={group.category}>
                  <p className="text-[10px] font-semibold text-[#6b635b] uppercase tracking-widest px-3 pt-3 pb-1">
                    {group.category}
                  </p>
                  {group.items.map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => handleChannelClick(ch.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-colors",
                        activeTab === "chat" && activeChannel === ch.id
                          ? "text-white bg-white/[0.08]"
                          : "text-[#9e958c] hover:text-[#e8e0d8] hover:bg-white/[0.03]"
                      )}
                    >
                      <Hash className="w-3.5 h-3.5 opacity-50" />
                      {ch.name}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={() => onTabChange("chat")}
                className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-[#7935F8] hover:text-[#B197FF] transition-colors font-medium"
              >
                All topics
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="h-px bg-white/[0.04] my-3 mx-2" />

            <NavItem
              icon={Bookmark}
              label="Saved"
              active={activeTab === "bookmarks"}
              onClick={() => onTabChange("bookmarks")}
            />
            <NavItem
              icon={PlusCircle}
              label="Submit"
              active={activeTab === "submit"}
              onClick={() => onTabChange("submit")}
            />
            <NavItem
              icon={User}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => onTabChange("profile")}
            />
          </nav>

          {/* User card */}
          <div className="mt-auto p-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7935F8] to-[#B197FF] flex items-center justify-center text-[10px] font-bold">
                  GU
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#e8e0d8] truncate">Guest User</p>
                  <p className="text-[10px] text-[#524b45]">Explorer</p>
                </div>
              </div>
              <button
                onClick={onExit}
                className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] text-[#524b45] hover:text-red-400 hover:bg-red-400/5 transition-colors"
              >
                <LogOut className="w-3 h-3" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 h-screen overflow-x-hidden",
          activeTab === "chat" ? "overflow-hidden" : "overflow-y-auto"
        )}>
          <div className={cn(
            "w-full h-full mx-auto",
            activeTab === "chat" ? "max-w-full" : "max-w-2xl p-6"
          )}>
            {children}
          </div>
        </main>

        {/* Right Sidebar — Only on Feed */}
        {activeTab === "feed" && (
          <aside className="w-[280px] h-screen border-l border-white/[0.06] bg-[#1c1917] shrink-0 overflow-y-auto p-5 space-y-5">
            {/* Pinned */}
            <div className="rounded-xl border border-[#7935F8]/20 bg-[#7935F8]/[0.04] p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#7935F8] uppercase tracking-wider">
                <Pin className="w-3 h-3" />
                Pinned
              </div>
              <h4 className="text-sm font-medium text-[#e8e0d8] leading-snug">{PINNED.title}</h4>
              <p className="text-xs text-[#6b635b] leading-relaxed">{PINNED.excerpt}</p>
            </div>

            {/* Today's News */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6b635b] uppercase tracking-wider px-1">
                <Newspaper className="w-3 h-3" />
                Today's News
              </div>
              <div className="space-y-1">
                {TODAYS_NEWS.map((item, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
                  >
                    <p className="text-[13px] text-[#b8afa6] group-hover:text-[#e8e0d8] leading-snug transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-[#6b635b]">{item.time} ago</span>
                      <span className="w-1 h-1 rounded-full bg-[#3a3530]" />
                      <span className="text-[10px] text-[#6b635b]">{item.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6b635b] uppercase tracking-wider px-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING.map(topic => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded-full text-[11px] text-[#857c73] bg-white/[0.04] border border-white/[0.04] hover:bg-[#7935F8]/10 hover:text-[#B197FF] hover:border-[#7935F8]/20 cursor-pointer transition-all"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen pt-12 pb-16">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 bg-[#1c1917]/95 backdrop-blur-xl z-40 px-4 h-12 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onExit} className="text-[#5e5750] hover:text-[#9e958c]">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-[#9e958c] uppercase tracking-widest">
              {navItems.find(n => n.id === activeTab)?.label}
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7935F8] to-[#B197FF] flex items-center justify-center text-[8px] font-bold">
            GU
          </div>
        </div>

        {/* Mobile Content */}
        <div className={cn(
          "flex-1",
          activeTab === "chat" ? "" : "px-4 py-2"
        )}>
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1c1917]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-2 pb-safe z-50">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-xl transition-all",
                  activeTab === item.id ? "text-white" : "text-[#524b45]"
                )}
              >
                <item.icon className={cn("w-5 h-5", activeTab === item.id && "stroke-[2.5px]")} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
        active
          ? "text-white bg-white/[0.06] font-medium"
          : "text-[#9e958c] hover:text-[#e8e0d8] hover:bg-white/[0.03]"
      )}
    >
      <Icon className="w-[18px] h-[18px]" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="text-[10px] bg-[#7935F8] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
