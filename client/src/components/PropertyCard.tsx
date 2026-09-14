/* Hearthline 3D depth: property cards behave like physical editorial objects, with restrained pointer tilt and a separate image plane for parallax. */
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSavedProperties } from "@/contexts/SavedPropertiesContext";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import type { Rental } from "@/data/rentals";

export function PropertyCard({ rental, featured = false }: { rental: Rental; featured?: boolean }) {
  const { isSaved, toggleSaved } = useSavedProperties();
  const saved = isSaved(rental.id);
  const tilt = usePointerTilt<HTMLAnchorElement>();

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSaved(rental.id);
    toast(saved ? "Removed from your shortlist" : "Added to your shortlist");
  };

  return <Link href={`/property?home=${rental.id}`} className={`property-card ${featured ? "property-card--featured" : ""}`} ref={tilt.ref} onPointerMove={tilt.onPointerMove} onPointerLeave={tilt.onPointerLeave}><div className="property-card__image-wrap"><img src={rental.image} alt={rental.alt} className="property-card__image" loading="lazy" /><span className="property-tag">{rental.tag}</span><button type="button" className={`save-button ${saved ? "save-button--saved" : ""}`} onClick={handleSave} aria-label={saved ? `Remove ${rental.title} from shortlist` : `Save ${rental.title}`}><Heart size={18} fill={saved ? "currentColor" : "none"} strokeWidth={1.7} /></button>{featured && <span className="image-caption">Featured residence <span>↗</span></span>}</div><div className="property-card__body"><div className="flex items-start justify-between gap-4"><div><h3 className="property-card__title">{rental.title}</h3><p className="property-card__location"><MapPin size={14} strokeWidth={1.7} />{rental.location}</p></div><p className="property-card__price">{rental.priceLabel}<span>/mo</span></p></div><div className="property-card__meta"><span><BedDouble size={15} strokeWidth={1.7} /> {rental.beds} beds</span><span><Bath size={15} strokeWidth={1.7} /> {rental.baths} baths</span><span><Ruler size={15} strokeWidth={1.7} /> {rental.sqft}</span></div></div></Link>;
}
