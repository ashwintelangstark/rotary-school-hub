import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Phone,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  PhoneCall,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles,
  School,
  CheckCircle2,
  ExternalLink,
  Users,
  Trophy,
  FlaskConical,
  Palette,
  Calendar,
  Image as GalleryIcon,
  Info
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileBottomNav() {
  const [activeSheet, setActiveSheet] = useState<"connect" | "programs" | "admissions" | "menu" | null>(null);
  const navigate = useNavigate();

  const handleNavClick = (to: string) => {
    setActiveSheet(null);
    navigate({ to });
  };

  return (
    <>
      {/* Sticky Bottom Bar - KLE Style (Mobile Only) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 block bg-[#18181b] text-white border-t border-zinc-800 shadow-[0_-5px_25px_rgba(0,0,0,0.6)] md:hidden"
      >
        <div className="grid grid-cols-4 h-16 max-w-lg mx-auto">
          {/* 1. Connect */}
          <button
            onClick={() => setActiveSheet("connect")}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSheet === "connect" ? "text-amber-400 font-bold" : "text-zinc-300 hover:text-white"
            }`}
          >
            <Phone className="size-5 mb-1" />
            <span className="text-[11px] font-semibold tracking-wide">Connect</span>
          </button>

          {/* 2. Programs */}
          <button
            onClick={() => setActiveSheet("programs")}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSheet === "programs" ? "text-amber-400 font-bold" : "text-zinc-300 hover:text-white"
            }`}
          >
            <BookOpen className="size-5 mb-1" />
            <span className="text-[11px] font-semibold tracking-wide">Programs</span>
          </button>

          {/* 3. Admissions */}
          <button
            onClick={() => setActiveSheet("admissions")}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSheet === "admissions" ? "text-amber-400 font-bold" : "text-zinc-300 hover:text-white"
            }`}
          >
            <GraduationCap className="size-5 mb-1" />
            <span className="text-[11px] font-semibold tracking-wide">Admissions</span>
          </button>

          {/* 4. Menu */}
          <button
            onClick={() => setActiveSheet("menu")}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeSheet === "menu" ? "text-amber-400 font-bold" : "text-zinc-300 hover:text-white"
            }`}
          >
            <Menu className="size-5 mb-1" />
            <span className="text-[11px] font-semibold tracking-wide">Menu</span>
          </button>
        </div>
      </nav>

      {/* --- CONNECT SHEET --- */}
      <Sheet open={activeSheet === "connect"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-zinc-950 border-t border-zinc-800 text-white max-h-[85vh] overflow-y-auto p-6">
          <SheetHeader className="text-left mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20 w-fit mb-2">
              <PhoneCall className="size-3.5" /> Direct Contact
            </div>
            <SheetTitle className="text-xl font-bold text-white font-display">Connect with Rotary H P S</SheetTitle>
            <SheetDescription className="text-zinc-400 text-xs">
              Reach out to our school office, admissions desk or visit our campus in Hubballi.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3 my-4">
            {/* Call Office */}
            <a
              href="tel:08362372439"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">School Office Phone</p>
                  <p className="text-sm font-bold text-white">0836 - 2372439</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold">Call</span>
            </a>

            {/* Admissions Helpline */}
            <a
              href="tel:+919448112345"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Admissions Helpline</p>
                  <p className="text-sm font-bold text-white">+91 94481 12345</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">Inquire</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@rotaryhps.edu.in"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Official Email</p>
                  <p className="text-sm font-bold text-white">info@rotaryhps.edu.in</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-zinc-500" />
            </a>

            {/* Location */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">School Location</p>
                  <p className="text-xs font-semibold text-zinc-200 mt-0.5">
                    Rotary H P S English, Deshpande Nagar, Hubballi, Karnataka 580029
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Rotary+H+P+S+English+Hubballi"
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-semibold text-center text-zinc-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                Open Google Maps <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- PROGRAMS SHEET --- */}
      <Sheet open={activeSheet === "programs"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-zinc-950 border-t border-zinc-800 text-white max-h-[85vh] overflow-y-auto p-6">
          <SheetHeader className="text-left mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20 w-fit mb-2">
              <BookOpen className="size-3.5" /> Academics & Offerings
            </div>
            <SheetTitle className="text-xl font-bold text-white font-display">School Programs</SheetTitle>
            <SheetDescription className="text-zinc-400 text-xs">
              Comprehensive English Medium curriculum & holistic co-curricular activities.
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <BookOpen className="size-6 text-amber-400 mb-2" />
              <h4 className="font-bold text-sm text-white">LKG to 10th</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Structured English Medium primary & secondary education.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <FlaskConical className="size-6 text-blue-400 mb-2" />
              <h4 className="font-bold text-sm text-white">Science & Tech</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Modern computer labs & hands-on science experiments.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <Trophy className="size-6 text-yellow-400 mb-2" />
              <h4 className="font-bold text-sm text-white">Sports & Games</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Athletics, kho-kho, kabaddi & annual tournaments.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <Palette className="size-6 text-emerald-400 mb-2" />
              <h4 className="font-bold text-sm text-white">Arts & Culture</h4>
              <p className="text-[11px] text-zinc-400 mt-1">Music, dance, elocution & grand Annual Day showcase.</p>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-zinc-800">
            <button
              onClick={() => handleNavClick("/about")}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Explore Full About & Academics <ChevronRight className="size-4" />
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- ADMISSIONS SHEET --- */}
      <Sheet open={activeSheet === "admissions"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-zinc-950 border-t border-zinc-800 text-white max-h-[85vh] overflow-y-auto p-6">
          <SheetHeader className="text-left mb-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30 w-fit mb-2 animate-pulse">
              <Sparkles className="size-3.5" /> Admissions Open 2026 - 27
            </div>
            <SheetTitle className="text-xl font-bold text-white font-display">Enroll Your Child Today</SheetTitle>
            <SheetDescription className="text-zinc-400 text-xs">
              Step-by-step admissions for Nursery, LKG, UKG & Primary to High School classes.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-2.5 my-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-zinc-200">Collect Application Form from School Office or Online</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-zinc-200">Submit Birth Certificate, Aadhaar & Passport Photos</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-zinc-200">Personal Interaction & Seat Confirmation</p>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-zinc-800 space-y-2">
            <button
              onClick={() => handleNavClick("/admissions")}
              className="w-full py-3 bg-[#FFD000] hover:bg-[#e6bb00] text-black font-extrabold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              View Admission Process & Eligibility <ChevronRight className="size-4" />
            </button>
            <a
              href="tel:+919448112345"
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="size-4 text-amber-400" /> Call Admissions Helpline
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- MENU SHEET --- */}
      <Sheet open={activeSheet === "menu"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-zinc-950 border-t border-zinc-800 text-white max-h-[90vh] overflow-y-auto p-6">
          <SheetHeader className="text-left mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.webp"
                  alt="Rotary Emblem"
                  className="size-10 rounded-full object-cover border border-amber-400/50"
                />
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-tight">Rotary H P S English</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">The N.L.E. Society, Hubballi</p>
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-2.5 my-4">
            {[
              { to: "/", label: "Home", icon: School, color: "text-amber-400" },
              { to: "/about", label: "About Us", icon: Info, color: "text-blue-400" },
              { to: "/admissions", label: "Admissions", icon: GraduationCap, color: "text-red-400" },
              { to: "/organizations", label: "Organizations", icon: Users, color: "text-emerald-400" },
              { to: "/calendar", label: "Calendar", icon: Calendar, color: "text-purple-400" },
              { to: "/gallery", label: "Gallery", icon: GalleryIcon, color: "text-pink-400" },
            ].map((item) => (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 text-left transition-all active:scale-95"
              >
                <item.icon className={`size-5 ${item.color}`} />
                <span className="font-semibold text-sm text-zinc-200">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
            <p className="text-xs text-zinc-400">Deshpande Nagar, Hubballi, Karnataka</p>
            <p className="text-[10px] text-zinc-500 mt-1">© Rotary H P S English. All rights reserved.</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
