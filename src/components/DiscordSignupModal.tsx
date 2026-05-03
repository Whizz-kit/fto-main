import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MessageCircle, Mail, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface DiscordSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiscordSignupModal({ open, onOpenChange }: DiscordSignupModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDiscordLink, setShowDiscordLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for joining! Opening Discord invite...");
      setShowDiscordLink(true);
      
      // Auto-open Discord invite after a short delay
      setTimeout(() => {
        window.open("https://discord.com/invite/jXewfMFr4s", "_blank");
      }, 1000);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setShowDiscordLink(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!showDiscordLink ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#7935F8]/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#7935F8]" />
                </div>
                <div>
                  <DialogTitle className="text-2xl">Join Our Community</DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-base leading-relaxed">
                Get instant access to our Discord community with live chat, online events, and connect with consciousness explorers worldwide.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-base">
                  Name
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11"
                    disabled={isSubmitting}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you the Discord invite link instantly
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#7935F8] hover:bg-[#7935F8]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Get Discord Invite"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-[#1ADF83]/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#1ADF83]" />
                </div>
                <div>
                  <DialogTitle className="text-2xl">You're All Set!</DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-base leading-relaxed">
                Your Discord invite is ready. Click the button below to join our community.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="bg-[#FCF8F3] rounded-2xl p-4 space-y-2">
                <p className="text-sm">
                  <strong>Email registered:</strong> {email}
                </p>
                <p className="text-xs text-muted-foreground">
                  Check your inbox for future updates and invitations to special events.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => window.open("https://discord.com/invite/jXewfMFr4s", "_blank")}
                  className="flex-1 bg-[#5865F2] hover:bg-[#5865F2]/90 text-white gap-2"
                >
                  Open Discord
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}