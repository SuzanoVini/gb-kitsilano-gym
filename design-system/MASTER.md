# GB Kitsilano Gym - Design System Master

> **Design Philosophy**: Modern, professional fitness management dashboard with emphasis on readability, data visualization, and efficient workflows. Combines martial arts discipline (Gracie Barra) with contemporary SaaS design patterns.

---

## 🎨 Product Pattern

**Category**: SaaS Dashboard / Fitness Management
**Industry**: Sports & Wellness (Martial Arts - Brazilian Jiu-Jitsu)
**User Type**: Gym administrators, staff, management

### Design Goals
1. **Data clarity** - Clear visualization of member metrics, conversions, and trends
2. **Efficient workflows** - Quick access to intros, signups, cancellations, holds
3. **Professional feel** - Trustworthy, polished interface for business operations
4. **Brand alignment** - Incorporate Gracie Barra red (#DC2626) with modern neutrals

---

## 🌈 Color Palette

### Primary Colors
- **Brand Red**: `#DC2626` (Red 600) - Primary actions, CTAs, brand elements
- **Dark Red**: `#B91C1C` (Red 700) - Hover states, emphasis
- **Light Red**: `#F87171` (Red 400) - Accents, highlights

### Neutral Scale (Slate)
- **Text Primary**: `#0F172A` (Slate 900) - Headlines, important text
- **Text Secondary**: `#475569` (Slate 600) - Body text, descriptions
- **Text Muted**: `#64748B` (Slate 500) - Captions, metadata
- **Border**: `#CBD5E1` (Slate 300) - Dividers, input borders
- **Background**: `#F8FAFC` (Slate 50) - Page background
- **Surface**: `#FFFFFF` - Cards, modals, panels

### Data Visualization Colors
- **Blue**: `#3B82F6` - Intros, primary metrics
- **Green**: `#10B981` - Signups, positive growth
- **Red**: `#EF4444` - Cancellations, alerts
- **Purple**: `#8B5CF6` - Conversion rates, analytics
- **Yellow**: `#F59E0B` - Warnings, holds
- **Orange**: `#F97316` - Attention items

### Semantic Colors
- **Success**: `#10B981` (Green 500)
- **Warning**: `#F59E0B` (Amber 500)
- **Error**: `#DC2626` (Red 600)
- **Info**: `#3B82F6` (Blue 500)

---

## 📝 Typography

### Font Stack
**Primary**: Inter (Google Fonts) - Clean, modern sans-serif optimized for UI
**System Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Type Scale
| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Display** | 2.5rem (40px) | 700 | 1.2 | Page titles, hero headings |
| **H2** | 1.875rem (30px) | 700 | 1.2 | Section headings |
| **H3** | 1.5rem (24px) | 700 | 1.2 | Card titles, subsections |
| **Body Large** | 1rem (16px) | 400 | 1.6 | Main content |
| **Body** | 0.875rem (14px) | 400/500 | 1.5 | UI text, labels |
| **Small** | 0.75rem (12px) | 500/600 | 1.4 | Captions, metadata |

### Font Pairing Strategy
- **Headings**: Inter Bold (700) for authority and clarity
- **Body**: Inter Regular (400) for readability
- **UI Elements**: Inter Medium (500) for buttons and labels
- **Data**: Inter SemiBold (600) for metrics and numbers

---

## 🎭 Design Style

### Primary Style: **Modern Glassmorphism**

#### Visual Characteristics
- **Frosted glass effects** - Subtle backdrop blur on floating elements
- **Soft shadows** - Multi-layered shadows for depth (not harsh drop shadows)
- **Gradient backgrounds** - Subtle linear gradients on surfaces
- **Smooth transitions** - 200-300ms easing for all interactions
- **Clean borders** - Minimal, subtle borders with transparency

#### Implementation Details
```css
/* Glassmorphism Card */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.08),
  0 2px 8px rgba(0, 0, 0, 0.04);
border-radius: 12px;
```

### Secondary Style: **Professional Dashboard**

#### Characteristics
- **Structured grids** - Consistent spacing and alignment
- **Data-first design** - Charts and metrics take visual priority
- **Subtle animations** - Fade-ins, slide-ins for content reveal
- **Clear hierarchy** - Size, weight, and color establish importance
- **Minimal decoration** - Function over flourish

---

## 🏗️ Layout Architecture

### Grid System
- **Container Max Width**: `1400px` (max-w-7xl)
- **Spacing Scale**: 4px base (0.25rem increments)
- **Breakpoints**:
  - Mobile: `< 640px`
  - Tablet: `640px - 1024px`
  - Desktop: `> 1024px`

### App Shell Structure
```
┌─────────────────────────────────────┐
│          Header (80px fixed)        │
├────────┬────────────────────────────┤
│        │                            │
│ Side-  │   Main Content Area        │
│ bar    │   (Scrollable)             │
│ (256px)│                            │
│        │                            │
└────────┴────────────────────────────┘
```

### Spacing System
- **Content Padding**: 32px (lg screens), 24px (md), 16px (sm)
- **Card Padding**: 24px (lg), 20px (md), 16px (sm)
- **Element Gap**: 16px standard, 24px for sections
- **Form Field Gap**: 16px vertical spacing

---

## 🧩 Component Patterns

### Cards
```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

### Buttons

#### Primary (Brand)
- Background: `#DC2626`
- Text: White
- Hover: `#B91C1C` + subtle scale
- Focus: 2px red outline
- Height: 40px minimum
- Padding: 12px 16px

#### Secondary
- Background: White
- Border: 2px solid `#475569`
- Text: `#475569`
- Hover: Light gray background

#### Tertiary/Ghost
- Background: Transparent
- Border: 1px solid `#CBD5E1`
- Hover: Light background

### Form Inputs
- Height: 40px (matches button height)
- Border: 1px solid `#CBD5E1`
- Border Radius: 6px
- Focus: Red border + shadow ring
- Padding: 10px 12px

### Modals
- Backdrop: Gradient blur overlay
- Content: White with shadow
- Max Width: 600px (md), 800px (lg)
- Border Radius: 12px
- Header: Gradient background
- Footer: Light gray background

---

## 🎬 Animation & Motion

### Timing Functions
- **Ease Out**: Default for entrances and reveals
- **Ease In-Out**: Hover states and toggles
- **Spring**: Modal appearances (cubic-bezier(0.16, 1, 0.3, 1))

### Duration Standards
- **Micro-interactions**: 150-200ms (hover, click feedback)
- **Transitions**: 250-300ms (tab switches, reveals)
- **Modals/Drawers**: 300-400ms
- **Page transitions**: 400ms

### Animation Patterns
1. **Fade In**: Opacity 0 → 1, translateY(10px) → 0
2. **Slide In**: TranslateY(-20px) → 0 with scale(0.98) → 1
3. **Hover Lift**: TranslateY(0) → translateY(-2px)
4. **Chart Animations**: Staggered entrance with 200ms delay

### Reduced Motion
Always respect `prefers-reduced-motion: reduce` - disable all animations

---

## 📊 Data Visualization

### Chart Library
**Recharts** - React-based charting library with smooth animations

### Chart Types by Use Case
1. **Line Chart** - Monthly trends, time-series data
2. **Bar Chart** - Comparisons, funnel stages, class performance
3. **Pie Chart** - Membership breakdown, cancellation reasons
4. **Horizontal Bar** - Staff performance, rankings

### Chart Styling
- **Stroke Width**: 2-3px for lines
- **Border Radius**: 4px for bars
- **Grid**: Light dashed lines (#E5E7EB)
- **Tooltips**: White background, subtle shadow
- **Animations**: 600-1000ms entrance, ease-out

---

## ♿ Accessibility

### WCAG 2.1 AA Standards
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible 2px outline on all interactive elements
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy, labels, ARIA labels
- **Keyboard Navigation**: Tab order matches visual order
- **Touch Targets**: Minimum 44x44px on mobile

### Implementation Checklist
- [ ] All buttons have visible focus states
- [ ] Forms use `<label>` with `for` attribute
- [ ] Icon buttons include `aria-label`
- [ ] Modals use `role="dialog"` and `aria-modal="true"`
- [ ] Color is not the only indicator of state
- [ ] Text meets contrast requirements

---

## 📱 Responsive Design

### Mobile First Approach
Start with mobile layout, enhance for larger screens

### Breakpoint Strategy
- **Mobile (< 640px)**: Single column, collapsed sidebar (overlay)
- **Tablet (640-1024px)**: 2-column grids, icon-only sidebar
- **Desktop (> 1024px)**: Full layouts, expanded sidebar

### Mobile Optimizations
- Touch-friendly 44px minimum tap targets
- Simplified navigation (hamburger menu)
- Single-column card layouts
- Horizontally scrollable tables
- Bottom-sheet modals on mobile

---

## 🎯 UX Principles

### Critical UX Rules

#### 1. Loading States
- Show skeleton screens or spinners for async content
- Disable buttons during async operations
- Reserve space to prevent layout shift

#### 2. Error Handling
- Display errors near the problem area (inline validation)
- Use red color + icon for visual indication
- Provide clear, actionable error messages

#### 3. Feedback
- Immediate visual feedback on interactions (hover, click)
- Success messages for completed actions
- Confirmation dialogs for destructive actions

#### 4. Performance
- Lazy load images with placeholders
- Virtualize long lists (> 100 items)
- Debounce search inputs (300ms)
- Use optimistic UI updates where appropriate

---

## 🚫 Anti-Patterns to Avoid

### Visual
❌ **No emoji icons** - Use SVG icons (Lucide React) instead
❌ **No layout shift on hover** - Avoid scale transforms on cards
❌ **No harsh shadows** - Use soft, layered shadows
❌ **No neon colors** - Stick to the defined palette

### Interaction
❌ **No cursor:default on clickables** - Always use `cursor:pointer`
❌ **No instant state changes** - Add 150-300ms transitions
❌ **No missing hover states** - All interactive elements need feedback
❌ **No focus without visible indicator** - Ensure keyboard accessibility

### Typography
❌ **No text below 14px** - Maintain readability
❌ **No excessive line length** - Max 65-75 characters per line
❌ **No low contrast text** - Minimum 4.5:1 ratio

---

## 🔧 Tech Stack Specifics

### Next.js 15 + React 19
- Use Server Components where possible for performance
- Client Components for interactivity (`'use client'`)
- Proper `Image` component usage with width/height

### Tailwind CSS 4
- Utility-first approach with custom CSS for complex components
- Use `@layer components` for reusable patterns
- Custom CSS variables for theme values

### Component Libraries
- **Lucide React** - Icon set (NOT emojis)
- **Recharts** - Data visualization
- **Focus Trap React** - Modal accessibility
- **Zustand** - Global state management

---

## 📦 File Organization

```
app/
├── globals.css              # Global styles, CSS variables
├── components/
│   ├── layout/             # Header, Sidebar, Navigation
│   ├── tabs/               # Feature tabs (Intros, Signups, etc.)
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Context providers
├── lib/
│   └── supabase/           # Data access layer
└── store/                  # Zustand stores
```

---

## 🎨 Quick Reference

### Most Common Patterns

**Shadow Hierarchy**
1. Subtle: `0 1px 3px rgba(0, 0, 0, 0.05)`
2. Medium: `0 4px 12px rgba(0, 0, 0, 0.08)`
3. Strong: `0 8px 24px rgba(0, 0, 0, 0.12)`

**Spacing**
- Small gap: `gap-2` (8px)
- Medium gap: `gap-4` (16px)
- Large gap: `gap-6` (24px)

**Border Radius**
- Small: `rounded-md` (6px)
- Medium: `rounded-lg` (8px)
- Large: `rounded-xl` (12px)

---

**Version**: 1.0
**Last Updated**: 2026-03-04
**Next Review**: Quarterly
