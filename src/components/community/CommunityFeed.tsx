import { MessageSquare, Bookmark, Heart, MoreHorizontal, User } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { mockListings } from "../../data/mockListings";
import { mockNews, mockKnowledge } from "../../data/mockContent";

export function CommunityFeed() {
  // Mix and sort content for the feed
  const feedItems = [
    ...mockNews.map(item => ({ ...item, type: 'news', date: new Date(item.publishedAt) })),
    ...mockListings.slice(0, 3).map(item => ({ ...item, type: 'directory', date: new Date() })), // Mock date
    ...mockKnowledge.slice(0, 3).map(item => ({ ...item, type: 'explore', date: new Date() }))
  ].sort(() => Math.random() - 0.5); // Random shuffle for demo

  return (
    <div className="space-y-6 px-4 md:px-0">
      <div className="space-y-1 py-4 md:hidden">
        <h2 className="text-2xl font-semibold text-stone-900">Your Feed</h2>
        <p className="text-stone-500 text-sm">Latest updates from the community</p>
      </div>

      {feedItems.map((item: any, index) => (
        <FeedCard key={index} item={item} />
      ))}
      
      {/* Mock Chat Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-4 h-4 text-[#7935F8]" />
          <span className="text-sm font-medium text-stone-500">Trending in #psychedelics</span>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-medium text-stone-600">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm text-stone-800 leading-relaxed">
                <span className="font-medium text-stone-900">John Doe</span> Has anyone experimented with microdosing for creative writing? I'm finding it helps with flow state but sometimes makes editing harder.
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-stone-400">
                <span>2h ago</span>
                <button className="hover:text-stone-600">Reply</button>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-stone-100 border border-white -ml-1" />
                  <div className="w-4 h-4 rounded-full bg-stone-200 border border-white -ml-2" />
                  <span className="ml-1">5 replies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: any }) {
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'news': return 'News';
      case 'directory': return 'New Listing';
      case 'explore': return 'Knowledge';
      default: return 'Update';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'news': return 'text-[#7935F8] bg-[#7935F8]/10';
      case 'directory': return 'text-[#066237] bg-[#066237]/10';
      case 'explore': return 'text-[#B197FF] bg-[#B197FF]/20';
      default: return 'text-stone-500 bg-stone-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'directory' ? 'bg-gray-100' : ''}`}>
             {item.type === 'directory' && item.image ? (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                   <ImageWithFallback src={item.image} alt="Avatar" className="w-full h-full object-cover" />
                </div>
             ) : (
                <User className="w-4 h-4 text-stone-400" />
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-stone-900">
              {item.author || item.name || "FTO Team"}
            </span>
            <span className="text-xs text-stone-400">2h ago</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <Badge variant="secondary" className={`mb-2 hover:bg-opacity-80 border-0 ${getTypeColor(item.type)}`}>
          {getTypeLabel(item.type)}
        </Badge>
        <h3 className="text-lg font-semibold text-stone-900 mb-1 leading-tight">
          {item.title || item.name}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
          {item.excerpt || item.essence || item.about}
        </p>
      </div>

      {/* Image Attachment (conditional) */}
      {item.image && (
        <div className="mt-3 mx-4 rounded-xl overflow-hidden aspect-video relative bg-stone-100">
          <ImageWithFallback 
            src={item.image} 
            alt={item.title || item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-4 flex items-center justify-between mt-1">
        <div className="flex gap-4">
          <button className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-medium">Comment</span>
          </button>
          <button className="flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-medium">Like</span>
          </button>
        </div>
        <button className="text-stone-400 hover:text-[#7935F8] transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
