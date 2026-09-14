/* Hearthline chrome: signed-out visitors see a clear invitation to join; signed-in members see their account icon and dashboard access only after authentication. */
import { ArrowUpRight, Heart, LogOut, Menu, UserRound, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "The collection", href: "/listings" },
  { label: "Our approach", href: "/#story" },
];

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const light = dark && location === "/";

  const logOut = () => { signOut(); setOpen(false); };

  return <header className={`site-header ${light ? "site-header--hero" : ""}`}>
    <div className="container flex min-h-20 items-center justify-between gap-5">
      <Link href="/" className="brand-lockup" onClick={() => setOpen(false)} aria-label="Hearthline home"><img src="/hearthline/rentapp-mark_ebdd5429.webp" alt="" className="brand-mark" /><span className="brand-wordmark">HEARTHLINE</span></Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? "nav-link--active" : ""}`}>{item.label}</Link>)}</nav>
      <div className="header-actions hidden items-center gap-3 sm:flex">
        {user ? <><Link href="/dashboard" className="profile-pill" aria-label={`Open ${user.name}'s dashboard`} title="Your dashboard"><span className="profile-pill__icon"><UserRound size={17} strokeWidth={1.7} /></span><span>{user.name.split(" ")[0]}</span></Link><button type="button" className="signout-button" onClick={logOut} title="Log out"><LogOut size={15} /></button></> : <><Link href="/login" className="header-link">Log in</Link><Link href="/signup" className="button button--outline button--small">Sign up</Link></>}
        <Link href="/property" className="button button--clay button--small">Book a viewing <ArrowUpRight size={15} strokeWidth={1.9} /></Link>
      </div>
      <button className="icon-button mobile-trigger lg:hidden" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    <div className={`mobile-menu lg:hidden ${open ? "mobile-menu--open" : ""}`}><nav aria-label="Mobile navigation" className="container flex flex-col gap-1 pb-5">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-nav-link">{item.label}</Link>)}{user ? <><Link href="/dashboard" onClick={() => setOpen(false)} className="mobile-nav-link">Your dashboard</Link><button type="button" onClick={logOut} className="mobile-nav-link mobile-nav-link--button">Log out</button></> : <><Link href="/login" onClick={() => setOpen(false)} className="mobile-nav-link">Log in</Link><Link href="/signup" onClick={() => setOpen(false)} className="mobile-nav-link">Sign up</Link></>}<Link href="/property" onClick={() => setOpen(false)} className="button button--clay mt-3 w-full justify-center">Book a viewing <ArrowUpRight size={15} /></Link></nav></div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container grid gap-12 py-14 sm:grid-cols-[1.4fr_1fr_1fr] lg:py-20"><div><Link href="/" className="brand-lockup brand-lockup--footer"><img src="/hearthline/rentapp-mark_ebdd5429.webp" alt="" className="brand-mark" /><span className="brand-wordmark">HEARTHLINE</span></Link><p className="mt-6 max-w-sm text-sm leading-7 text-[var(--ink-soft)]">A considered way to find a home with a point of view. Curated residences, clear service, and a little more room to breathe.</p></div><div><p className="eyebrow">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/listings" className="footer-link">Browse residences</Link><Link href="/property" className="footer-link">Book a private viewing</Link><Link href="/signup" className="footer-link">Create your profile</Link></div></div><div><p className="eyebrow">Stay in the know</p><p className="mt-5 text-sm leading-6 text-[var(--ink-soft)]">A monthly note on places worth making your own.</p><form className="mt-4 flex max-w-sm" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email" className="footer-input" /><button type="submit" className="footer-submit" aria-label="Subscribe to newsletter"><ArrowUpRight size={17} /></button></form></div></div><div className="container flex flex-col gap-3 border-t border-[color:var(--line)] py-5 text-xs text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Hearthline. For homes with a point of view.</span><span className="flex items-center gap-1.5"><Heart size={12} fill="currentColor" /> Made for the long way home.</span></div></footer>;
}
