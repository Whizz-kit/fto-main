import { Navigation } from "../Navigation";
import { Button } from "../ui/button";
import { SEO } from "../SEO";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import phase2Image from "figma:asset/119c30e7a0d09e04c5c443323ffc0468459993d3.webp";
import phase3Image from "figma:asset/896e6438d72f24252a8688e146a34fb9132ab658.webp";
import phase4Image from "figma:asset/e33207b28ee90398f5ecd233825c222e1d14d981.webp";

interface RoadmapPageProps {
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
}

export function RoadmapPage({ onNavigate = () => {}, onCommunityClick }: RoadmapPageProps) {
  const handleContactClick = () => {
    window.location.href = "mailto:info@fto.world";
  };

  const handleConnectClick = () => {
    if (onCommunityClick) {
      onCommunityClick();
    } else {
      window.open("https://discord.com/invite/jXewfMFr4s", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#101010]">
      <SEO
        title="Roadmap"
        description="Our roadmap for the future. See what we're building and where Find The Others is heading."
        url="/about/roadmap"
        keywords={["roadmap", "future", "find the others", "vision"]}
      />
      <Navigation onNavigate={onNavigate} onCommunityClick={onCommunityClick} currentPage="about-roadmap" />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl md:text-7xl text-white font-bold">
              FTO Roadmap
            </h1>
            <p className="text-2xl md:text-3xl text-[#8B5CF6] font-semibold">
              This is just the beginning
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[#101010] leading-relaxed font-light">
                  Phase 1 is live. And we're only warming up. What started as a wild idea has grown into a living movement, powered by purpose, community and creativity.
                </p>
                <p className="text-[#101010] leading-relaxed mt-4 font-light">
                  This roadmap shares our intentions, our experiments, and the bold vision we're building. One phase at a time.
                </p>
                <Button 
                  onClick={handleContactClick}
                  className="mt-8 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full px-8 py-6 font-semibold"
                >
                  Contact us
                </Button>
              </div>
              <div className="relative h-64 md:h-auto">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="https://s3.amazonaws.com/webflow-prod-assets/6794d3433a800e0004578b50/68597013ea6f940b606fadfc_road.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Container */}
        <section className="max-w-4xl mx-auto px-6 relative">
          {/* Vertical Line - stops before Today section */}
          <div className="absolute left-1/2 top-0 bottom-[400px] w-0.5 bg-[#8B5CF6] -translate-x-1/2 hidden md:block" />

          {/* Phase 2 - Right */}
          <div className="relative mb-32">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="hidden md:block" />
              <div className="relative">
                {/* Dot */}
                <div className="absolute -left-[4.5rem] top-8 w-4 h-4 bg-[#8B5CF6] rounded-full border-4 border-[#101010] hidden md:block" />
                
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl text-white/60 mb-8 font-bold">
                    Phase 2
                  </h2>
                  <h3 className="text-2xl text-white mb-4 font-semibold">
                    A global directory for real-world connection
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    We launch a directory where the FTO community can find each other in the real world. 
                    From local meetups to global gatherings, this is where the movement begins to localize.
                  </p>
                </div>
                
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={phase2Image}
                    alt="FTO interface preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 - Left */}
          <div className="relative mb-32">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="relative md:text-right">
                {/* Dot */}
                <div className="absolute -right-[4.5rem] top-8 w-4 h-4 bg-[#8B5CF6] rounded-full border-4 border-[#101010] hidden md:block" />
                
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl text-white/60 mb-8 font-bold">
                    Phase 3
                  </h2>
                  <h3 className="text-2xl text-white mb-4 font-semibold">
                    First merchandise drop goes live
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    Designed with intention, made to be worn by those who walk the edge. 
                    This drop helps fund the mission while sending the message forward.
                  </p>
                </div>
                
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={phase3Image}
                    alt="Person wearing FTO merchandise"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Phase 4 - Right */}
          <div className="relative mb-32">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="hidden md:block" />
              <div className="relative">
                {/* Dot */}
                <div className="absolute -left-[4.5rem] top-8 w-4 h-4 bg-[#8B5CF6] rounded-full border-4 border-[#101010] hidden md:block" />
                
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl text-white/60 mb-8 font-bold">
                    Phase 4
                  </h2>
                  <h3 className="text-2xl text-white mb-4 font-semibold">
                    Explore evolves into a true knowledge ecosystem
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    We introduce deeper filtering, expert-led categories, and new research sources.
                    Explore becomes a living knowledge ecosystem. A growing map for transformation.
                  </p>
                </div>
                
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img
                    src={phase4Image}
                    alt="Knowledge ecosystem interface"
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Quote Block */}
                <div className="border-l-4 border-[#8B5CF6] pl-6 py-4 bg-white/5 rounded-r-2xl">
                  <p className="text-white/90 italic leading-relaxed mb-2 font-light">
                    "Our vision is simple: When scientific research and ancient wisdom meet in open space, growth happens naturally."
                  </p>
                  <p className="text-white/50 text-sm font-normal">
                    — Max, Designer & Co-founder of FTO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5 - Left */}
          <div className="relative mb-32">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="relative md:text-right">
                {/* Dot */}
                <div className="absolute -right-[4.5rem] top-8 w-4 h-4 bg-[#8B5CF6] rounded-full border-4 border-[#101010] hidden md:block" />
                
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl text-white/60 mb-8 font-bold">
                    Phase 5
                  </h2>
                  <h3 className="text-2xl text-white mb-4 font-semibold">
                    First (hybrid) event takes place
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    We gather in person. Immersive sound, talks, ceremony, and real conversation.
                    This is the moment where everything meets: ideas, people, practice, and the spark of something real.
                  </p>
                </div>
                
                <div className="rounded-2xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-64 object-cover"
                  >
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/6794d3433a800e0004578b50/68593a5bafa023bf1ee2103c_event.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Today Section - Centered */}
          <div className="relative mt-32">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl text-white/60 mb-8 font-bold">
                Today
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-white/90 leading-relaxed text-lg font-light">
                  FTO is more than an idea now.
                </p>
                <p className="text-white/90 leading-relaxed text-lg font-light">
                  It's a living system, built by a small team with a shared mission: 
                  To wake up each day with the freedom to create, the clarity to serve, and the courage to stay weird.
                </p>
                <p className="text-white/90 leading-relaxed text-lg font-light">
                  We're still experimenting. Still learning.
                </p>
                <p className="text-white/90 leading-relaxed text-lg font-light">
                  But the spark is real. And the proof is showing up in the people.
                </p>
              </div>

              <Button 
                onClick={handleConnectClick}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full px-10 py-6 text-lg font-semibold"
              >
                Connect now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
