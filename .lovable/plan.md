# PEEPAL Frontend

## Goal
Build the uploaded PEEPAL brief as a polished, mobile-first transport app frontend, with no backend, no authentication operations, and no fabricated operational data.

## Deliverables
- Replace the starter screen with a branded PEEPAL passenger experience and a responsive application shell.
- Provide working in-app navigation for Passenger, Student, Driver, and Administrator screens, plus UI-only login, signup, email/phone, OTP, forgot-password, and profile views. Authentication forms never simulate a successful sign-in.
- Include search, route, stop, live tracking, saved/recent searches, bus details, service updates, student passes, driver GPS/trips, crowd visibility, and administration views. Operational lists and metrics remain empty until verified service data is provided.
- Show “Waiting for real GPS signal.” and appropriate explicit unavailable/empty states; never supply fake GPS, routes, people, counts, approvals, or notices.
- Add typed transport interfaces, translation dictionaries for English/Kannada/Hindi, a frontend-only service adapter boundary, and developer notes for later integration.
- Deliver a Google Maps-ready tracking viewport without loading Maps or inventing coordinates; render real location markers only if future integration supplies location data.
- Support responsive layouts, accessible controls, mobile bottom navigation, and a light/dark appearance switch.

## Implementation
- Use the existing TanStack Start/React/TypeScript/Tailwind stack and existing UI primitives. Keep shared PEEPAL code in focused feature modules and use the root CSS tokens for all styling.
- Do not enable Lovable Cloud or introduce server functions, database tables, API endpoints, or real auth flows. Keep route metadata specific to PEEPAL.

## Verification
- Run existing route tests and validate the primary screen and navigation in preview at desktop and mobile sizes.
- Check latest build diagnostics and ensure no placeholder screen, fabricated transport data, or unfinished navigation remains.