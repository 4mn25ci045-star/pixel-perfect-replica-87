# PEEPAL frontend integration boundary

This folder is deliberately a frontend-only foundation. There is no network client, API endpoint, authentication flow, database connection, seeded content, or operational sample data.

When your backend is ready, implement `TransitDataSource` in a separate adapter and inject it into the screens that need transport data. Map only verified backend fields to `Bus`, `Route`, `Stop`, `BusLocation`, `Driver`, `StudentPass`, `CrowdStatus`, and `ServiceNotification`. Until then, the UI shows explicit empty and waiting states; no example records are bundled.

Location markers require backend-supplied latitude/longitude and a real Google Maps configuration. Search and map surfaces are currently UI-only. Add backend-authenticated trip actions, verified driver/device association, pass eligibility, role permissions, and attribution-safe map rendering only when supported by the independent service.

Student fare concessions must come from an authorized backend fare rule and verified eligibility; the frontend never derives a discount. Mark passenger-reported crowd status separately from verified occupancy. IMEI input alone is not GPS data.