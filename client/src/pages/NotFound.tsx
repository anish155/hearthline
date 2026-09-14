/* Quiet Luxury Editorial: even the empty route uses the same warm paper, clay mark, and calm editorial voice as the core app. */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export default function NotFound() {
  return <div className="app-shell"><SiteHeader /><main className="container empty-state" style={{ minHeight: "calc(100vh - 190px)", marginTop: 40, marginBottom: 40 }}><span className="empty-state__mark">⌂</span><p className="eyebrow" style={{ marginTop: 22 }}>A small detour</p><h1 className="section-title">That address<br /><em>is not on the map.</em></h1><p>Let us take you back to the collection. There are good places waiting.</p><Link href="/listings" className="button button--ink"><ArrowLeft size={15} /> Browse homes</Link></main><SiteFooter /></div>;
}
