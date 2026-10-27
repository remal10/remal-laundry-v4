# Remal Laundry OS V4

Rebuilt from the original Remal Laundry OS source, with two separate entry points:
- `index.html`: full desktop management interface.
- `staff.html`: dedicated phone interface for staff.

The original business scripts, styles, manifests, service worker and logo assets are retained. `assets/css/modern-refresh.css` is an additive visual layer; it does not replace business logic.

## Run locally
```bash
npm install
npm run dev
```
Use `/staff.html` for the staff interface. Vite builds both HTML entry points.

A successful static build does not prove live Supabase operations, printing, PDF export, batch printing or all staff workflows; test those in preview before promoting V4.