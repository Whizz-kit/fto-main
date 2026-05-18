import { useState, useEffect } from "react";
import logoImage from "../../assets/logo.webp";
import { Menu, MessageCircle, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

interface NavigationProps {
  onCommunityClick?: () => void;
  onNavigate: (page: string) => void;
  currentPage?: string;
}

export function Navigation({ onCommunityClick, onNavigate, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const internalNavItems = [
    { label: "Directory", value: "directory" },
    { label: "Explore", value: "explore" },
    { label: "News", value: "news" },
    { label: "Events", value: "events" },
  ];

  const aboutSubmenu = [
    { label: "Mission & Vision", value: "about", disabled: false },
    { label: "FTO Roadmap", value: "about-roadmap", disabled: false },
  ];

  const pageToPath: Record<string, string> = {
    home: "/",
    directory: "/directory",
    explore: "/explore",
    news: "/news",
    events: "/events",
    about: "/about",
    "about-roadmap": "/about/roadmap",
    "about-team": "/about/team",
  };

  const handleNavClick = (value: string) => {
    onNavigate(value);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full py-4 px-4 2xl:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <div className={`rounded-full px-4 md:px-6 py-3 2xl:py-4 2xl:px-8 flex items-center justify-between gap-4 pointer-events-auto transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-white/20' 
            : 'bg-white shadow-lg'
        }`}>
          {/* Logo and Navigation Items - Left Aligned */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("home"); }} className="flex-shrink-0">
              <img
                src={logoImage}
                alt="Find The Others"
                className="h-6 w-auto"
              />
            </a>
            
            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {internalNavItems.map((item) => (
                <a
                  key={item.value}
                  href={pageToPath[item.value]}
                  onClick={(e) => { e.preventDefault(); onNavigate(item.value); }}
                  className={`text-sm hover:text-primary transition-colors font-normal ${
                    currentPage === item.value ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <a
                  href="/about"
                  onClick={(e) => e.preventDefault()}
                  className={`text-sm hover:text-primary transition-colors font-normal flex items-center gap-1 py-2 ${
                    currentPage?.startsWith('about') ? 'text-primary' : ''
                  }`}
                >
                  About
                  <ChevronDown className={`w-3 h-3 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </a>
                
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 pt-1 -mt-1">
                    <div className="bg-white rounded-2xl shadow-lg py-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {aboutSubmenu.map((item) => (
                        <a
                          key={item.value}
                          href={pageToPath[item.value]}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) {
                              onNavigate(item.value);
                              setAboutDropdownOpen(false);
                            }
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                            currentPage === item.value ? 'text-primary bg-primary/10' : ''
                          } ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={onCommunityClick}
              className="rounded-full px-5 py-2 bg-primary hover:bg-primary/90 gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join the community</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="w-12 h-12"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Clean Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-3xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="p-2">
              {internalNavItems.map((item) => (
                <a
                  key={item.value}
                  href={pageToPath[item.value]}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.value); }}
                  className={`block w-full text-left py-3 px-4 rounded-2xl transition-colors font-normal ${
                    currentPage === item.value
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* About Submenu in Mobile */}
              <div className="pl-2">
                <div className="text-xs uppercase text-muted-foreground px-4 py-2 mt-2">About</div>
                {aboutSubmenu.map((item) => (
                  <a
                    key={item.value}
                    href={pageToPath[item.value]}
                    onClick={(e) => { e.preventDefault(); if (!item.disabled) handleNavClick(item.value); }}
                    className={`block w-full text-left py-2 px-4 rounded-2xl transition-colors font-normal text-sm ${
                      currentPage === item.value
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    } ${item.disabled ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              {/* Join Community Button in Mobile Menu */}
              <div className="p-2 pt-4">
                <Button
                  onClick={() => {
                    onCommunityClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full py-6 bg-[#7935F8] hover:bg-[#7935F8]/90 text-white gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join our community
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}