/* Hearthline immersive 3D film: five scroll chapters move the viewer from arrival to detail, light, exterior, and finally the decision to find a home. */
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useLocation } from "wouter";
import { SiteHeader } from "@/components/SiteChrome";

const chapters = [
  { kicker: "01 / Arrive", title: <>Find the right<br /><em>address.</em></>, copy: "Begin with a shorter list of homes chosen for light, material, and the way a day moves through them.", image: "/hearthline/hearthline-3d-anchor_9d5aea14.webp", alt: "Warm sculptural residence interior opening toward water" },
  { kicker: "02 / Enter", title: <>Let the light<br /><em>lead you in.</em></>, copy: "See the details that change a room: a generous window, a quiet corner, a neighborhood that feels like yours.", image: "/hearthline/hearthline-3d-gallery_94c22f31.jpg", alt: "Quiet gallery corridor with framed art and afternoon shadows" },
  { kicker: "03 / Notice", title: <>The details<br /><em>make the room.</em></>, copy: "No vague listings or buried surprises—just the practical details, clearly presented before you make a decision.", image: "/hearthline/hearthline-3d-detail_9c8f8e35.jpg", alt: "Travertine table with linen curtain and handmade ceramic vessel" },
  { kicker: "04 / Stay", title: <>Keep a little<br /><em>light for later.</em></>, copy: "When the shortlist feels right, talk with a real person who can help you see the move through.", image: "/hearthline/hearthline-3d-night_ffe55f13.jpg", alt: "Warm residence interior seen from a covered terrace at blue hour" },
  { kicker: "05 / Begin", title: <>Somewhere<br /><em>worth keeping.</em></>, copy: "Search with intention, save what stays with you, and book a viewing when it feels like more than a maybe.", image: "/hearthline/hearthline-3d-exterior_80439180.jpg", alt: "Mediterranean residence courtyard with a reflecting pool" },
];

export function ImmersiveStory() {
  const [, setLocation] = useLocation();
  const sceneRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [location, setSearchLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 guests");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const element = sceneRef.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const range = Math.max(element.offsetHeight - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, -bounds.top / range));
      setProgress((current) => Math.abs(current - next) > 0.002 ? next : current);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  const active = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
  const localProgress = Math.min(0.999, (progress * chapters.length) % 1);
  const vars = { "--scene-progress": progress, "--scene-local": localProgress, "--scene-index": active } as CSSProperties;
  const handleSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setLocation(`/listings${location ? `?location=${encodeURIComponent(location)}` : ""}`); };

  return <section className="immersive-story" ref={sceneRef} style={vars}>
    <div className="immersive-story__stage">
      <div className="immersive-story__backdrop" />
      <SiteHeader dark />
      <div className="immersive-story__camera">
        {chapters.map((chapter, index) => <figure className={`immersive-scene immersive-scene--${index + 1}`} key={chapter.kicker}><img src={chapter.image} alt={chapter.alt} /><div className="immersive-scene__shade" /></figure>)}
        <div className="immersive-story__frame immersive-story__frame--detail"><img src="/hearthline/hearthline-3d-detail_9c8f8e35.jpg" alt="Tactile residence detail" /></div>
        <div className="immersive-story__frame immersive-story__frame--gallery"><img src="/hearthline/hearthline-3d-gallery_94c22f31.jpg" alt="Residence gallery corridor" /></div>
        <div className="immersive-story__frame immersive-story__frame--exterior"><img src="/hearthline/hearthline-3d-exterior_80439180.jpg" alt="Residence courtyard" /></div>
        <div className="immersive-story__grain" />
      </div>
      <div className="immersive-story__content container">
        <div className="immersive-story__chapter"><p className="eyebrow eyebrow--light">{chapters[active].kicker}</p><h1>{chapters[active].title}</h1><p className="immersive-story__copy">{chapters[active].copy}</p></div>
        <div className="immersive-story__aside"><span>Hearthline / A better way to rent</span><strong>Scroll to move<br />through the feeling.</strong></div>
      </div>
      <form className="search-panel immersive-search container" onSubmit={handleSearch}><label className="search-field search-field--interactive"><MapPin size={18} strokeWidth={1.6} /><span><small>Where</small><input value={location} onChange={(event) => setSearchLocation(event.target.value)} placeholder="City or neighborhood" /></span></label><label className="search-field search-field--interactive"><CalendarDays size={18} strokeWidth={1.6} /><span><small>When</small><input value={date} onChange={(event) => setDate(event.target.value)} placeholder="Move-in date" /></span></label><label className="search-field search-field--interactive"><Users size={18} strokeWidth={1.6} /><span><small>For</small><input value={guests} onChange={(event) => setGuests(event.target.value)} placeholder="Who is moving in?" /></span></label><button className="button button--clay button--magnetic search-panel__submit" type="submit"><Search size={16} /> Find a home <ArrowRight size={14} /></button></form>
      <div className="immersive-story__progress" aria-label="Story progress">{chapters.map((chapter, index) => <span className={index === active ? "is-active" : ""} key={chapter.kicker}><i />{chapter.kicker}</span>)}</div>
      <a href="#featured" className="immersive-story__scroll"><span>Scroll to explore</span><ArrowDown size={16} /></a>
    </div>
  </section>;
}
