import { useState, useRef, useEffect } from "react";
import { Hash, MessageSquare, ChevronLeft, Send, Users, Plus, Hash as HashIcon, Smile, X, MapPin, Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";

const channels = [
  { 
    category: "Community",
    items: [
      { id: "general", name: "general", description: "General discussion and introductions" },
      { id: "announcements", name: "announcements", description: "Official updates from FTO" },
    ]
  },
  {
    category: "Topics",
    items: [
      { id: "foundational", name: "foundational-knowledge", description: "Sharing resources and learning materials" },
      { id: "psychedelics", name: "psychedelics", description: "Safe use, integration, and experiences" },
      { id: "breathwork", name: "breathwork", description: "Techniques, sessions, and daily practice" },
      { id: "meditation", name: "meditation-mindfulness", description: "Sitting together in silence" },
    ]
  }
];

// Initial data with nested replies for threads
const initialMessages = {
  "general": [
    { 
      id: 1, 
      user: "Sarah Jenkins", 
      avatar: "bg-purple-100 text-purple-700", 
      time: "10:30 AM", 
      text: "Welcome everyone! So glad to see this community growing. 🌱", 
      reactions: [], 
      replies: 2, 
      role: "Community Guide", 
      location: "London, UK", 
      interests: ["Meditation", "Yoga"],
      thread: [
        { id: 101, user: "Mike Thompson", avatar: "bg-green-100 text-green-700", time: "10:35 AM", text: "Thank you Sarah! Happy to be here.", role: "Member" },
        { id: 102, user: "David Kim", avatar: "bg-amber-100 text-amber-700", time: "10:40 AM", text: "Same here. The energy is great.", role: "Member" }
      ]
    },
    { 
      id: 2, 
      user: "Mike Thompson", 
      avatar: "bg-green-100 text-green-700", 
      time: "10:32 AM", 
      text: "Thanks Sarah! I've been looking for a space like this for ages. The directory is amazing.", 
      reactions: [], 
      replies: 0, 
      role: "Member", 
      location: "Berlin, DE", 
      interests: ["Breathwork"],
      thread: []
    },
    { 
      id: 3, 
      user: "Elena Rodriguez", 
      avatar: "bg-blue-100 text-blue-700", 
      time: "11:15 AM", 
      text: "Has anyone checked out the new retreat listing in Portugal? It looks incredible.", 
      reactions: ["🔥"], 
      replies: 5, 
      role: "Facilitator", 
      location: "Lisbon, PT", 
      interests: ["Retreats", "Plant Medicine"],
      thread: [
        { id: 301, user: "David Kim", avatar: "bg-amber-100 text-amber-700", time: "11:20 AM", text: "Yes! I actually know the facilitator there. Highly recommended.", role: "Member" },
        { id: 302, user: "Sarah Jenkins", avatar: "bg-purple-100 text-purple-700", time: "11:25 AM", text: "Is it the one near Lisbon?", role: "Community Guide" },
        { id: 303, user: "Elena Rodriguez", avatar: "bg-blue-100 text-blue-700", time: "11:30 AM", text: "Yes, exactly! In Sintra.", role: "Facilitator" }
      ]
    },
    { 
      id: 4, 
      user: "David Kim", 
      avatar: "bg-amber-100 text-amber-700", 
      time: "11:20 AM", 
      text: "Yes! I actually know the facilitator there. Highly recommended.", 
      reactions: [], 
      replies: 1, 
      role: "Member", 
      location: "New York, USA", 
      interests: ["Integration"],
      thread: [
         { id: 401, user: "Mike Thompson", avatar: "bg-green-100 text-green-700", time: "11:22 AM", text: "Good to know, thanks David!", role: "Member" }
      ]
    },
  ],
  "foundational": [
    { id: 1, user: "Admin", avatar: "bg-[#352f2c] text-[#b8afa6]", time: "Yesterday", text: "Here is a great reading list for beginners in integration work.", reactions: ["📚"], replies: 0, role: "Admin", location: "Global", interests: [], thread: [] },
  ],
  "default": [
    { id: 0, user: "System", avatar: "bg-[#2a2523] text-[#9e958c]", time: "Now", text: "This is the start of the channel. Be kind and respectful.", reactions: [], replies: 0, role: "System", location: "", interests: [], thread: [] }
  ]
};

interface ChatReply {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
  role: string;
}

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
  reactions: string[];
  replies: number;
  role: string;
  location: string;
  interests: string[];
  thread: ChatReply[];
}

