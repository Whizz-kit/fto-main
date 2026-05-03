import { User, Settings, MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { Button } from "../../ui/button";

export function CommunityProfile() {
  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 text-center relative overflow-hidden">
        <div className="w-24 h-24 bg-stone-100 rounded-full mx-auto mb-4 border-4 border-white shadow-sm flex items-center justify-center">
           <User className="w-10 h-10 text-stone-300" />
        </div>
        <h2 className="text-xl font-semibold text-stone-900">Guest User</h2>
        <p className="text-stone-500 text-sm mb-6">Explorer of Consciousness</p>
        
        <div className="flex justify-center gap-6 text-sm text-stone-600 mb-6">
          <div className="flex flex-col">
            <span className="font-semibold text-stone-900">0</span>
            <span className="text-xs text-stone-400">Posts</span>
          </div>
          <div className="flex flex-col">
             <span className="font-semibold text-stone-900">0</span>
             <span className="text-xs text-stone-400">Following</span>
          </div>
          <div className="flex flex-col">
             <span className="font-semibold text-stone-900">0</span>
             <span className="text-xs text-stone-400">Followers</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="outline" className="rounded-full">Edit Profile</Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bio / Details */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 space-y-4">
        <h3 className="font-semibold text-stone-900">About</h3>
        <div className="space-y-3 text-sm text-stone-600">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-stone-400" />
            <span>Planet Earth</span>
          </div>
          <div className="flex items-center gap-3">
            <LinkIcon className="w-4 h-4 text-stone-400" />
            <span className="text-stone-400 italic">No website added</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>Joined January 2026</span>
          </div>
        </div>
      </div>

      {/* Activity Placeholder */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 min-h-[200px] flex items-center justify-center text-center">
         <div className="space-y-2">
            <p className="text-stone-900 font-medium">No recent activity</p>
            <p className="text-stone-400 text-sm">Join conversations to see your activity here.</p>
         </div>
      </div>
    </div>
  );
}
