## Findings — whitespace + margin inconsistencies

### 1. Horizontal padding doesn't match the project standard
Memory rule: `px-5 → sm:px-6 → md:px-12 → lg:px-[100px]`.
Offenders using `md:px-8` (or skipping `sm`):
- `Header.tsx` — `px-5 md:px-8 lg:px-[100px]`
- `ServicesSection.tsx` — `px-5 md:px-8 lg:px-[100px]`
- `TestimonialsSection.tsx` — `px-5 md:px-8 lg:px-[100px]`
- `Index.tsx` (process heading wrapper) — `px-5 md:px-8 lg:px-[100px]`
- `Footer.tsx` desktop — `px-8 lg:px-[100px]` (no mobile/sm/md scale)
- `CommunitySection.tsx` — uses `md:px-12` ✓ but worth re-verifying
- `ContactSection.tsx` — already correct ✓

### 2. Vertical rhythm between sections is all over the place (desktop `lg:`)
| From → To | Current gap |
|---|---|
| Hero → About | About `pt-[251px]` |
| About → Services | Services `pt-[150px]` |
| Services → Process heading | heading wrapper `mt-[250px]` |
| Process heading → ProcessSection | wrapper `mb-[80px]` + section `py-32` |
| Process → Community | Community `py-24` |
| Community → Testimonials | Testimonials `pt-[330px]` ← huge |
| Testimonials → Contact | Contact `mt-[200px]` |
| Contact → Footer | Footer `mt-[500px]` ← massive dead space |
| Footer content → decorative logo | `mt-[450px]` ← another huge gap |

The Contact + Footer stack alone produces ~200 + 500 + footer padding + 450 px of mostly empty space below the Calendly embed.

### 3. Specific oversized gaps to fix
- `Footer.tsx` line 86: `mt-[500px]` → reduce to `mt-[120px]` (or `mt-24 lg:mt-32`).
- `Footer.tsx` line 148: `mt-[450px]` → reduce to `mt-[120px]`.
- `TestimonialsSection.tsx` line 162: `pt-[330px]` → `pt-[160px] md:pt-[180px] lg:pt-[200px]`.
- `AboutSection.tsx` line 188: `lg:pt-[251px]` → `lg:pt-[160px]` (align with new rhythm).
- `Index.tsx` line 26 process heading wrapper: `lg:mt-[250px]` → `lg:mt-[160px]`.
- `ContactSection.tsx` line 36: keep `mt-[100px] md:mt-[150px] lg:mt-[200px]` but the trailing space disappears once Footer mt is shrunk.

### 4. Target spacing rhythm (proposed standard)
Adopt three vertical-gap tokens, applied as top padding/margin on the *next* section:
- Tight: `mt-[80px] md:mt-[120px] lg:mt-[160px]`
- Default: `mt-[100px] md:mt-[140px] lg:mt-[180px]`
- Hero-after: `mt-[120px] md:mt-[160px] lg:mt-[200px]`

## Plan

1. **Standardize horizontal padding** across Header, ServicesSection, TestimonialsSection, Footer, and the Process heading wrapper to `px-5 sm:px-6 md:px-12 lg:px-[100px]`.
2. **Cut Footer's giant top margins**: `mt-[500px]` → `mt-[120px] lg:mt-[160px]`, and the decorative-image `mt-[450px]` → `mt-[120px]`.
3. **Tighten Testimonials top padding** from `pt-[330px]` to the new "default" rhythm.
4. **Tighten About `lg:pt-[251px]`** and the Process-heading `lg:mt-[250px]` to `lg:160px` so all desktop section gaps land near 160–200 px.
5. **Verify** at 1456 px viewport and at mobile (375 px) that gaps look even and no section feels cramped or floating.

Out of scope: copy changes, color/typography, mobile-only Footer block (already reasonable), and any inner-component spacing other than what's listed.

## Technical notes
- All edits are Tailwind class swaps in: `Header.tsx`, `ServicesSection.tsx`, `TestimonialsSection.tsx`, `Footer.tsx`, `AboutSection.tsx`, `src/pages/Index.tsx`.
- No design tokens to add; existing arbitrary values remain literals to match the project's current pattern.
- After edits, screenshot the homepage at desktop + mobile to confirm rhythm.
