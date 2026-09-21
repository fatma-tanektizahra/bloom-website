"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/services";
import { getNextDays, TIME_SLOTS } from "@/lib/slots";

const STEP_LABELS = ["Service", "Date & time", "Your details", "Review"];
const days = getNextDays(7);

export default function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [serviceSlug, setServiceSlug] = useState(
    searchParams.get("service") ?? ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const selectedService = services.find((s) => s.slug === serviceSlug);
  const selectedDay = days.find((d) => d.iso === date);

  const canContinue =
    (step === 1 && !!serviceSlug) ||
    (step === 2 && !!date && !!time) ||
    (step === 3 && !!name && !!email) ||
    step === 4;

  function next() {
    if (step < 4) setStep(step + 1);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function confirm() {
    const params = new URLSearchParams({
      service: serviceSlug,
      date,
      time,
      name,
      email,
      phone,
      notes,
    });
    router.push(`/confirmation?${params.toString()}`);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-6 py-16 sm:px-8">
      <a href="/" className="font-display text-lg text-rose">
        Bloom
      </a>

      {/* Progress */}
      <div className="mt-8">
        <div className="h-1 w-full overflow-hidden rounded-full bg-clay">
          <motion.div
            className="h-full bg-rose"
            initial={false}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-2 text-sm text-ink/60">
          Step {step} of 4 &middot; {STEP_LABELS[step - 1]}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="mt-10"
        >
          {step === 1 && (
            <div>
              <h1 className="font-display text-2xl">Choose a service</h1>
              <ul className="mt-6 divide-y divide-clay border-t border-clay">
                {services.map((s) => (
                  <li key={s.slug}>
                    <button
                      onClick={() => setServiceSlug(s.slug)}
                      className={`flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors ${
                        serviceSlug === s.slug ? "text-rose" : "hover:text-rose"
                      }`}
                    >
                      <span>
                        <span className="font-medium">{s.name}</span>
                        <span className="ml-2 text-sm text-ink/50">
                          {s.duration}
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-sm">
                        {s.price}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-display text-2xl">Pick a date & time</h1>

              <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => {
                      setDate(d.iso);
                      setTime("");
                    }}
                    className={`shrink-0 rounded-md border px-4 py-2 text-sm transition-colors ${
                      date === d.iso
                        ? "border-rose bg-rose text-paper"
                        : "border-clay hover:border-rose"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {date && (
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                        time === t
                          ? "border-rose bg-rose text-paper"
                          : "border-clay hover:border-rose"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="font-display text-2xl">Your details</h1>
              <div className="mt-6 space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-md border border-clay bg-paper px-4 py-3 text-sm outline-none focus-visible:border-rose"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-md border border-clay bg-paper px-4 py-3 text-sm outline-none focus-visible:border-rose"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  className="w-full rounded-md border border-clay bg-paper px-4 py-3 text-sm outline-none focus-visible:border-rose"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know? (optional)"
                  rows={3}
                  className="w-full rounded-md border border-clay bg-paper px-4 py-3 text-sm outline-none focus-visible:border-rose"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-2xl">Review your booking</h1>
              <dl className="mt-6 divide-y divide-clay border-t border-clay text-sm">
                <div className="flex justify-between py-3">
                  <dt className="text-ink/60">Service</dt>
                  <dd className="font-medium">{selectedService?.name}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-ink/60">When</dt>
                  <dd className="font-medium">
                    {selectedDay?.label} at {time}
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-ink/60">Name</dt>
                  <dd className="font-medium">{name}</dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-ink/60">Contact</dt>
                  <dd className="font-medium">{email}</dd>
                </div>
              </dl>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={back}
            className="text-sm text-ink/60 transition-colors hover:text-ink"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 4 ? (
          <button
            onClick={next}
            disabled={!canContinue}
            className="rounded-md bg-rose px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-rose/90 disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={confirm}
            className="rounded-md bg-rose px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-rose/90"
          >
            Confirm booking
          </button>
        )}
      </div>
    </main>
  );
}
