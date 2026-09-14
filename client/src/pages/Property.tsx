/* Quiet Luxury Editorial: property detail is a slow, image-led read with a sticky service rail, precise metadata, and dialogs that make a viewing request feel considered and transparent. */
import { AirVent, ArrowLeft, ArrowRight, Bath, BedDouble, CalendarDays, Check, ChevronDown, ConciergeBell, Dumbbell, Fence, Heart, Mail, MapPin, ParkingSquare, Phone, Wifi, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { findRental } from "@/data/rentals";
import { useSavedProperties } from "@/contexts/SavedPropertiesContext";

const gallery = [
  { src: "/hearthline/gallery-living_2b20b590.jpg", alt: "The Glasshouse living room at blue hour" },
  { src: "/hearthline/gallery-kitchen_8863d4f5.jpg", alt: "Kitchen with marble island" },
  { src: "/hearthline/gallery-bath_ed01f65a.jpg", alt: "Bathroom with freestanding tub" },
  { src: "/hearthline/gallery-bedroom_7474c497.jpg", alt: "Bedroom with linen bedding" },
  { src: "/hearthline/gallery-terrace_a6d61c2e.jpg", alt: "Terrace with fire table and skyline" },
];

const amenities = [
  { icon: Wifi, label: "Gigabit fiber internet" }, { icon: AirVent, label: "Central air" }, { icon: ParkingSquare, label: "Private garage" }, { icon: Dumbbell, label: "Home gym" }, { icon: ConciergeBell, label: "24/7 concierge" }, { icon: Fence, label: "Private terrace" },
];

export default function Property() {
  const [location] = useLocation();
  const homeId = new URLSearchParams(location.split("?")[1] ?? "").get("home") ?? "azure-penthouse";
  const rental = useMemo(() => findRental(homeId), [homeId]);
  const { isSaved, toggleSaved } = useSavedProperties();
  const [moveDate, setMoveDate] = useState("");
  const [duration, setDuration] = useState("12 months");
  const [requestOpen, setRequestOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    toast("Your private viewing request is on its way");
  };

  const handleSave = () => {
    toggleSaved(rental.id);
    toast(isSaved(rental.id) ? "Removed from your shortlist" : "Saved to your shortlist");
  };

  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <div className="container property-back"><Link href="/listings" className="back-link"><ArrowLeft size={15} /> Back to the collection</Link></div>
        <section className="property-gallery container reveal">
          <div className="property-gallery__hero"><img src={gallery[0].src} alt={gallery[0].alt} /><button type="button" className={`gallery-save ${isSaved(rental.id) ? "gallery-save--saved" : ""}`} onClick={handleSave}><Heart size={17} fill={isSaved(rental.id) ? "currentColor" : "none"} /> {isSaved(rental.id) ? "Saved" : "Save home"}</button></div>
          <div className="property-gallery__grid">{gallery.slice(1).map((image, index) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" className="reveal" style={{ animationDelay: `${(index + 1) * 55}ms` }} />)}<span className="gallery-count">+{gallery.length} photos <ArrowRight size={14} /></span></div>
        </section>

        <section className="container property-layout">
          <div className="property-copy">
            <div className="property-heading reveal"><div><p className="eyebrow">{rental.tag} · {rental.available}</p><h1 className="page-title">{rental.title}</h1><p className="property-address"><MapPin size={17} /> {rental.address}</p></div><div className="property-price"><strong>{rental.priceLabel}</strong><span>/ month</span></div></div>
            <div className="property-facts reveal reveal-delay-1"><span><BedDouble size={17} /> {rental.beds} beds</span><span><Bath size={17} /> {rental.baths} baths</span><span>{rental.sqft}</span></div>
            <section className="property-section reveal reveal-delay-1"><p className="eyebrow">The feeling</p><h2>Made for the days<br /><em>you will remember.</em></h2><p>{rental.description}</p><p>Every detail has been considered, from the generous natural light to the material palette that gets better with time. It is a home that makes room for a full life without asking for attention.</p></section>
            <section className="property-section reveal reveal-delay-2"><p className="eyebrow">Included</p><h2>A home with<br /><em>the details right.</em></h2><ul className="amenity-grid">{amenities.map(({ icon: Icon, label }) => <li key={label}><Icon size={19} strokeWidth={1.55} /><span>{label}</span></li>)}</ul></section>
            <section className="host-card reveal reveal-delay-2"><img src="/hearthline/agent-eleanor_8f7ff510.jpg" alt="Eleanor Vance, Hearthline senior partner" /><div><p className="eyebrow">Your local partner</p><h3>Eleanor Vance</h3><p>Hearthline Senior Partner · 12 years experience</p></div><button type="button" className="icon-button" onClick={() => setContactOpen(true)} aria-label="Contact Eleanor"><Mail size={17} /></button></section>
          </div>

          <aside className="booking-card reveal reveal-delay-2"><div className="booking-card__top"><p className="eyebrow">Make it yours</p><p className="booking-price">{rental.priceLabel}<span>/ mo</span></p></div><label className="booking-field"><span>Move-in date</span><input type="date" value={moveDate} onChange={(event) => setMoveDate(event.target.value)} /></label><label className="booking-field"><span>Lease length</span><span className="select-wrap"><select value={duration} onChange={(event) => setDuration(event.target.value)}><option>12 months</option><option>6 months</option><option>3 months</option></select><ChevronDown size={15} /></span></label><button type="button" className="button button--clay w-full" onClick={() => setRequestOpen(true)}>Request a private viewing <ArrowUpRightSmall /></button><button type="button" className="button button--outline w-full" onClick={() => setContactOpen(true)}>Contact the partner <Phone size={15} /></button><p className="booking-note"><Check size={14} /> No commitment. We will confirm details first.</p></aside>
        </section>
      </main>
      <SiteFooter />
      {requestOpen && <Dialog title="Request a private viewing" onClose={() => { setRequestOpen(false); setSent(false); }}>{sent ? <SuccessState onClose={() => { setRequestOpen(false); setSent(false); }} /> : <form className="dialog-form" onSubmit={handleRequest}><p>Tell Eleanor when you would like to see {rental.title}. We will reply with the next available time.</p><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Preferred note<textarea rows={3} placeholder="A little context helps us prepare."></textarea></label><button className="button button--clay w-full" type="submit">Send viewing request <ArrowRight size={15} /></button></form>}</Dialog>}
      {contactOpen && <Dialog title="Talk to a real person" onClose={() => setContactOpen(false)}><div className="contact-dialog"><div className="contact-dialog__person"><img src="/hearthline/agent-eleanor_8f7ff510.jpg" alt="Eleanor Vance" /><div><h3>Eleanor Vance</h3><p>Senior Partner · New York</p></div></div><p>Whether you want a second look or have a question about the lease, Eleanor can help.</p><a className="contact-row" href="mailto:hello@hearthline.example"><Mail size={17} /> hello@hearthline.example <ArrowRight size={14} /></a><a className="contact-row" href="tel:+12125550184"><Phone size={17} /> +1 212 555 0184 <ArrowRight size={14} /></a></div></Dialog>}
    </div>
  );
}

function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) { return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="dialog-card" role="dialog" aria-modal="true" aria-label={title}><button type="button" className="dialog-close icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button><p className="eyebrow">Hearthline concierge</p><h2>{title}</h2>{children}</div></div>; }
function SuccessState({ onClose }: { onClose: () => void }) { return <div className="success-state"><span><Check size={21} /></span><h3>Request received.</h3><p>We will be in touch shortly with a few times to choose from.</p><button type="button" className="button button--ink w-full" onClick={onClose}>Done <ArrowRight size={15} /></button></div>; }
function ArrowUpRightSmall() { return <ArrowRight size={15} />; }
