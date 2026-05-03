import { Heart, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import logoImage from "figma:asset/2c142ae2d239863afbacda06ffe7aadd18b38a7e.webp";
import { toast } from "sonner";

interface FooterProps {
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
}

export function Footer({ onNavigate, onCommunityClick }: FooterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavClick = (e: React.MouseEvent, page: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
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
      toast.success("Thanks for signing up! We'll keep you updated.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#101010] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Newsletter */}
          <div className="space-y-4 md:col-span-1">
            <img 
              src={logoImage} 
              alt="Find The Others" 
              className="h-6 w-auto brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              Consciousness. Connection. Transformation.
            </p>
            
            {/* Newsletter Signup */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3 text-white/90">Stay Updated</h4>
              <form onSubmit={handleNewsletterSignup} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                    disabled={isSubmitting}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                    disabled={isSubmitting}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                  disabled={isSubmitting}
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-[#7935F8] hover:bg-[#7935F8]/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">Discover</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a 
                  href="/directory" 
                  onClick={(e) => handleNavClick(e, "directory")}
                  className="hover:text-white transition-colors"
                >
                  Directory
                </a>
              </li>
              <li>
                <a 
                  href="/explore" 
                  onClick={(e) => handleNavClick(e, "explore")}
                  className="hover:text-white transition-colors"
                >
                  Explore Articles
                </a>
              </li>
              <li>
                <a 
                  href="/events" 
                  onClick={(e) => handleNavClick(e, "events")}
                  className="hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a 
                  href="/news" 
                  onClick={(e) => handleNavClick(e, "news")}
                  className="hover:text-white transition-colors"
                >
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">About</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a 
                  href="/about" 
                  onClick={(e) => handleNavClick(e, "about")}
                  className="hover:text-white transition-colors"
                >
                  About FTO
                </a>
              </li>
              <li>
                <a
                  href="/about/roadmap"
                  onClick={(e) => handleNavClick(e, "about-roadmap")}
                  className="hover:text-white transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/90">Connect</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a 
                  href="mailto:info@fto.world" 
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@fto.world
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onCommunityClick) {
                      onCommunityClick();
                    } else {
                      window.open("https://discord.com/invite/jXewfMFr4s", "_blank");
                    }
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Community
                </button>
              </li>
              <li>
                <a 
                  href="https://instagram.com/findtheothers" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>
            © <button 
              onClick={(e) => {
                e.preventDefault();
                // Admin link removed for pure frontend
              }}
              className="hover:text-white/70 transition-colors cursor-default"
            >
              2026
            </button> Find The Others. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the ones who are looking
            </p>
            <button 
              onClick={(e) => handleNavClick(e, "admin")} 
              className="hover:text-white transition-colors text-xs opacity-50 hover:opacity-100"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}