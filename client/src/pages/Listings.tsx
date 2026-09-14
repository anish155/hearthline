/* Quiet Luxury Editorial: discovery stays editorial and breathable—live filters, deliberate metadata, warm surfaces, and a restrained map preview keep the experience useful without turning it into a data wall. */
import { ArrowRight, BedDouble, Check, ChevronDown, List, Map, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { PropertyCard } from "@/components/PropertyCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { rentals } from "@/data/rentals";

export default function Listings() {
  const [location] = useLocation();
  const queryLocation = new URLSearchParams(location.split("?")[1] ?? "").get("location") ?? "";
  const [search, setSearch] = useState(queryLocation);
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [beds, setBeds] = useState("all");
  const [visible, setVisible] = useState(4);
  const [mapView, setMapView] = useState(false);

  const filtered = useMemo(() => rentals.filter((rental) => {
    const searchable = `${rental.title} ${rental.location} ${rental.address}`.toLowerCase();
    const matchesSearch = !search.trim() || searchable.includes(search.trim().toLowerCase());
    const matchesType = type === "all" || rental.tag === type;
    const matchesPrice = price === "all" || (price === "under-6000" ? rental.price < 6000 : price === "6000-10000" ? rental.price >= 6000 && rental.price <= 10000 : rental.price > 10000);
    const matchesBeds = beds === "all" || (beds === "4" ? rental.beds >= 4 : rental.beds === Number(beds));
    return matchesSearch && matchesType && matchesPrice && matchesBeds;
  }), [beds, price, search, type]);

  const hasFilters = Boolean(search || type !== "all" || price !== "all" || beds !== "all");
  const clearFilters = () => {
    setSearch(""); setType("all"); setPrice("all"); setBeds("all"); setVisible(4);
    toast("Filters cleared");
  };

  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <section className="listings-intro container">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>The collection</span></div>
          <div className="listings-intro__row">
            <div><p className="eyebrow reveal">The collection</p><h1 className="page-title reveal reveal-delay-1">Find somewhere<br /><em>worth keeping.</em></h1></div>
            <p className="section-intro reveal reveal-delay-2">A considered selection of homes for the way you want to live next. Search by place, filter by fit, and save the ones that stay with you.</p>
          </div>
        </section>

        <section className="filter-shell container reveal reveal-delay-2">
          <div className="filter-bar">
            <label className="filter-search"><Search size={18} strokeWidth={1.7} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a city, neighborhood, or home" /></label>
            <FilterSelect label="Property type" value={type} onChange={setType} options={[{ value: "all", label: "All types" }, { value: "VILLA", label: "Villa" }, { value: "PENTHOUSE", label: "Penthouse" }, { value: "TOWNHOUSE", label: "Townhouse" }, { value: "RESIDENCE", label: "Residence" }]} />
            <FilterSelect label="Monthly rent" value={price} onChange={setPrice} options={[{ value: "all", label: "Any price" }, { value: "under-6000", label: "Under $6k" }, { value: "6000-10000", label: "$6k–$10k" }, { value: "over-10000", label: "$10k+" }]} />
            <FilterSelect label="Bedrooms" value={beds} onChange={setBeds} options={[{ value: "all", label: "Any beds" }, { value: "1", label: "1 bedroom" }, { value: "2", label: "2 bedrooms" }, { value: "3", label: "3 bedrooms" }, { value: "4", label: "4+ bedrooms" }]} />
            <button type="button" className={`view-toggle ${mapView ? "view-toggle--active" : ""}`} onClick={() => setMapView((current) => !current)} aria-pressed={mapView}>{mapView ? <List size={17} /> : <Map size={17} />}<span>{mapView ? "List view" : "Map view"}</span></button>
          </div>
          <div className="filter-summary"><span><strong>{filtered.length}</strong> residences to explore</span>{hasFilters && <button type="button" className="clear-button" onClick={clearFilters}><SlidersHorizontal size={14} /> Clear filters</button>}</div>
        </section>

        {mapView ? <MapPreview rentals={filtered} /> : <section className="listing-results container">
          {filtered.length > 0 ? <div className="listing-grid">{filtered.slice(0, visible).map((rental, index) => <div className="reveal" style={{ animationDelay: `${index * 55}ms` }} key={rental.id}><PropertyCard rental={rental} /></div>)}</div> : <EmptyState onClear={clearFilters} />}
          {visible < filtered.length && <div className="load-more-wrap"><button type="button" className="button button--outline" onClick={() => setVisible((current) => current + 3)}>Load more homes <ArrowRight size={15} /></button></div>}
        </section>}
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  return <label className="filter-select"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select><ChevronDown size={15} /></label>;
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return <div className="empty-state"><span className="empty-state__mark">⌂</span><p className="eyebrow">A quieter search</p><h2>No homes match that brief.</h2><p>Try a wider location or remove one of the filters and we will keep looking with you.</p><button type="button" className="button button--ink" onClick={onClear}>Clear filters <ArrowRight size={15} /></button></div>;
}

function MapPreview({ rentals: visibleRentals }: { rentals: typeof rentals }) {
  return <section className="map-layout container"><div className="map-panel"><div className="map-panel__grid" /><div className="map-panel__river" /><div className="map-panel__copy"><p className="eyebrow">Map preview</p><h2>Homes across<br /><em>the good places.</em></h2><p>Move through the collection by feeling first, then let the details catch up.</p></div>{visibleRentals.slice(0, 5).map((rental, index) => <Link href={`/property?home=${rental.id}`} className={`map-pin map-pin--${index + 1}`} key={rental.id}><span className="map-pin__dot" /><span>{rental.location}<strong>{rental.priceLabel}</strong></span></Link>)}</div><div className="map-list">{visibleRentals.slice(0, 4).map((rental) => <Link href={`/property?home=${rental.id}`} className="map-list__item" key={rental.id}><img src={rental.image} alt="" /><div><span className="eyebrow">{rental.tag}</span><h3>{rental.title}</h3><p>{rental.location}</p></div><ArrowRight size={16} /></Link>)}{visibleRentals.length === 0 && <EmptyState onClear={() => undefined} />}</div></section>;
}
