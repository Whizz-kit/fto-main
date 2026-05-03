import { useState } from "react";
import { Hash, MessageSquare, ChevronRight, Send, Paperclip } from "lucide-react";
import { Button } from "../../ui/button";

const CHANNELS = [
  { id: "general", name: "general", category: "Community" },
  { id: "foundations", name: "foundational-knowledge", category: "Learn" },
  { id: "psychedelics", name: "psychedelics", category: "Topics" },
  { id: "breathwork", name: "breathwork", category: "Topics" },
  { id: "meditation", name: "meditation-mindfulness", category: "Topics" },
  { id: "events", name: "events-meetups", category: "Community" },
];

const MOCK_MESSAGES = [
  { id: 1, user: "Sarah J.", avatar: "bg-blue-100", time: "10:30 AM", content: "Has anyone tried the new breathwork technique mentioned in the weekly newsletter?" },
  { id: 2, user: "Mike Chen", avatar: "bg-green-100", time: "10:35 AM", content: "Yes! It was intense but very grounding. I'd recommend starting with just 5 minutes." },
  { id: 3, user: "Elena R.", avatar: "bg-purple-100", time: "10:42 AM", content: "I'm planning to join the group session this Sunday if anyone else is going." },
  { id: 4, user: "David K.", avatar: "bg-yellow-100", time: "11:05 AM", content: "Is there a link for that? I missed the announcement." },
];

export function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] md:h-[calc(100vh-64px)] bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
      {/* Channels Sidebar */}
      <div className="w-full md:w-64 bg-stone-50/50 border-r border-stone-100 flex flex-col">
        <div className="p-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">Channels</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          {["Community", "Topics", "Learn"].map(category => (
            <div key={category}>
              <h3 className="px-3 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{category}</h3>
              <div className="space-y-0.5">
                {CHANNELS.filter(c => c.category === category).map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeChannel === channel.id 
                        ? "bg-white text-stone-900 shadow-sm font-medium" 
                        : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Hash className="w-4 h-4 opacity-50" />
                    <span className="truncate">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-stone-400" />
            <span className="font-semibold text-stone-900">
              {CHANNELS.find(c => c.id === activeChannel)?.name}
            </span>
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100" />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100" />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs text-stone-600 font-medium">+12</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} className="group flex gap-4">
              <div className={`w-10 h-10 rounded-full ${msg.avatar} flex-shrink-0 flex items-center justify-center text-sm font-medium text-stone-700`}>
                {msg.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium text-stone-900">{msg.user}</span>
                  <span className="text-xs text-stone-400">{msg.time}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {msg.content}
                </p>
                {/* Actions */}
                <div className="flex items-center gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-xs font-medium text-stone-400 hover:text-stone-600 flex items-center gap-1">
                     <MessageSquare className="w-3 h-3" /> Reply
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-stone-100">
          <div className="relative flex items-center gap-2 bg-stone-50 rounded-xl p-2 border border-stone-100 focus-within:ring-2 focus-within:ring-[#7935F8]/10 focus-within:border-[#7935F8]/30 transition-all">
            <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-600 h-9 w-9">
              <Paperclip className="w-5 h-5" />
            </Button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${CHANNELS.find(c => c.id === activeChannel)?.name}`}
              className="flex-1 bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-400 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setMessage('');
              }}
            />
            <Button size="icon" className="h-9 w-9 rounded-lg bg-[#066237] hover:bg-[#066237]/90 text-white">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
