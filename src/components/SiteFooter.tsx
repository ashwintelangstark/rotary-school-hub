import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="maroon-band mt-20">
      <div className="mx-auto grid max-w-[90vw] gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="Rotary H P S English School emblem"
              width={48}
              height={48}
              loading="lazy"
              className="size-12 rounded-full bg-cream object-cover"
            />
            <div>
              <p className="font-display text-xl font-bold">Rotary H P S English</p>
              <p className="text-xs opacity-80">The Nitish Lahary Education Society, Hubballi</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm opacity-85">
            An HPS English school in the heart of Hubballi, nurturing curious,
            confident and compassionate learners since its founding by The N.L.E. Society.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/admissions" className="hover:underline">
                Admissions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Reach Us</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Deshpande Nagar, Hubballi-29, Dharwad District, Karnataka
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" /> 0836-2350454/2228316
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0" /> Mon &ndash; Sat, 9:00 AM &ndash; 4:00 PM
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-[90vw] px-4 py-4 text-center text-xs opacity-75">
          &copy; {new Date().getFullYear()} Rotary H P S English, Hubballi.
        </p>
      </div>
    </footer>
  );
}
