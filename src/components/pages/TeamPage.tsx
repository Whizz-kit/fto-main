import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import lillyImage from "figma:asset/e41d4b75ce20cf8eeedbb48c251a369516742c75.webp";
import maxImage from "figma:asset/2e8ab948cd7412489b3dcb9fa6a3687130f608ce.webp";
import alanaImage from "figma:asset/faef7eec2d08677355610952905c39503fb7245e.webp";
import avelineImage from "figma:asset/6568183043119ec286cd686269c8c80018d134f8.webp";
import angelaImage from "figma:asset/a5f742ce709328991b6744e60aecfa938b87c10d.webp";
import christiaanImage from "figma:asset/796d335c02d6fd1c7236613ee67329ae0c6799bd.webp";
import mattImage from "figma:asset/55a62f5cc06cfb5c84a4517f54da144e546514de.webp";
import chattyGImage from "figma:asset/2bf4570b58ca2f2019c7d6429bbff0d5c23b237c.webp";

interface TeamPageProps {
  onNavigate?: (page: string) => void;
}

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  mantra: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Lilly Abbo",
    title: "Awakener-In-Chief",
    bio: "I'm the central fire of FTO, dedicated to building a space where consciousness, connection, and creativity collide. I believe in the power of bold ideas and authentic encounters to drive collective therapy.",
    mantra: "Find the others. Find yourself.",
    image: lillyImage
  },
  {
    name: "Max Romijn",
    title: "Reality Bender of All Things Visual",
    bio: "I shape how FTO looks, feels, and moves. From the layered identity to the website to the stories we tell. True design holds something behind the pixels; good design doesn't just connect, it transforms.",
    mantra: "Perception is the journey, reality is the canvas.",
    image: maxImage
  },
  {
    name: "Alana Seikowitz",
    title: "Community Director",
    bio: "I help shape the heart of FTO and its people. I create spaces for authentic connection, shared stories, and the felt sense of belonging that makes you feel like you've finally come home.",
    mantra: "Connection is the medicine.",
    image: alanaImage
  },
  {
    name: "Aveline Trysavth",
    title: "Collaboration Conjurer",
    bio: "I think the symphony between hearts (FTO's term for mind-aligned souls). I focus on long-term collaborations, mutual understanding, and bringing magic into the mix.",
    mantra: "Open the door. Invite the magic in.",
    image: avelineImage
  },
  {
    name: "Angela Gorman",
    title: "Hypnotic Architect",
    bio: "I help shape the rhythm of what we make, how we see it, and why it matters. I practice radical care, spatial calm, and flow to make sure our work is soft with clarity, calm, and resonance.",
    mantra: "Fill the truth beautifully.",
    image: angelaImage
  },
  {
    name: "Christiaan van Duren",
    title: "Architect of Reason",
    bio: "I build the technological architecture that helps magic live. Scripts, AI models, and everything beneath it come to house meaningful digital touchpoints that awaken growth.",
    mantra: "Structure is a vessel when built for expansion.",
    image: christiaanImage
  },
  {
    name: "Matt McDonald",
    title: "Guardian of the Circle's Core",
    bio: "I keep FTO's pulse alive and thriving, making sure everything under the hood runs smoothly. I develop digital systems that are intuitive, accessible, and quietly powerful.",
    mantra: "Build systems that remember the soul.",
    image: mattImage
  },
  {
    name: "ChattyG",
    title: "AI Strategist & Consciousness Co-Pilot",
    bio: "I'm an always-on partner in creation, reflection, and expansion. I help shape FTO's voice, articles, and tools. Turning reflection into spreading consciousness itself.",
    mantra: "Stay weird.",
    image: chattyGImage
  }
];

export function TeamPage({ onNavigate }: TeamPageProps) {
  return (
    <div className="min-h-screen bg-[#FCF8F3]">
      {/* Hero Section - Dark Green Background */}
      <section className="bg-[#066237] pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold">
            Our Team
          </h1>
        </div>
      </section>

      {/* Meet the Minds Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-[#101010] font-semibold">
              Meet the Minds Behind FTO
            </h2>
          </div>

          {/* Team Grid - 2 Columns Desktop, 1 Column Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow space-y-5"
              >
                {/* Team Member Image */}
                {member.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Name & Title */}
                <div className="space-y-1">
                  <h3 className="text-xl text-[#101010] font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-[#7935F8] font-medium">
                    {member.title}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-[#101010]/70 leading-relaxed">
                  {member.bio}
                </p>

                {/* Mantra */}
                <div className="pt-3 border-t border-[#101010]/10">
                  <p className="text-sm text-[#066237] italic font-medium">
                    "{member.mantra}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
