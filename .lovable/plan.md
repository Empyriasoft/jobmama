

# Add Tabs to Our Process Section

## Overview

Add two vertical tabs ("Mamas" and "Businesses") on the left side of the Process section while keeping the current step content intact.

## Current Content to Keep

The existing steps for the "Mamas" tab will remain unchanged:
- **01. Reflect & Plan** - Deep-dive conversation, Strategic Action Plan
- **02. Rebuild Your Toolkit** - CV rewrite, LinkedIn optimization, interview skills
- **03. Relaunch Your Career** - Job applications, follow-up support, community access

## Implementation

### Changes to `src/components/ProcessSection.tsx`

**1. Add React state**
- Import `useState` from React
- Track active tab: `"mamas"` or `"businesses"`

**2. Create content arrays**
- `mamasSteps`: Current 3 steps (unchanged)
- `businessesSteps`: Business-focused version with similar structure

**3. Add vertical tabs component**
- Left side vertical navigation
- Active tab styling: cyan left border (`border-l-4 border-[#00E5CC]`)
- Large typography matching the reference image

**4. Update layout**
- Two-column layout: tabs (left) + content (right)
- Mobile: tabs horizontal above content
- Desktop: tabs vertical on left

### Layout Structure

```text
+-------------------+------------------------------------------+
|                   |  01.  Reflect & Plan                     |
|   Mamas           |       [description...]                   |
|   [active]        |                                          |
|                   |  02.  Rebuild Your Toolkit               |
|   Businesses      |       [description...]                   |
|                   |                                          |
|                   |  03.  Relaunch Your Career               |
|                   |       [description...]                   |
+-------------------+------------------------------------------+
```

### Businesses Tab Content

Will create similar 3-step process focused on businesses:
- **01. Assess & Match** - Understanding business hiring needs
- **02. Source Qualified Talent** - Access to JobMama's network of skilled returning professionals
- **03. Hire & Integrate** - Support for onboarding returning professionals

## Technical Details

- File to modify: `src/components/ProcessSection.tsx`
- Add `useState` import
- Create `TabButton` component for tab styling
- Responsive design: `flex-col` on mobile, `flex-row` on desktop (lg+)
- Tab highlight color: `#00E5CC` (cyan/turquoise from reference)

