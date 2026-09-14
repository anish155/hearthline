/* Hearthline auth: quiet paper, warm residential photography, and a narrow action surface make account entry feel like a continuation of the brand. */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";

export function AuthLayout({ eyebrow, title, copy, children }: { eyebrow: string; title: ReactNode; copy: string; children: ReactNode }) {
  return <div className="auth-shell"><div className="auth-visual"><img src="/hearthline/rentapp-hero_ad8f2a12.webp" alt="Warm, light-filled Hearthline residence" /><div className="auth-visual__veil" /><Link href="/" className="auth-brand"><span className="auth-brand__mark">⌂</span><span>HEARTHLINE</span></Link><div className="auth-visual__copy"><p className="eyebrow eyebrow--light">A better way to rent</p><p>Homes with<br /><em>a point of view.</em></p></div></div><main className="auth-panel"><Link href="/" className="back-link"><ArrowLeft size={15} /> Back to Hearthline</Link><div className="auth-panel__inner"><p className="eyebrow">{eyebrow}</p><h1 className="section-title">{title}</h1><p className="auth-copy">{copy}</p>{children}</div></main></div>;
}
