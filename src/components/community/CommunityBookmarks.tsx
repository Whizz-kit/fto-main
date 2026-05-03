import { Bookmark, FileText, Calendar, MessageSquare } from "lucide-react";

export function CommunityBookmarks() {
  const bookmarks = [
    { type: 'article', title: 'Understanding the Default Mode Network', savedAt: '2 days ago', category: 'Neuroscience' },
    { type: 'event', title: 'Full Moon Sound Bath Ceremony', savedAt: '1 week ago', category: 'Events' },
    { type: 'thread', title: 'Integration techniques after retreat', savedAt: '2 weeks ago', category: 'Discussion' },
    { type: 'article', title: 'The History of Psilocybin', savedAt: '3 weeks ago', category: 'History' },
  ];

  return (
    <div className="space-y-6 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Saved Items</h2>
          <p className="text-stone-500 text-sm">Your personal library of content</p>
        </div>
      </div>

      <div className="grid gap-4">
        {bookmarks.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-stone-100 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              item.type === 'article' ? 'bg-purple-50 text-purple-600' :
              item.type === 'event' ? 'bg-green-50 text-green-600' :
              'bg-orange-50 text-orange-600'
            }`}>
              {item.type === 'article' && <FileText className="w-5 h-5" />}
              {item.type === 'event' && <Calendar className="w-5 h-5" />}
              {item.type === 'thread' && <MessageSquare className="w-5 h-5" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">{item.category}</span>
                <span className="text-xs text-stone-400">{item.savedAt}</span>
              </div>
              <h3 className="text-base font-medium text-stone-900 truncate">{item.title}</h3>
            </div>
            
            <button className="text-[#7935F8]">
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
