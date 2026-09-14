/* Quiet Luxury Editorial x Reference Adaptation: long-form storytelling, oversized statements, proof pillars, visual showcase, and one clear action—translated into Rentapp’s warm residential world. */
import { ArrowRight, ArrowUpRight, Check, Play, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SiteFooter } from "@/components/SiteChrome";
import { ImmersiveStory } from "@/components/ImmersiveStory";
import { PropertyCard } from "@/components/PropertyCard";
import { rentals } from "@/data/rentals";

export default function Home() {
  const [tourOpen, setTourOpen] = useState(false);

  return <div className="app-shell">
    <ImmersiveStory />

    <main>
      <section id="featured" className="section section--featured container">
        <div className="section-heading reveal"><div><p className="eyebrow">The shortlist</p><h2 className="section-title">Places worth<br /><em>staying for.</em></h2></div><p className="section-intro">Not every home makes the cut. Start with a smaller, better collection—chosen for character, context, and the feeling it leaves you with.</p></div>
        <div className="featured-grid"><PropertyCard rental={rentals[0]} featured /><div className="featured-aside reveal reveal-delay-1"><PropertyCard rental={rentals[1]} /><Link href="/listings" className="inline-link mt-8">Explore the full collection <ArrowRight size={15} /></Link></div></div>
      </section>

      <section className="manifesto-section">
        <div className="container manifesto-grid">
          <div className="manifesto-copy reveal"><p className="eyebrow eyebrow--light">The Hearthline way</p><h2>Rent less like a transaction.<br /><em>Live more like a decision.</em></h2><p>We believe a home should be found with a little more care. So we make the search quieter, the details clearer, and the people on the other side more human.</p><button type="button" className="play-button" onClick={() => setTourOpen(true)} aria-label="Open the Hearthline story"><span><Play size={18} fill="currentColor" /></span><small>Our point of view</small></button></div>
          <div className="manifesto-proof reveal reveal-delay-2"><div className="proof-number">01</div><p>Selected residences</p><strong>Not a feed.<br />A point of view.</strong><div className="proof-number proof-number--second">02</div><p>One-to-one service</p><strong>Clear details.<br />Real people.</strong></div>
        </div>
      </section>

      <section className="section principles-section container">
        <div className="section-heading reveal"><div><p className="eyebrow">A considered process</p><h2 className="section-title">Everything you need.<br /><em>Nothing you don’t.</em></h2></div><p className="section-intro">The experience is designed around the moments that matter—from the first saved home to the day you turn the key.</p></div>
        <div className="principles-grid"><article className="principle-card reveal reveal-delay-1"><span><Sparkles size={20} /></span><p className="eyebrow">01</p><h3>Curated, not crowded</h3><p>Every residence is selected for its light, materiality, and sense of place.</p></article><article className="principle-card reveal reveal-delay-2"><span><ShieldCheck size={20} /></span><p className="eyebrow">02</p><h3>Clear at every step</h3><p>Know the details, timing, and people looking after your move before you commit.</p></article><article className="principle-card reveal reveal-delay-3"><span><Users size={20} /></span><p className="eyebrow">03</p><h3>Human when it matters</h3><p>Talk to a real person who understands what you are looking for.</p></article></div>
      </section>

      <section className="showcase-section"><div className="container showcase-heading reveal"><div><p className="eyebrow">A home in three views</p><h2 className="section-title">See the feeling<br /><em>before you arrive.</em></h2></div><Link href="/listings" className="inline-link">View all residences <ArrowUpRight size={15} /></Link></div><div className="showcase-strip"><img src="/hearthline/rentapp-loft_038a2c64.jpg" alt="Warm loft living room" /><img src="/hearthline/rentapp-courtyard_8a7d81e6.jpg" alt="Quiet residential courtyard" /><div className="showcase-note"><Check size={18} /><p>Light, texture,<br />and room to breathe.</p><Link href="/listings" className="button button--ink button--small">Explore homes <ArrowRight size={14} /></Link></div></div></section>

      <section className="closing-section container reveal"><p className="eyebrow">Begin somewhere good</p><h2 className="section-title">Your next chapter<br /><em>starts at home.</em></h2><Link href="/listings" className="inline-link inline-link--large">Browse available homes <ArrowRight size={17} /></Link></section>
    </main>
    <SiteFooter />
    {tourOpen && <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setTourOpen(false); }}><div className="dialog-card story-dialog" role="dialog" aria-modal="true" aria-labelledby="story-dialog-title"><button type="button" className="dialog-close icon-button" onClick={() => setTourOpen(false)} aria-label="Close story">×</button><p className="eyebrow">Our point of view</p><h2 id="story-dialog-title" className="section-title">Find a place<br /><em>that feels like you.</em></h2><p>Hearthline brings the search back to what matters: the light in a room, the shape of a neighborhood, and the confidence that someone is paying attention.</p><Link href="/listings" className="button button--clay" onClick={() => setTourOpen(false)}>Explore the collection <ArrowRight size={15} /></Link></div></div>}
  </div>;
}
