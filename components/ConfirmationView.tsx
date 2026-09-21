"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { services } from "@/lib/services";

export default function ConfirmationView() {
  const params = useSearchParams();

  const serviceSlug = params.get("service") ?? "";
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const name = params.get("name") ?? "";
  const email = params.get("email") ?? "";

  const service = services.find((s) => s.slug === serviceSlug);
  const dateLabel = date
    ? new Date(date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-6 text-center sm:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-moss/15 text-moss"
      >
        &#10003;
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 font-display text-3xl"
      >
        You&apos;re booked.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-ink/70"
      >
        {name ? `Thanks, ${name}. ` : ""}A confirmation has been noted for
        your visit — see you then.
      </motion.p>

      {service && (
        <motion.dl
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 w-full divide-y divide-clay border-t border-clay text-left text-sm"
        >
          <div className="flex justify-between py-3">
            <dt className="text-ink/60">Service</dt>
            <dd className="font-medium">{service.name}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-ink/60">When</dt>
            <dd className="font-medium">
              {dateLabel} at {time}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-ink/60">Confirmation sent to</dt>
            <dd className="font-medium">{email}</dd>
          </div>
        </motion.dl>
      )}

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        href="/"
        className="mt-10 text-sm text-rose underline decoration-clay hover:decoration-rose"
      >
        Back to home
      </motion.a>
    </main>
  );
}
