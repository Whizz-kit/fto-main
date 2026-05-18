import { ArrowLeft, Calendar, MapPin, Globe, ExternalLink, Home, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Navigation } from "../layout/Navigation";
import { Footer } from "../layout/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { SEO } from "../shared/SEO";
import { Event } from "../../data/types";
import { mockEvents } from "../../data/mockContent";
import { formatContent } from "../../utils/formatContent";

interface EventDetailPageProps {
  eventId: string;
  events?: Event[];
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
}

export function EventDetailPage({ eventId, events, onBack, onNavigate = () => {}, onCommunityClick }: EventDetailPageProps) {
  const sourceEvents = events && events.length > 0 ? events : mockEvents;
  const event = sourceEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FCF8F3] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-[#101010]/60">Event not found</p>
          <Button onClick={onBack} className="bg-[#7935F8] text-white rounded-full">Back to Events</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] flex flex-col">
      <SEO
        title={event.title}
        description={event.description?.substring(0, 155) || `${event.title} — an event by ${event.organizer}`}
        image={event.image}
        url={`/events/${event.id}`}
        keywords={event.tags}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Event",
              "name": event.title,
              "description": event.description,
              "image": event.image,
              "startDate": event.startDate,
              "endDate": event.endDate || event.startDate,
              "eventAttendanceMode": event.location?.type === 'online'
                ? "https://schema.org/OnlineEventAttendanceMode"
                : event.location?.type === 'hybrid'
                ? "https://schema.org/MixedEventAttendanceMode"
                : "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": event.location?.type === 'online'
                ? { "@type": "VirtualLocation", "url": event.location?.url || event.website }
                : { "@type": "Place", "name": event.location?.venue || "", "address": { "@type": "PostalAddress", "addressLocality": event.location?.city, "addressCountry": event.location?.country } },
              "organizer": { "@type": "Organization", "name": event.organizer },
              ...(event.price ? { "offers": { "@type": "Offer", "price": event.price.type === 'free' ? "0" : event.price.amount || "", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": event.website } } : {})
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://findtheothers.world/" },
                { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://findtheothers.world/events" },
                { "@type": "ListItem", "position": 3, "name": event.title }
              ]
            }
          ]
        }}
      />
      {/* Navigation - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation
            onNavigate={onNavigate}
            onCommunityClick={onCommunityClick}
            currentPage="events"
          />
        </div>
      </div>

      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="pt-32 pb-4 px-6">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb>
              <BreadcrumbList className="text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                  >
                    <Home className="w-4 h-4 -mt-0.5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={onBack}
                    className="cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                  >
                    Events
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 text-[#101010] font-normal max-w-[200px] md:max-w-md">
                    {event.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              className="group h-auto p-0 hover:bg-transparent text-[#101010] font-medium hover:text-[#7935F8] transition-colors gap-2"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Events
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        {event.image && (
          <div className="px-6 pb-8">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#101010]/5">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <article className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            
            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#101010] mb-8 mt-2 font-semibold tracking-tight leading-[1.1]"
            >
              {event.title}
            </h1>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-10 border-b border-[#101010]/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#7935F8]" />
                </div>
                <div>
                  <p className="font-semibold text-[#101010]">Date & Time</p>
                  <p className="text-[#101010]/70 text-sm mt-1">{formatDate(event.startDate)}</p>
                  {event.endDate && (
                    <p className="text-[#101010]/70 text-sm">to {formatDate(event.endDate)}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0">
                  {event.location.type === 'online' ? (
                    <Globe className="w-5 h-5 text-[#7935F8]" />
                  ) : (
                    <MapPin className="w-5 h-5 text-[#7935F8]" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#101010]">Location</p>
                  <p className="text-[#101010]/70 text-sm mt-1 capitalize">
                    {event.location.type === 'online' ? 'Online Event' : `${event.location.city}, ${event.location.country}`}
                  </p>
                </div>
              </div>

              {(event as any).organizer && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#7935F8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#101010]">Organizer</p>
                    <p className="text-[#101010]/70 text-sm mt-1">{(event as any).organizer}</p>
                  </div>
                </div>
              )}

              {event.price && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#7935F8] font-bold text-sm">$</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#101010]">Price</p>
                    <p className="text-[#101010]/70 text-sm mt-1">
                      {typeof event.price === 'object' && 'amount' in event.price
                        ? `${String((event.price as any).amount).startsWith('$') || String((event.price as any).amount).startsWith('€') ? '' : '€'}${(event.price as any).amount}`
                        : event.price.type === 'free' ? 'Free' : event.price.type === 'donation' ? 'Donation' : 'Paid'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-12">
              <h3 className="text-2xl font-semibold text-[#101010] mb-4">About this Event</h3>
              <style>{`
                .event-content p {
                  margin-bottom: 1.25rem;
                  line-height: 1.85;
                }
                .event-content p:empty { display: none; }
                .event-content h2 {
                  font-weight: 600;
                  font-size: 1.5rem;
                  margin-top: 2.5rem;
                  margin-bottom: 0.75rem;
                  color: #101010;
                }
                .event-content h3 {
                  font-weight: 600;
                  font-size: 1.2rem;
                  margin-top: 2rem;
                  margin-bottom: 0.5rem;
                  color: #101010;
                }
                .event-content strong { color: #101010; font-weight: 600; }
                .event-content ul {
                  margin: 0.5rem 0 1rem 0;
                  padding-left: 0;
                  list-style: none;
                }
                .event-content li {
                  position: relative;
                  padding-left: 1.75rem;
                  margin-bottom: 0.2rem;
                  line-height: 1.65;
                }
                .event-content li::before {
                  content: '';
                  position: absolute;
                  left: 0.25rem;
                  top: 0.65rem;
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  background: #7935F8;
                }
              `}</style>
              <div
                className="event-content leading-relaxed text-[#101010]/90 font-light text-lg"
                dangerouslySetInnerHTML={{ __html: formatContent(event.description) }}
              />
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="pt-8 border-t border-[#101010]/10 mb-8">
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: idx % 3 === 0 ? '#B197FF20' : idx % 3 === 1 ? '#1ADF8320' : '#7935F820',
                        color: idx % 3 === 0 ? '#7935F8' : idx % 3 === 1 ? '#066237' : '#7935F8',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4">
               {event.website ? (
                <Button 
                  className="w-full sm:w-auto bg-[#7935F8] hover:bg-[#6929d6] text-white h-12 text-base rounded-full px-8 gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  onClick={() => window.open(event.website, "_blank")}
                >
                  Visit Event Website
                  <ExternalLink className="w-4 h-4" />
                </Button>
              ) : (
                <Button disabled className="w-full sm:w-auto h-12 rounded-full px-8">
                  Coming Soon
                </Button>
              )}
            </div>

          </div>
        </article>
      </div>
      
      {/* Footer */}
      <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
    </div>
  );
}