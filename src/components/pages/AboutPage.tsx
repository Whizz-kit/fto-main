import { Circle } from "lucide-react";
import { SEO } from "../shared/SEO";
import { Button } from "../ui/button";
import aboutBannerImage from "../../assets/about-banner.webp";
import gatheringImage from "../../assets/about-gathering.webp";

interface AboutPageProps {
  onBackToDirectory: () => void;
}

export function AboutPage({ onBackToDirectory }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#7935F8]">
      <SEO
        title="About Us"
        description="Find The Others is a public benefit corporation building a curated ecosystem for consciousness, transformation, and human connection."
        url="/about"
        keywords={["about", "find the others", "consciousness", "public benefit corporation", "mission"]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Find The Others",
          "description": "A public benefit corporation building a curated ecosystem for consciousness, transformation, and human connection.",
          "url": "https://findtheothers.world",
          "sameAs": ["https://instagram.com/findtheothers", "https://discord.com/invite/jXewfMFr4s"]
        }}
      />
      {/* Hero - Purple Banner with Decorative Background */}
      <section className="relative pt-36 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src={aboutBannerImage} 
            alt="About Find The Others"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl leading-tight font-semibold">
            Vision, Mission<br />& Core Values
          </h1>
        </div>
      </section>

      {/* Public Benefit Corporation Section */}
      <section className="bg-[#FCF8F3] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  We're a Public Benefit Corporation
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Find The Others (FTO) is a public benefit corporation founded in 2018. A PBC is a legal structure designed to balance profit and purpose. We exist to build meaningful resources that help people navigate consciousness, find community, and contribute to a more aware world.
                </p>
                <Button 
                  onClick={() => window.open("https://fto.world", "_blank")}
                  className="rounded-full px-6 py-3 bg-[#101010] hover:bg-[#101010]/90 text-white"
                >
                  Contact us
                </Button>
              </div>
              <div className="h-64 lg:h-auto">
                <img 
                  src={gatheringImage}
                  alt="Community gathering" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-[#FCF8F3] pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-center font-semibold">Vision</h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <p className="text-muted-foreground leading-relaxed">
                To be a catalyst and guide for every seeker. As a research project, we aim to deeply understand how people and communities transform, and to share what we learn. As a digital resource, we make it easier to find the people, places, practices, and wisdom that support healing, creativity, and expanded awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Dark Background */}
      <section className="bg-[#101010] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl text-center text-white font-semibold">Mission</h2>
            <div className="space-y-4">
              <p className="text-white/90 leading-relaxed">
                FTO exists to build one of the most thoughtful and complete consciousness resources in the world. We bring together a community of people committed to developing integrity, authenticity, and self-awareness. We believe that deepening consciousness helps us see the patterns that keep us disconnected, and opens pathways toward liberation and real relationship. Integrity, for us, is a rigorous and ongoing practice of seeing ourselves as worthy, whole, and interconnected.
              </p>
              <p className="text-white/90 leading-relaxed">
                We are committed to understanding how individuals and groups truly change, and to creating the kind of spaces that bring people together in ways that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[#FCF8F3] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <h2 className="text-3xl md:text-4xl text-center font-semibold">Core Values</h2>

          {/* Exploration over Extractivism */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Exploration over Extractivism
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We value the richness of human experience, the full range of what a life contains, with curiosity, humility, and wonder. This is itself a form of healing: a move away from the commodified ways we're taught to make meaning of our lives, our culture, and our relationships.
            </p>
          </div>

          {/* Discernment as Default */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Discernment as Default
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We strive to be critical thinkers. Everyone in FTO is here because we've looked at what they do, how they engage, and the impact of their work. It's intentional. We encourage practices that help people develop their own center of sensing and knowing, and we support each other in learning to trust that inner compass.
            </p>
          </div>

          {/* Autonomy as Power */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Autonomy as Power
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We believe that autonomy, the ability to think, feel, and choose for yourself, is one of the deepest forms of liberation. And we recognize that it doesn't arise in isolation. It's a practice, shaped by our relationships, and it needs genuine support to grow and sustain.
            </p>
          </div>

          {/* Healing as Right */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Healing as Right
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We believe that the resources to heal are, and should always be, a human right. And exploring healing routes that are created by our communities, and grounded in indigenous and ancient practices, is an important place to reach for now.
            </p>
          </div>

          {/* Relationship as Resistance */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Relationship as Resistance
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Resistance is essential to the work we do. We cultivate connection as our resistance. Rigorous introspection, and self-reflective communities that center care and mutual aid are deep forms of resistance against the corporate-capitalist-individualist world we live in.
            </p>
          </div>

          {/* Being Slow/Intentional vs Notice */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Slowness as Intention
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We could always do more, faster. Instead, we're intentional about slowness. We try to notice when the pressure to grow bigger and faster is pulling us away from what matters. We prioritize long-term relationships and sustainability over flash-in-the-pan growth.
            </p>
          </div>

          {/* Transformation as a Practice */}
          <div className="space-y-4">
            <h3 className="text-2xl flex items-start gap-3 font-semibold">
              <Circle className="w-3 h-3 fill-[#7935F8] text-[#7935F8] mt-2 flex-shrink-0" />
              Transformation as a Practice
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We take responsibility, as individuals and as an organization, for the harm we may cause, and we practice acknowledging and working to change it. We believe all of us are in a long process of refining our attention and understanding, and we're grateful to do that work together.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
            <Button
              onClick={onBackToDirectory}
              className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Explore Directory
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
