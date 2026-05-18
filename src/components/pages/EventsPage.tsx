import { useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink, Globe, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FadeInSection } from "../shared/FadeInSection";
import { SEO } from "../shared/SEO";
import { Event } from "../../data/types";
import { mockEvents } from "../../data/mockContent";
import eventsBannerImage from "../../assets/events-banner.webp";
import { useContent } from "../../hooks/useContent";

interface EventsPageProps {
  onEventClick?: (id: string) => void;
}

export function EventsPage({ onEventClick }: EventsPageProps) {
  const { data: cmsEvents, loading } = useContent<Event>('events');
  const events = cmsEvents.length > 0 ? cmsEvents : mockEvents;
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");

  const now = new Date();
  const filteredEvents = filter === "upcoming" 
    ? events.filter(e => new Date(e.startDate) >= now)
    : events;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatDateRange = (start: string, end?: string) => {
    if (!end) return formatDate(start);
    const startDate = formatDate(start);
    const endDate = formatDate(end);
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3]">
      <SEO
        title="Events & Gatherings"
        description="Retreats, workshops, ceremonies, and spaces where real connection happens. Find consciousness-expanding events worldwide."
        url="/events"
        keywords={["events", "retreats", "workshops", "ceremonies", "consciousness", "gatherings"]}
      />
      {/* Hero */}
      <section className="pt-48 pb-12 px-4">
        <FadeInSection>
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-[#101010] text-4xl md:text-5xl font-semibold tracking-tight">
            Events & Gatherings
          </h1>
          <p className="text-[#101010]/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Retreats, workshops, ceremonies, and spaces where real connection happens
          </p>
        </div>
        </FadeInSection>
      </section>

      {/* Filters */}
      <section className="bg-[#FCF8F3] border-b border-[#101010]/10 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === "upcoming"
                  ? "bg-[#066237] text-white font-semibold"
                  : "bg-white hover:bg-white/80 text-[#101010]/70 border border-[#101010]/10 font-normal"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === "all"
                  ? "bg-[#066237] text-white font-semibold"
                  : "bg-white hover:bg-white/80 text-[#101010]/70 border border-[#101010]/10 font-normal"
              }`}
            >
              All Events
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="bg-[#FCF8F3] pt-8 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-muted-foreground">No events yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                  onClick={() => onEventClick?.(event.id)}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 aspect-video md:aspect-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDateRange(event.startDate, event.endDate)}</span>
                        </div>
                        {event.location.type === 'in-person' && event.location.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location.city}, {event.location.country}</span>
                          </div>
                        )}
                        {event.location.type === 'online' && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span>Online</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="rounded-full">
                          {event.location.type}
                        </Badge>
                        {event.price && (
                          <Badge variant="outline" className="rounded-full flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {event.price.type}
                          </Badge>
                        )}
                        {event.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {event.website && (
                        <div className="pt-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick?.(event.id);
                            }}
                            variant="outline"
                            className="rounded-full gap-2"
                          >
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}