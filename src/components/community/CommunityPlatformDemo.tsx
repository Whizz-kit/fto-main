import { useState } from "react";
import { 
  Home, 
  MessageCircle, 
  Bookmark, 
  User, 
  Hash, 
  ChevronLeft, 
  MoreHorizontal, 
  Search,
  MessageSquare,
  BookOpen,
  Newspaper,
  Users
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// --- Mock Data ---

const FEED_ITEMS = [
  {
    id: 1,
    type: "explore",
    author: "Sarah Jenkins",
    avatar: "SJ",
    time: "2h ago",
    title: "Understanding the Default Mode Network",
    context: "New article in Science & Spirit",
    preview: "The DMN is often active when we're not focused on the outside world...",
    comments: 12
  },
  {
    id: 2,
    type: "chat",
    author: "Community Bot",
    avatar: "FT",
    time: "3h ago",
    title: "New discussion in #psychedelics",
    context: "Integration circles for beginners",
    preview: "Check out the new weekly thread for sharing integration experiences.",
    comments: 5
  },
  {
    id: 3,
    type: "directory",
    author: "The Sanctuary",
    avatar: "TS",
    time: "5h ago",
    title: "New Listing: The Sanctuary Portugal",
    context: "Retreat Center",
    preview: "A new space for healing and transformation has joined the network.",
    comments: 8
  },
  {
    id: 4,
    type: "news",
    author: "FTO Editorial",
    avatar: "ED",
    time: "1d ago",
    title: "MAPS Conference Highlights",
    context: "News Update",
    preview: "Key takeaways from this year's gathering of researchers and practitioners.",
    comments: 24
  }
];

const CHANNELS = [
  { id: "general", name: "general", unread: false },
  { id: "foundational", name: "foundational-knowledge", unread: true },
  { id: "psychedelics", name: "psychedelics", unread: false },
  { id: "breathwork", name: "breathwork", unread: false },
  { id: "meditation", name: "meditation-mindfulness", unread: false }
];

const CHAT_MESSAGES = [
  {
    id: 1,
    author: "Michael Chen",
    avatar: "MC",
    time: "10:30 AM",
    content: "Has anyone tried the Holotropic Breathwork technique mentioned in the foundational module?",
    replies: 3
  },
  {
    id: 2,
    author: "Elena R.",
    avatar: "ER",
    time: "10:35 AM",
    content: "Yes! It was intense but very releasing. Make sure you have a sitter.",
    replies: 0
  },
  {
    id: 3,
    author: "David K.",
    avatar: "DK",
    time: "10:42 AM",
    content: "I second that. Set and setting applies to breathwork too, not just substances.",
    replies: 1
  }
];

// --- Components ---

export function CommunityPlatformDemo() {
  const [activeTab, setActiveTab] = useState<"home" | "chat" | "bookmarks" | "profile">("home");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  // --- Views ---

  const renderHome = () => (
    <div className="space-y-4 p-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-[#2d2d2d]">Timeline</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      {FEED_ITEMS.map((item) => (
        <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#FCF8F3] text-[#5d5d5d] text-[10px] font-normal tracking-wide hover:bg-[#F5F0EB]">
                {item.type.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <button className="text-stone-300 hover:text-[#7935F8] transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1 mb-3">
            <h3 className="font-medium text-[#2d2d2d] leading-snug">{item.title}</h3>
            <p className="text-xs text-[#7935F8] font-medium">{item.context}</p>
          </div>
          
          <p className="text-sm text-stone-600 leading-relaxed mb-3">
            {item.preview}
          </p>
          
          <div className="flex items-center gap-2 text-stone-400">
            <Avatar className="w-5 h-5 bg-stone-100">
              <AvatarFallback className="text-[9px] bg-stone-200 text-stone-600">{item.avatar}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{item.author}</span>
            <div className="flex-1" />
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              {item.comments}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChat = () => {
    if (activeChannel) {
      return (
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center gap-2 p-4 border-b border-stone-100 bg-[#FCF8F3]/50">
            <button onClick={() => setActiveChannel(null)} className="text-stone-500 hover:text-stone-800">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium text-[#2d2d2d]">#{activeChannel}</span>
            <div className="flex-1" />
            <button className="text-stone-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {CHAT_MESSAGES.map((msg) => (
                <div key={msg.id} className="flex gap-3 group">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-stone-100 text-stone-600 text-xs">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#2d2d2d]">{msg.author}</span>
                        <span className="text-[10px] text-stone-400">{msg.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg rounded-tl-none">
                      {msg.content}
                    </p>
                    <div className="flex items-center gap-4 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[10px] text-stone-400 font-medium hover:text-[#7935F8] flex items-center gap-1">
                        Reply {msg.replies > 0 && `(${msg.replies})`}
                      </button>
                      <button className="text-stone-300 hover:text-[#7935F8]">
                        <Bookmark className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-stone-100 bg-white">
            <div className="bg-stone-50 rounded-full px-4 py-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder={`Message #${activeChannel}`}
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-stone-400"
              />
              <button className="text-[#7935F8]">
                <div className="w-6 h-6 rounded-full bg-[#7935F8]/10 flex items-center justify-center">
                  <ChevronLeft className="w-3 h-3 rotate-180" />
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-medium text-[#2d2d2d] mb-6">Channels</h2>
        {CHANNELS.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel.name)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${channel.unread ? 'bg-[#7935F8]/10 text-[#7935F8]' : 'bg-stone-100 text-stone-400'}`}>
              <Hash className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className={`text-sm block ${channel.unread ? 'font-medium text-[#2d2d2d]' : 'text-stone-600'}`}>
                {channel.name}
              </span>
            </div>
            {channel.unread && (
              <div className="w-2 h-2 rounded-full bg-[#7935F8]" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderBookmarks = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-medium text-[#2d2d2d]">Saved</h2>
      <div className="text-center py-10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-300">
          <Bookmark className="w-6 h-6" />
        </div>
        <p className="text-sm text-stone-500">Your quiet corner for saved wisdom.</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-4">
      <div className="text-center mb-8 pt-4">
        <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-sm">
          <AvatarFallback className="bg-[#066237]/10 text-[#066237] text-xl">YG</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-medium text-[#2d2d2d]">You</h2>
        <p className="text-sm text-stone-500">Conscious Explorer</p>
      </div>
      
      <div className="space-y-2">
        {['Edit Profile', 'Notification Settings', 'Privacy', 'Help & Support'].map((item) => (
          <button key={item} className="w-full p-4 bg-white rounded-xl text-left text-sm text-stone-600 hover:text-[#2d2d2d] flex justify-between items-center shadow-sm border border-stone-50">
            {item}
            <ChevronLeft className="w-4 h-4 rotate-180 text-stone-300" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[320px] mx-auto bg-[#F9F6F2] rounded-[2rem] overflow-hidden border-[6px] border-[#2d2d2d] shadow-2xl h-[600px] flex flex-col relative select-none">
      {/* Status Bar Mock */}
      <div className="h-6 bg-[#2d2d2d] w-full flex items-center justify-between px-4">
        <span className="text-[10px] text-white/90 font-medium">9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-white/20 rounded-full" />
          <div className="w-3 h-3 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#F9F6F2]">
        {activeTab === "home" && renderHome()}
        {activeTab === "chat" && renderChat()}
        {activeTab === "bookmarks" && renderBookmarks()}
        {activeTab === "profile" && renderProfile()}
      </div>

      {/* Bottom Navigation */}
      <div className="h-16 bg-white border-t border-stone-100 flex items-center justify-around px-2 relative z-10">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "home" ? "text-[#7935F8]" : "text-stone-400"}`}
        >
          <Home className="w-5 h-5" strokeWidth={activeTab === "home" ? 2.5 : 2} />
          <span className="text-[9px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "chat" ? "text-[#7935F8]" : "text-stone-400"}`}
        >
          <MessageCircle className="w-5 h-5" strokeWidth={activeTab === "chat" ? 2.5 : 2} />
          <span className="text-[9px] font-medium">Community</span>
        </button>
        <button 
          onClick={() => setActiveTab("bookmarks")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "bookmarks" ? "text-[#7935F8]" : "text-stone-400"}`}
        >
          <Bookmark className="w-5 h-5" strokeWidth={activeTab === "bookmarks" ? 2.5 : 2} />
          <span className="text-[9px] font-medium">Saved</span>
        </button>
        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 p-2 ${activeTab === "profile" ? "text-[#7935F8]" : "text-stone-400"}`}
        >
          <User className="w-5 h-5" strokeWidth={activeTab === "profile" ? 2.5 : 2} />
          <span className="text-[9px] font-medium">Profile</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-200 rounded-full z-20" />
    </div>
  );
}
