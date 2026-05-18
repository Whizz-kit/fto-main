import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categoryTypes } from "../../data/mockListings";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitModal({ open, onOpenChange }: SubmitModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    city: "",
    country: "",
    website: "",
    description: "",
    agreeToValues: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for your submission! We'll review it and get back to you soon.");
      setFormData({
        name: "",
        email: "",
        type: "",
        city: "",
        country: "",
        website: "",
        description: "",
        agreeToValues: false,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Submit your listing
          </DialogTitle>
          <DialogDescription>
            Join our curated directory of consciousness-driven communities and practitioners
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              placeholder="Your community, practice, or project name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select
              required
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {categoryTypes.filter(c => c !== "All").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                required
                placeholder="e.g. Byron Bay"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                required
                placeholder="e.g. Australia"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website *</Label>
            <Input
              id="website"
              type="url"
              required
              placeholder="https://your-website.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Short description *</Label>
            <Textarea
              id="description"
              required
              placeholder="A one-sentence essence of what you offer..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-xl min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Keep it poetic, clear, and grounded. This is your invitation to be found.
            </p>
          </div>

          {/* Image Upload Note */}
          <div className="bg-accent/20 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">
              📸 After submission, we'll reach out via email to collect images and additional details for your profile.
            </p>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="agree"
              checked={formData.agreeToValues}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeToValues: checked as boolean })
              }
            />
            <Label
              htmlFor="agree"
              className="text-sm cursor-pointer leading-relaxed"
            >
              I align with FTO values: consciousness expansion, grounded practice, authentic connection, and reverence for all beings
            </Label>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.agreeToValues || isSubmitting}
              className="flex-1 rounded-full bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit for review ✨"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}