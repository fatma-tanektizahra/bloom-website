# Bloom — salon booking website

Portfolio project: a calm, editorial booking site for a small salon/wellness
studio, with a real AI booking assistant. Built with Next.js, TypeScript,
Tailwind, and Framer Motion.

## Running it locally

You'll need Node.js (LTS) installed. Then, from this folder:

```bash
npm install
cp .env.local.example .env.local
```

Open `.env.local` and paste in your real Anthropic API key (get one at
console.anthropic.com/settings/keys). Then:

```bash
npm run dev
```

Open http://localhost:3000.

## Adding your service photos

Drop your real photos into `public/images/services/` using these exact
filenames (the code already expects them):

```
signature-cut.jpg
colour-gloss.jpg
deep-condition.jpg
bridal-styling.jpg
blow-dry.jpg
```

Aim for square-ish photos, at least 400x400px, JPG or PNG. Until you add
these files, you'll see broken image icons in the services grid -- that's
expected, just drop the files in and refresh.

To add or rename services, edit `lib/services.ts` -- both the landing page
and the booking flow read from that one file, so you only edit it once.

## The booking flow

`/book` is a 4-step flow: choose a service, pick a date and time, enter your
details, then review and confirm. It doesn't save anything yet -- confirming
just carries your choices over to `/confirmation` via the URL, so you can
see and demo the full click-through experience. Nothing is written to a
database and no real email is sent. Wiring that up is the next step (see
below).

Available dates/times are mocked in `lib/slots.ts` (the next 7 days, a fixed
set of hourly slots) -- replace that with a real query once there's a
database, so it reflects actual availability instead of always showing the
same open slots.

## The chatbot

The floating "Chat" button bottom-right calls a real Anthropic API request
through `/app/api/chat/route.ts` -- your API key stays server-side and is
never exposed to the browser. It currently answers questions about the
services listed on the site and points people to the booking button; it
does not (yet) know about real appointment slots, since there's no booking
backend wired up yet.

**Cost note:** every message sent in the widget is a real, billed API call
using your key. Fine for demoing to a few people; don't leave it wide open
on a public link with heavy traffic without adding a rate limit.

To change its personality or what it's allowed to say, edit `SYSTEM_PROMPT`
in `app/api/chat/route.ts`.

## Project structure

```
app/
  layout.tsx           -- fonts (Bodoni Moda + Inter), mounts the chat widget globally
  page.tsx             -- landing page: hero + services grid with photos
  book/page.tsx        -- wraps BookingFlow in Suspense
  confirmation/page.tsx -- wraps ConfirmationView in Suspense
  globals.css          -- Tailwind setup + base styles
  api/chat/route.ts    -- server route that calls the Anthropic API
components/
  ChatWidget.tsx        -- the floating chat UI
  BookingFlow.tsx        -- the 4-step booking wizard
  ConfirmationView.tsx    -- the post-booking summary screen
lib/
  theme.ts              -- design tokens (colors, type, layout rules) -- read this
                          before adding any new UI, so choices stay consistent
  services.ts            -- the list of services shown on the site and in booking
  slots.ts                -- mock available dates/times for the booking flow
public/images/services/  -- your service photos go here
tailwind.config.ts      -- wires the Bloom colors and fonts into Tailwind
.env.local.example      -- copy to .env.local and add your real API key
```

## What's built so far

- Landing page with full-width hero, a service grid that darkens on hover,
  and a small contact footer
- `/book` -- a 4-step booking flow (service -> date/time -> your details ->
  review & confirm), with a progress bar and animated step transitions
- `/confirmation` -- branded confirmation summary shown after booking
- Live AI chat assistant, wired to the real Anthropic API

## What's next

1. Wire up a real database (MongoDB Atlas) so a confirmed booking is
   actually saved, and `/book`'s date/time step checks real availability
   instead of always showing the same open slots
2. Send a real confirmation email via Resend when a booking is saved
3. `/my-bookings` -- simple login-gated view of upcoming bookings
4. `/admin` -- password-protected table of incoming bookings
5. Give the chatbot real slot data once bookings are saved, so it can
   actually check availability instead of just describing services
6. Deploy to Vercel -- you'll need to add `ANTHROPIC_API_KEY` as an
   environment variable in the Vercel project settings, since `.env.local`
   is never committed or deployed

## Design reference

See `lib/theme.ts` for the full color palette, type scale, and layout
principles -- keep new pages consistent with it rather than introducing new
colors or spacing ad hoc.
