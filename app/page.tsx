"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/services";

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-paper">
      {/* Hero — full width band */}
      <header className="w-full px-6 py-20 text-center sm:px-12 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-lg text-rose"
        >
          Bloom
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-6xl"
        >
          A calmer way to book your next visit.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-ink/70"
        >
          Pick a service, choose a time that suits you, and we&apos;ll take
          care of the rest. No calls, no waiting.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="/book"
          className="mt-8 inline-block rounded-md bg-rose px-8 py-3 text-sm font-medium text-paper transition-colors hover:bg-rose/90"
        >
          Book an appointment
        </motion.a>
      </header>

      {/* Services — full-width grid, medium cards, darken on hover */}
      <section className="w-full px-6 pb-20 sm:px-12">
        <h2 className="text-center font-display text-2xl sm:text-3xl">
          Services
        </h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.a
              key={service.slug}
              href={`/book?service=${service.slug}`}
              variants={itemVariants}
              className="group relative aspect-[4/5] overflow-hidden rounded-md bg-clay"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              {/* Darkening overlay on hover, per the brief — no zoom */}
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />

              <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
                <p className="font-medium">{service.name}</p>
                <p className="mt-0.5 text-sm text-paper/80">
                  {service.duration} - {service.price}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Contact — small, at the bottom */}
      <footer className="w-full border-t border-clay px-6 py-8 text-center sm:px-12">
        <p className="text-sm text-ink/60">
          Bloom Salon &middot; Tunis &middot;{" "}
          <a href="mailto:hello@bloomsalon.tn" className="underline decoration-clay hover:text-rose">
            hello@bloomsalon.tn
          </a>{" "}
          &middot; +216 00 000 000
        </p>
      </footer>
    </main>
  );
}
