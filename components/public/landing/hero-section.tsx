import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden shadow-xl/20">
      <div className="relative min-h-[68svh] w-full md:min-h-[74svh]">
        <Image
          src="/images/landing/hero-bg-image.png"
          alt="Alonta towers hotel room hero image"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-overlay-50" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[68svh] w-full max-w-7xl items-center justify-center px-4 py-10 text-center md:min-h-[74svh] md:px-8">
          <div className="w-full max-w-4xl text-primary-foreground">
            <div className="mx-auto mb-3 h-px w-48 bg-primary-foreground/70 md:mb-4 md:w-80" />
            <h1 className="text-4xl font-semibold tracking-[0.22em] text-primary-foreground sm:text-5xl md:text-7xl">
              ALONTA TOWERS
            </h1>
            <div className="mx-auto mt-3 h-px w-48 bg-primary-foreground/70 md:mt-4 md:w-80" />
            <p className="mt-4 text-xl font-medium text-primary-foreground sm:text-2xl md:mt-5 md:text-4xl">
              Guest House - Hotel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
