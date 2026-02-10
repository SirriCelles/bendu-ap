import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const quickLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimers", label: "Disclaimers" },
  { href: "/credits", label: "Credits" },
];

export function PublicFooter() {
  return (
    <footer
      className="mt-12 text-white md:mt-16"
      style={{ fontFamily: '"Instrument Sans", sans-serif' }}
    >
      <div className="bg-[#1A3D63]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-4 md:gap-10 md:px-8 md:py-16">
          <section>
            <h2 className="text-[clamp(1.5rem,7vw,2.125rem)] font-semibold leading-tight text-white">
              Hotel
            </h2>
            <p className="mt-4 max-w-md text-[clamp(0.95rem,3.8vw,1.125rem)] font-normal leading-snug text-white md:mt-8">
              Come And Experience Luxury Like Never Before, With Our Pristine Services, Modern
              Facilities, And Hospitable Staff.
            </p>
            <div className="mt-6 flex items-center gap-2.5 md:mt-12 md:gap-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] text-[#1A3D63] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <Facebook className="h-6 w-6 fill-current sm:h-7 sm:w-7 md:h-9 md:w-9" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] text-[#1A3D63] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <Instagram className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9" />
              </Link>
              <Link
                href="https://wa.me/237675830461"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] text-[#1A3D63] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9" />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[clamp(1.5rem,7vw,2.125rem)] font-semibold leading-tight text-white">
              Pages
            </h2>
            <ul className="mt-4 space-y-3 text-[clamp(0.95rem,3.8vw,1.125rem)] font-normal md:mt-8 md:space-y-6">
              {pages.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="text-white hover:opacity-80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[clamp(1.5rem,7vw,2.125rem)] font-semibold leading-tight text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3 text-[clamp(0.95rem,3.8vw,1.125rem)] font-normal md:mt-8 md:space-y-6">
              {quickLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="text-white hover:opacity-80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[clamp(1.5rem,7vw,2.125rem)] font-semibold leading-tight text-white">
              Contact Us
            </h2>
            <ul className="mt-4 space-y-3 text-[clamp(0.95rem,3.8vw,1.125rem)] font-normal text-white md:mt-8 md:space-y-6">
              <li>+237 675 830 461</li>
              <li>Contact@gmail.com</li>
              <li>Bamenda, Cameroon</li>
            </ul>
          </section>
        </div>
      </div>
      <div className="h-14 bg-[#00142E] md:h-20" />
    </footer>
  );
}
