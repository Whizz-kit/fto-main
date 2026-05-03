import { MessageCircle, Lock, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface CommentsSectionProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  className?: string;
}

export function CommentsSection({ 
  onLoginClick = () => {}, 
  onSignUpClick = () => {},
  className = "" 
}: CommentsSectionProps) {
  // Mock comments to be blurred
  const mockComments = [
    {
      author: "Sarah J.",
      time: "2 hours ago",
      content: "This was incredibly insightful! I've been looking for a community like this for months. Does anyone know if they host weekly meetups?",
      avatarColor: "bg-blue-100",
      initials: "SJ"
    },
    {
      author: "Michael Chen",
      time: "5 hours ago",
      content: "The perspective on consciousness here really resonates with my own experiences. I'd love to connect with others who are exploring these modalities.",
      avatarColor: "bg-green-100",
      initials: "MC"
    },
    {
      author: "Elena R.",
      time: "1 day ago",
      content: "Great resource! I've shared this with my meditation group.",
      avatarColor: "bg-purple-100",
      initials: "ER"
    }
  ];

  return (
    <section className={`py-12 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-[#7935F8]" />
        <h2 className="text-xl font-semibold">Community Discussion</h2>
        <span className="text-sm text-muted-foreground ml-2">(3 comments)</span>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        {/* Blurred Content */}
        <div className="p-6 md:p-8 space-y-8 filter blur-[6px] select-none opacity-60 pointer-events-none" aria-hidden="true">
          {mockComments.map((comment, index) => (
            <div key={index} className="flex gap-4">
              <div className={`w-10 h-10 rounded-full ${comment.avatarColor} flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0`}>
                {comment.initials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {comment.content}
                </p>
                <div className="pt-1 flex gap-4 text-xs text-muted-foreground font-medium">
                  <span>Reply</span>
                  <span>Like</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Mock input area */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
             <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
             <div className="flex-1 h-24 bg-gray-50 rounded-xl border border-gray-200" />
          </div>
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center max-w-md border border-white/50 space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-12 h-12 bg-[#7935F8]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-[#7935F8]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Join the conversation
              </h3>
              <p className="text-muted-foreground">
                Sign in or sign up to read discussion threads and add your own comments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
              <Button 
                onClick={onLoginClick}
                variant="outline"
                className="rounded-full border-[#7935F8]/20 hover:bg-[#7935F8]/5 hover:text-[#7935F8]"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUpClick}
                className="rounded-full bg-[#7935F8] hover:bg-[#7935F8]/90 text-white gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
