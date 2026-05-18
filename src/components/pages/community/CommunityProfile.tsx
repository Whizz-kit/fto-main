import { useState, useEffect } from "react";
import { MapPin, Calendar, Edit2, Check, Plus, Camera, X, Award, Sparkles, Settings } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";

const ALL_INTERESTS = [
  // FTO Specific
  "Psychedelic Science", "Microdosing", "Plant Medicine", "Shamanism", 
  "Holotropic Breathwork", "Somatic Experiencing", "Internal Family Systems (IFS)",
  "Non-Duality", "Mysticism", "Sacred Geometry", "Visionary Art",
  "Regenerative Agriculture", "Community Living",
  
  // General
  "Meditation", "Permaculture", "Breathwork", "Community Building",
  "Psychedelics", "Yoga", "Integration", "Nature", "Sound Healing",
  "Art Therapy", "Consciousness", "Sustainability", "Music", "Dance",
  "Technology", "Philosophy", "Psychology", "Wellness"
].sort();

const COMMUNITY_ROLES = [
  "Curious Beginners",
  "Experienced Explorers",
  "Seekers of Healing & Growth",
  "Creators & Artists",
  "Spiritual Explorers",
  "Integration & Healing Professionals",
  "Advocates & Allies"
];

export function CommunityProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Meditation", "Permaculture", "Breathwork", "Plant Medicine"
  ]);
  const [role, setRole] = useState("Experienced Explorers");
  const [bio, setBio] = useState("Exploring the intersections of mindfulness, nature, and community. Passionate about regenerative living and finding the others. 🌱");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated");
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-10 pt-8 animate-pulse pb-20">
        <div className="text-center space-y-6">
          <div className="w-36 h-36 rounded-full bg-[#352f2c] mx-auto" />
          <div className="space-y-3 flex flex-col items-center">
             <div className="h-8 w-48 bg-[#352f2c] rounded-lg" />
             <div className="h-5 w-32 bg-[#2a2523] rounded-lg" />
          </div>
        </div>
        <div className="h-px bg-[#2a2523] w-full" />
        <div className="space-y-5">
           <div className="h-4 w-24 bg-[#2a2523] rounded" />
           <div className="h-32 w-full bg-[#1f1c1a] rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-24 pt-10">
      {/* Header Section */}
      <div className="text-center space-y-6 pt-6 relative">
        
        {/* Avatar */}
        <div className="relative w-36 h-36 mx-auto group perspective-1000">
          <div className="w-full h-full rounded-full bg-[#252220] p-2 shadow-xl shadow-black/30 border border-white/[0.06] transition-transform duration-500 hover:scale-105">
             <div className="w-full h-full rounded-full bg-gradient-to-br from-[#066237] to-[#044a29] flex items-center justify-center text-white text-5xl font-bold shadow-inner relative overflow-hidden">
               GU
               <div className="absolute inset-0 bg-[#252220]/10 opacity-0 group-hover:opacity-20 transition-opacity" />
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#252220]/10 rounded-full blur-2xl" />
             </div>
          </div>
          {isEditing && (
            <button
               onClick={() => toast.info("Photo upload coming soon")}
               className="absolute bottom-1 right-1 p-3.5 bg-[#252220] rounded-full shadow-lg border border-white/[0.06] text-[#e8e0d8] hover:text-[#066237] transition-all hover:scale-110 active:scale-95 animate-in zoom-in"
               title="Change photo"
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-[#e8e0d8] tracking-tight">Guest User</h2>
          <p className="text-[#857c73] font-medium text-lg flex items-center justify-center gap-1">
            @guest_explorer
            <Award className="w-4 h-4 text-yellow-500" />
          </p>
          
          {/* Role Display (Always visible unless editing role section specifically overrides, but we keep it simple here) */}
          {!isEditing && (
             <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#066237]/10 text-[#066237] font-bold text-sm tracking-wide uppercase border border-[#066237]/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  {role}
               </span>
             </div>
          )}
        </div>

        {/* Metadata Pills */}
        <div className="flex items-center justify-center gap-4 text-sm text-[#857c73]/80 font-semibold flex-wrap">
          <div className="flex items-center gap-2 bg-[#252220] px-4 py-2 rounded-full border border-white/[0.06] shadow-sm shadow-black/20 cursor-default">
            <MapPin className="w-4 h-4 text-[#066237]" />
            <span>Amsterdam, NL</span>
          </div>
          <div className="flex items-center gap-2 bg-[#252220] px-4 py-2 rounded-full border border-white/[0.06] shadow-sm shadow-black/20 cursor-default">
            <Calendar className="w-4 h-4 text-[#066237]" />
            <span>Joined Jan 2024</span>
          </div>
        </div>

        {/* Main Edit Action */}
        {!isEditing && (
          <div className="pt-4">
            <Button 
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="rounded-full px-8 h-10 border-white/[0.1] text-[#e8e0d8] hover:bg-white/[0.06] transition-colors font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Community Role Section (Edit Mode Only) */}
      {isEditing && (
        <div className="space-y-4 group animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#857c73]/60 flex items-center gap-2">
              Community Role
              <span className="w-1.5 h-1.5 rounded-full bg-[#066237] animate-pulse" />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 bg-[#252220] rounded-[2rem] border border-white/[0.08] shadow-inner">
             {COMMUNITY_ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`
                    p-3 rounded-xl text-sm font-semibold text-left transition-all border flex items-center justify-between
                    ${role === r 
                      ? "bg-[#066237] text-white border-[#066237] shadow-md shadow-[#066237]/20" 
                      : "bg-[#1f1c1a] text-[#857c73] border-transparent hover:bg-[#252220] hover:border-[#066237]/30 hover:text-[#e8e0d8]"
                    }
                  `}
                >
                  {r}
                  {role === r && <Check className="w-4 h-4" />}
                </button>
             ))}
          </div>
        </div>
      )}

      {/* About Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#857c73]/60 flex items-center gap-2">
          About
          {isEditing && <span className="w-1.5 h-1.5 rounded-full bg-[#066237] animate-pulse" />}
        </h3>
        
        {isEditing ? (
          <div className="relative animate-in fade-in zoom-in-95 duration-200">
             <textarea
               value={bio}
               onChange={(e) => setBio(e.target.value)}
               className="w-full p-6 rounded-[2rem] bg-[#252220] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#066237]/20 focus:border-[#066237] min-h-[160px] text-[#e8e0d8] leading-relaxed resize-none text-lg shadow-inner transition-all"
               placeholder="Tell us about yourself..."
             />
             <div className="absolute bottom-5 right-6 text-xs text-[#857c73] font-bold pointer-events-none opacity-50">
               {bio.length}/500
             </div>
          </div>
        ) : (
          <div className="p-8 rounded-[2rem] bg-[#252220] border border-white/[0.06] shadow-sm shadow-black/20">
            <p className="text-[#e8e0d8] leading-relaxed text-lg font-light">
              {bio}
            </p>
          </div>
        )}
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#857c73]/60 flex items-center gap-2">
            Interests
             {isEditing && <span className="w-1.5 h-1.5 rounded-full bg-[#066237] animate-pulse" />}
          </h3>
          {isEditing && (
            <span className="text-xs text-[#066237] font-bold bg-[#066237]/10 px-2.5 py-1 rounded-lg shadow-sm shadow-black/20">{selectedInterests.length} selected</span>
          )}
        </div>

        <div className={`flex flex-wrap gap-3 ${isEditing ? 'p-8 bg-[#252220] rounded-[2rem] border border-white/[0.08] shadow-inner animate-in fade-in zoom-in-95 duration-200' : ''}`}>
          {isEditing ? (
            // Edit Mode: Show all available with toggle state
            ALL_INTERESTS.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-5 py-2.5 rounded-xl text-sm transition-all border font-semibold ${
                    isSelected
                      ? "bg-[#066237] text-white border-[#066237] shadow-lg shadow-[#066237]/20 transform scale-105"
                      : "bg-[#1f1c1a] text-[#857c73] border-transparent hover:bg-[#252220] hover:border-[#066237]/20 hover:text-[#066237] hover:shadow-sm shadow-black/20"
                  }`}
                >
                  {interest}
                </button>
              );
            })
          ) : (
            // View Mode: Show only selected
            selectedInterests.map(interest => (
              <span
                key={interest}
                className="px-5 py-2.5 rounded-xl bg-[#252220] text-[#e8e0d8] text-sm border border-white/[0.06] font-semibold shadow-sm shadow-black/20 cursor-default"
              >
                {interest}
              </span>
            ))
          )}
        </div>
      </div>
      
      {/* Floating Action Bar for Edit Mode */}
      {isEditing && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-12 md:bottom-10 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-[#252220] text-white p-2 pl-5 rounded-full shadow-2xl flex items-center gap-5 border border-white/[0.1]">
            <span className="text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Unsaved changes
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(false)}
                className="h-10 px-5 rounded-full text-white/70 hover:text-white hover:bg-[#252220]/10 font-medium"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm"
                className="h-10 px-6 rounded-full bg-[#066237] text-white hover:bg-[#05502d] font-semibold transition-colors"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
