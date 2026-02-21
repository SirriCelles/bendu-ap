import Image from "next/image";
import Link from "next/link";

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
    <footer className="text-white" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
      <div className="bg-[#1A3D63]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-4 md:gap-10 md:px-8 md:py-16">
          <section>
            <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.125rem]">
              Hotel
            </h2>
            <p className="mt-3 max-w-md text-sm font-normal leading-snug text-white sm:text-base md:mt-8 md:text-[1.125rem]">
              Come And Experience Luxury Like Never Before, With Our Pristine Services, Modern
              Facilities, And Hospitable Staff.
            </p>
            <div className="mt-5 flex items-center gap-2 md:mt-12 md:gap-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <Image
                  src="/icons/socials/facebook-3-logo-svgrepo-com.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9"
                  aria-hidden
                />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <Image
                  src="/icons/socials/instagram-2-1-logo-svgrepo-com.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9"
                  aria-hidden
                />
              </Link>
              <Link
                href="https://wa.me/237675830461"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE6ED] sm:h-11 sm:w-11 md:h-16 md:w-16"
              >
                <Image
                  src="/icons/socials/whatsapp-svgrepo-com.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9"
                  aria-hidden
                />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.125rem]">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-normal sm:text-base md:mt-8 md:space-y-6 md:text-[1.125rem]">
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
            <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.125rem]">
              Quick Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-normal sm:text-base md:mt-8 md:space-y-6 md:text-[1.125rem]">
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
            <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.125rem]">
              Contact Us
            </h2>
            <ul className="mt-3 space-y-2 text-sm font-normal text-white sm:text-base md:mt-8 md:space-y-6 md:text-[1.125rem]">
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
