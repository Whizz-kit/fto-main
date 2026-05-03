import { useState } from "react";
import { Button } from "../ui/button";
import { SEO } from "../SEO";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface ShopPageProps {
  onBackToDirectory: () => void;
}

export function ShopPage({ onBackToDirectory }: ShopPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.success("Thanks for signing up! We'll notify you when the shop launches.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] pt-32 pb-24 px-4">
      <SEO 
        title="Shop"
        description="FTO Collection One coming soon. Intentional design, sustainable materials. A signal for those who are paying attention."
        url="/shop"
      />
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Shop coming soon...
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-center leading-relaxed text-muted-foreground">
          <p>
            Not merchandise. A signal. Something you wear that says: I'm paying attention. I'm looking for the others.
          </p>
          <p>
            Collection One is built with intention. Sustainable materials, bold design, and the kind of meaning you can actually feel. Made for people who walk the edge between inner world and outer life.
          </p>
          <p>
            Leave your email. When the doors open, you'll be the first to know.
          </p>
        </div>

        {/* Email Signup */}
        <div className="pt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 rounded-full px-6 text-base bg-white"
                disabled={isSubmitting}
                required
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 rounded-full px-6 text-base bg-white"
                disabled={isSubmitting}
              />
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full px-6 text-base bg-white"
              disabled={isSubmitting}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full text-base bg-[#7935F8] hover:bg-[#7935F8]/90"
            >
              {isSubmitting ? "Signing up..." : "Get Notified"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