type MessageStore = Record<string, ChatMessage[]>;

export function CommunityChatV2() {
  const [activeChannelId, setActiveChannelId] = useState<string>("general");
  const [mobileView, setMobileView] = useState<"list" | "chat">("chat");
  const [messages, setMessages] = useState<MessageStore>(initialMessages as MessageStore);
  const [inputText, setInputText] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatMessage | null>(null);
  const [activeThread, setActiveThread] = useState<ChatMessage | null>(null);
  const [threadInputText, setThreadInputText] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);

  const emojis = ["👍", "❤️", "😂", "😮", "🙏", "🔥"];

  const handleChannelSelect = (id: string) => {
    setActiveChannelId(id);
    setMobileView("chat");
    setActiveThread(null); // Close thread when changing channel
  };

  const handleBack = () => {
    setMobileView("list");
  };

  // Send Main Channel Message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "Guest User",
      avatar: "bg-[#066237] text-white",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText,
      replies: 0,
      reactions: [],
      thread: [],
      role: "Guest",
      location: "Unknown", 
      interests: ["Exploration"]
    };

    setMessages((prev: MessageStore) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMessage]
    }));
    
    setInputText("");
  };

  // Send Thread Reply
  const handleSendThreadReply = () => {
    if (!threadInputText.trim() || !activeThread) return;

    const newReply = {
      id: Date.now(),
      user: "Guest User",
      avatar: "bg-[#066237] text-white",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: threadInputText,
      role: "Guest"
    };

    // Update the messages state
    setMessages((prev: MessageStore) => {
      const channelMessages = prev[activeChannelId] || prev["default"];
      const updatedMessages = channelMessages.map(( msg: ChatMessage) => {
        if (msg.id === activeThread.id) {
          const updatedThread = [...(msg.thread || []), newReply];
          return { ...msg, thread: updatedThread, replies: (msg.replies || 0) + 1 };
        }
        return msg;
      });
      return { ...prev, [activeChannelId]: updatedMessages };
    });

    // Also update the local activeThread state so the UI updates immediately
    setActiveThread((prev) => prev ? ({
      ...prev,
      thread: [...(prev.thread || []), newReply],
      replies: (prev.replies || 0) + 1
    }) : prev);

    setThreadInputText("");
  };

  const handleReaction = (msgId: number, emoji: string) => {
    setMessages((prev: MessageStore) => {
      const channelMessages = prev[activeChannelId] || prev["default"];
      const updatedMessages = channelMessages.map(( msg: ChatMessage) => {
        if (msg.id === msgId) {
          const hasReaction = msg.reactions?.includes(emoji);
          const newReactions = hasReaction 
            ? msg.reactions.filter((r: string) => r !== emoji)
            : [...(msg.reactions || []), emoji];
          return { ...msg, reactions: newReactions };
        }
        return msg;
      });
      return { ...prev, [activeChannelId]: updatedMessages };
    });
    setShowEmojiPicker(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollThreadToBottom = () => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages[activeChannelId], activeChannelId]);

  useEffect(() => {
    scrollThreadToBottom();
  }, [activeThread?.thread]);

  const allChannels = channels.flatMap(c => c.items);
  const activeChannel = allChannels.find(c => c.id === activeChannelId) || allChannels[0];
  const currentMessages = messages[activeChannelId] || messages["default"];

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-full w-full bg-[#1c1917] text-[#e8e0d8] relative overflow-hidden">
      {/* Main Chat Area */}
      <div className={`
        flex-1 flex flex-col min-w-0 bg-[#1c1917] transition-all duration-300
        ${mobileView === "list" ? "hidden md:flex" : "flex"}
        ${activeThread ? "md:mr-[380px]" : ""}
      `}>
        <div className="h-14 border-b border-white/[0.06] flex items-center justify-between px-6 shrink-0 bg-[#1c1917]/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <button onClick={handleBack} className="md:hidden -ml-2 p-2 text-[#9e958c] hover:text-[#e8e0d8]">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h3 className="font-semibold text-base flex items-center gap-2 truncate text-[#e8e0d8]">
                <Hash className="w-5 h-5 text-[#7935F8] shrink-0" />
                {activeChannel.name}
              </h3>
              <p className="text-xs text-[#9e958c] truncate hidden md:block font-medium">
                {activeChannel.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {currentMessages.map(( msg: ChatMessage) => (
            <div key={msg.id} className={`flex gap-4 group hover:bg-white/[0.02] -mx-6 px-6 py-3 transition-colors relative ${activeThread?.id === msg.id ? 'bg-[#066237]/5' : ''}`}>
              <div 
                onClick={() => setSelectedUser(msg)}
                className={`w-10 h-10 rounded-xl ${msg.avatar} flex-shrink-0 flex items-center justify-center text-sm font-bold mt-1 cursor-pointer hover:shadow-md transition-all`}
              >
                {msg.user.split(' ').map((n:string) => n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span 
                    onClick={() => setSelectedUser(msg)}
                    className="font-bold text-[#e8e0d8] text-[15px] hover:underline cursor-pointer"
                  >
                    {msg.user}
                  </span>
                  <span className="text-[11px] text-[#9e958c] font-medium">{msg.time}</span>
                  
                  {/* Actions - Inline */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2">
                    <button 
                       onClick={() => setActiveThread(msg)}
                       className="text-xs font-medium text-[#9e958c] hover:text-[#066237] hover:bg-[#066237]/5 p-1 rounded transition-all"
                       title="Reply in thread"
                     >
                       <MessageSquare className="w-3.5 h-3.5" />
                     </button>
                     
                     <div className="relative">
                       <button 
                          onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)}
                          className="text-[#9e958c] hover:text-yellow-500 p-1 rounded hover:bg-[#252220] transition-colors"
                          title="Add reaction"
                       >
                         <Smile className="w-3.5 h-3.5" />
                       </button>
                       
                       {showEmojiPicker === msg.id && (
                         <div className="absolute left-0 top-6 z-20 bg-[#1c1917] shadow-xl border border-white/[0.06] rounded-xl p-2 flex gap-1 animate-in zoom-in-95 duration-200 w-max">
                           {emojis.map(emoji => (
                             <button
                               key={emoji}
                               onClick={() => handleReaction(msg.id, emoji)}
                               className="hover:bg-[#252220] p-1.5 rounded-lg text-xl transition-colors w-9 h-9 flex items-center justify-center transform hover:scale-110"
                             >
                               {emoji}
                             </button>
                           ))}
                         </div>
                       )}
                     </div>
                  </div>
                </div>

                <p className="text-[#e8e0d8] text-[15px] leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
                
                {/* Reactions Display */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {msg.reactions.map((emoji: string, i: number) => (
                      <span key={i} className="inline-flex items-center justify-center px-2 py-0.5 bg-[#1f1c1a] rounded-lg text-sm border border-white/[0.06] shadow-sm">
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reply Count */}
                {(msg.replies > 0) && (
                   <div 
                     onClick={() => setActiveThread(msg)}
                     className="flex items-center gap-3 mt-3 cursor-pointer group/thread w-fit p-1.5 pr-3 -ml-1.5 rounded-lg hover:bg-[#252220] border border-transparent hover:border-white/[0.06] transition-colors"
                   >
                     <div className="flex -space-x-2 pl-1">
                        {/* Mock avatars */}
                        <div className="w-5 h-5 rounded-full bg-[#7935F8]/30 border-2 border-[#252220]"></div>
                        <div className="w-5 h-5 rounded-full bg-[#066237]/30 border-2 border-[#252220]"></div>
                     </div>
                     <span className="text-xs font-bold text-[#066237] group-hover/thread:underline">
                       {msg.replies} replies
                     </span>
                     <span className="text-[10px] text-[#9e958c] group-hover/thread:text-[#e8e0d8]">
                        Last reply today
                     </span>
                   </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          <div className="py-8 flex items-center justify-center gap-4 opacity-50">
            <div className="h-px bg-gradient-to-r from-transparent via-[#101010]/20 to-transparent w-full max-w-xs" />
            <span className="text-xs font-medium text-[#9e958c]">Today</span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#101010]/20 to-transparent w-full max-w-xs" />
          </div>
        </div>

        {/* Main Message Input */}
        <div className="px-6 py-4 bg-[#1c1917] relative z-20">
          <div className="border border-white/[0.08] rounded-xl bg-[#252220] overflow-hidden focus-within:ring-1 focus-within:ring-[#066237]/20 focus-within:border-[#066237]/30 transition-all group">
            <div className="flex items-end gap-3 p-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-[#9e958c] hover:text-[#066237] hover:bg-[#066237]/5 rounded-xl">
                 <Plus className="w-5 h-5" />
              </Button>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message #${activeChannel.name}`}
                className="flex-1 max-h-32 min-h-[36px] bg-transparent border-none focus:outline-none text-[15px] resize-none py-1.5 leading-relaxed"
                rows={1}
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                size="icon" 
                className="h-9 w-9 rounded-xl bg-[#066237] hover:bg-[#05502d] flex-shrink-0 transition-all disabled:opacity-50 disabled:bg-[#2a2523] disabled:text-[#6b635b] shadow-sm"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-[#9e958c] mt-3 text-center opacity-60">
            <strong>Tip:</strong> Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* THREAD SIDE PANEL */}
      <div className={`
        absolute top-0 right-0 h-full w-full md:w-[380px] bg-[#1c1917] border-l border-white/[0.08] shadow-2xl
        transform transition-transform duration-300 z-30 flex flex-col
        ${activeThread ? "translate-x-0" : "translate-x-full"}
      `}>
         {/* Thread Header */}
         <div className="h-14 border-b border-white/[0.06] flex items-center justify-between px-5 bg-[#1c1917]/80 backdrop-blur-md">
            <h3 className="font-bold flex items-center gap-2 text-[15px]">
              Thread
              <span className="text-[#9e958c] font-normal text-sm">#{activeChannel.name}</span>
            </h3>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-[#066237]/10 hover:text-[#066237] text-[#9e958c] transition-colors"
                onClick={() => toast.success("Thread saved to bookmarks")}
                title="Bookmark thread"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/[0.06] text-[#9e958c]" onClick={() => setActiveThread(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
         </div>

         {/* Thread Content */}
         <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeThread && (
              <>
                {/* Original Message */}
                <div className="flex gap-3 pb-6 border-b border-white/[0.06]">
                   <div className={`w-10 h-10 rounded-xl ${activeThread.avatar} flex-shrink-0 flex items-center justify-center text-sm font-bold mt-1 shadow-sm`}>
                     {activeThread.user.split(' ').map((n:string) => n[0]).join('').slice(0,2)}
                   </div>
                   <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#e8e0d8] text-[15px]">{activeThread.user}</span>
                        <span className="text-[11px] text-[#9e958c] font-medium">{activeThread.time}</span>
                      </div>
                      <p className="text-[#e8e0d8] text-[15px] leading-relaxed whitespace-pre-wrap">
                        {activeThread.text}
                      </p>
                   </div>
                </div>
                
                {/* Replies Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1c1917] px-3 text-[#9e958c] font-bold tracking-wider text-[10px]">
                      {activeThread.replies || 0} Replies
                    </span>
                  </div>
                </div>

                {/* Replies List */}
                <div className="space-y-5">
                  {(activeThread.thread || []).map((reply: ChatReply) => (
                    <div key={reply.id} className="flex gap-3 group">
                       <div className={`w-8 h-8 rounded-lg ${reply.avatar || 'bg-[#352f2c] text-[#b8afa6]'} flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1 shadow-sm`}>
                         {reply.user.split(' ').map((n:string) => n[0]).join('').slice(0,2)}
                       </div>
                       <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#e8e0d8] text-sm">{reply.user}</span>
                            <span className="text-[10px] text-[#9e958c]">{reply.time}</span>
                          </div>
                          <p className="text-[#e8e0d8] text-sm leading-relaxed whitespace-pre-wrap">
                            {reply.text}
                          </p>
                       </div>
                    </div>
                  ))}
                  <div ref={threadEndRef} />
                </div>
              </>
            )}
         </div>

         {/* Thread Input */}
         <div className="p-5 bg-[#1c1917] border-t border-white/[0.06]">
           <div className="border border-white/[0.08] rounded-xl bg-[#252220] overflow-hidden focus-within:ring-1 focus-within:ring-[#066237]/20 focus-within:border-[#066237]/30 transition-all">
              <div className="flex items-end gap-2 p-2">
                <textarea
                  value={threadInputText}
                  onChange={(e) => setThreadInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendThreadReply();
                    }
                  }}
                  placeholder="Reply..."
                  className="flex-1 max-h-32 min-h-[32px] bg-transparent border-none focus:outline-none text-sm resize-none py-1.5 pl-2"
                  rows={1}
                  onInput={(e) => {
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                  }}
                />
                <Button 
                  onClick={handleSendThreadReply}
                  disabled={!threadInputText.trim()}
                  size="icon" 
                  className="h-8 w-8 rounded-lg bg-[#066237] hover:bg-[#05502d] flex-shrink-0 transition-all disabled:opacity-50 disabled:bg-[#2a2523] disabled:text-[#6b635b]"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </Button>
              </div>
           </div>
         </div>
      </div>

      {/* User Profile Modal/Overlay */}
      {selectedUser && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-[#1c1917] rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-white/[0.06]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-end p-3">
               <button 
                onClick={() => setSelectedUser(null)}
                className="p-2 text-[#6b635b] hover:text-[#e8e0d8] hover:bg-[#2a2523] rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 pb-10 text-center">
              <div className={`w-28 h-28 rounded-full ${selectedUser.avatar} border-4 border-[#252220] shadow-lg mx-auto mb-5 flex items-center justify-center text-3xl font-bold`}>
                {selectedUser.user.split(' ').map((n:string) => n[0]).join('').slice(0,2)}
              </div>
              <h3 className="text-2xl font-bold text-[#e8e0d8] mb-1">{selectedUser.user}</h3>
              <p className="text-[#066237] font-semibold text-sm mb-5 px-3 py-1 bg-[#066237]/5 rounded-full inline-block tracking-wide">
                {selectedUser.role || "Community Member"}
              </p>
              {selectedUser.location && (
                <div className="flex items-center justify-center gap-2 text-sm text-[#9e958c] mb-8">
                  <MapPin className="w-4 h-4" />
                  {selectedUser.location}
                </div>
              )}
              <div className="text-left bg-[#1f1c1a] rounded-2xl p-5">
                <h4 className="text-[10px] font-bold text-[#9e958c] uppercase tracking-wider mb-3 text-center">Interests</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {(selectedUser.interests || []).length > 0 ? (
                    selectedUser.interests.map((interest: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-[#1c1917] border border-white/[0.06] text-xs font-medium text-[#e8e0d8] shadow-sm">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#9e958c] italic">No interests listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
