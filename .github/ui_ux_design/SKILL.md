# UI Skill — GitHub-like Personal Web Interface

## Objective

Build the website using a clean, compact, developer-oriented interface inspired by the visual language of modern GitHub.

The goal is NOT to reproduce GitHub literally.

The goal is to reproduce the same design philosophy:

- extremely clean
- information-dense without feeling cluttered
- white/light gray surfaces
- thin neutral borders
- restrained use of blue
- compact controls
- subtle rounded corners
- strong typography hierarchy
- card-based content
- responsive/mobile-first behavior
- almost no decorative effects
- functional rather than flashy

The interface should feel like a professional developer dashboard / personal workspace.

---

# 1. Design Philosophy

Prioritize:

1. Content
2. Navigation
3. Clear hierarchy
4. Compact spacing
5. Responsive behavior
6. Accessibility

Avoid:

- gradients
- glassmorphism
- excessive shadows
- giant hero sections
- excessive animations
- oversized typography
- excessive rounded cards
- decorative backgrounds
- excessive colors

The UI should feel like a serious productivity/developer application.

A user should immediately understand:

- where they are
- what section they are viewing
- what items are available
- what can be clicked
- which information is secondary

---

# 2. Color System

Use a GitHub-like neutral palette.

## Main colors

```css
--color-bg: #ffffff;
--color-bg-subtle: #f6f8fa;
--color-bg-muted: #f6f8fa;

--color-border: #d0d7de;
--color-border-muted: #d8dee4;

--color-text: #1f2328;
--color-text-secondary: #656d76;
--color-text-muted: #8c959f;

--color-primary: #0969da;
--color-primary-hover: #0550ae;

--color-success: #1a7f37;
--color-warning: #9a6700;
--color-danger: #cf222e;

--color-white: #ffffff;

Do not introduce additional colors unless the content requires them.

Blue should primarily mean:

links
active navigation
primary actions
selected states
important interactive elements

Do not use blue as a general decorative color.

3. Typography

Use a modern system font stack similar to GitHub.

Preferred:

font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "Noto Sans",
  Helvetica,
  Arial,
  sans-serif;

Typography should be compact.

Recommended sizesdd

Body:

font-size: 14px;
line-height: 1.5;

Small metadata:

font-size: 12px;

Navigation:

font-size: 14px;

Section titles:

font-size: 20px;
font-weight: 600;

Page titles:

font-size: 26px;
font-weight: 600;

Do not use huge headings.

Weight hierarchy should mostly use:

400 = normal
500 = emphasized
600 = headings / important labels

Avoid using 700/800 everywhere.

4. Global Layout

The website should use a centered responsive layout.

Desktop:

┌─────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SIDEBAR / PROFILE       MAIN CONTENT                       │
│                                                             │
│                          ┌──────────┐ ┌──────────┐           │
│                          │ CARD     │ │ CARD     │           │
│                          └──────────┘ └──────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

The main content should have a maximum width.

Recommended:

max-width: 1280px;
margin-inline: auto;
padding-inline: 32px;

On very large screens, do not allow content to stretch infinitely.

5. Header

The header should be visually similar to GitHub's modern header.

Desktop:

horizontal layout
compact height
subtle bottom border
light gray/off-white background
menu/navigation on the left
search in the center/left
utility icons on the right
avatar at the far right

Approximate:

height: 64px;
background: #f6f8fa;
border-bottom: 1px solid #d0d7de;

The header should feel like application chrome, not a marketing navbar.

Header elements

Possible elements:

hamburger/menu
logo
site name
search
notifications
settings
shortcuts
user avatar

Icons should be simple line icons.

Do not use large colorful icons.

6. Mobile Header

Mobile is a first-class layout, not a reduced desktop version.

At small widths:

┌─────────────────────────────────┐
│ ☰   LOGO / NAME       ◯ AVATAR │
└─────────────────────────────────┘

The header should become compact.

Hide secondary desktop navigation.

Move secondary navigation into:

hamburger menu
dropdown
bottom sheet
or collapsible navigation

depending on the application.

Do not try to fit the entire desktop navigation into one mobile row.

Recommended:

height: 56px;
padding-inline: 12px;
7. Navigation

Navigation should use simple text and icons.

Example:

Overview
Repositories
Projects
Packages
Stars

Active item:

dark text
subtle bottom border or indicator
optionally blue accent

Inactive items:

color: #656d76;

Hover:

color: #1f2328;
background: #f6f8fa;

Navigation should never use large pill-shaped buttons.

8. Profile / Identity Area

For a profile-oriented page, use a two-column desktop layout.

Desktop:

┌──────────────────┐  ┌─────────────────────────────────────┐
│                  │  │ Main content                         │
│      AVATAR      │  │                                     │
│                  │  │                                     │
│ Benjamin HAISE   │  │                                     │
│ HaiseB           │  │                                     │
│                  │  │                                     │
│ [Edit profile]   │  │                                     │
│                  │  │                                     │
│ followers info   │  │                                     │
└──────────────────┘  └─────────────────────────────────────┘

The profile column should be approximately:

width: 296px;

The main content takes the remaining width.

9. Avatar

Large profile avatar:

width: 296px;
height: 296px;
border-radius: 50%;

However, the exact size must adapt to the viewport.

Avatar should:

be perfectly circular
use object-fit: cover
have no unnecessary border
remain visually dominant

On mobile:

width: 80px;
height: 80px;

The avatar should become significantly smaller.

Do not keep the huge desktop avatar on mobile.

10. Profile Header

Example:

Benjamin HAISE
HaiseB

Visual hierarchy:

Benjamin HAISE     ← 26px / semibold
HaiseB             ← 16px / muted

The username should be visually secondary to the real/display name.

Metadata such as:

3 followers · 6 following

should use smaller muted typography.

11. Buttons

Buttons should look like GitHub-style controls.

Default button:

background: #f6f8fa;
border: 1px solid #d0d7de;
border-radius: 6px;
color: #1f2328;

Primary button:

background: #1f883d;
color: white;

or use the application's primary color when appropriate.

Do not make every button blue.

Buttons should be relatively compact:

height: 32px;
padding-inline: 12px;
font-size: 14px;

For mobile, touch targets should still be at least approximately:

min-height: 40px;
12. Cards

Cards are one of the main visual structures.

Desktop cards should be:

background: #ffffff;
border: 1px solid #d0d7de;
border-radius: 6px;

Avoid heavy shadows.

Prefer:

box-shadow: none;

or extremely subtle shadows only where necessary.

Cards should feel like bordered containers rather than floating material-design panels.

13. Repository / Project Cards

Use compact cards similar to GitHub repository cards.

Example:

┌─────────────────────────────────────┐
│  repository-name        Public      │
│                                     │
│  Short description of the project.  │
│                                     │
│  ● JavaScript                        │
└─────────────────────────────────────┘

Important information should appear in this order:

title
visibility/status
description
metadata

Repository/project title:

color: #0969da;
font-weight: 600;

Visibility badge:

Public
Private
Archived

Use a subtle outlined badge.

Example:

border: 1px solid #d0d7de;
border-radius: 2em;
padding: 0 7px;
font-size: 12px;
14. Technology Labels

For technologies such as:

JavaScript
Python
HTML
CSS
TypeScript

display a small colored dot followed by text.

Example:

● JavaScript

The dot should represent the technology color.

Do not create large colored badges.

Recommended:

font-size: 12px;
color: #656d76;

The colored dot is approximately:

width: 12px;
height: 12px;
border-radius: 50%;
15. Grid System

Desktop project/repository cards:

┌───────────────┐ ┌───────────────┐
│ Project A     │ │ Project B     │
└───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐
│ Project C     │ │ Project D     │
└───────────────┘ └───────────────┘

Use:

grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;

Do not create excessive card spacing.

16. Mobile Grid

On mobile:

┌─────────────────────────┐
│ Project A               │
└─────────────────────────┘

┌─────────────────────────┐
│ Project B               │
└─────────────────────────┘

┌─────────────────────────┐
│ Project C               │
└─────────────────────────┘

Use:

grid-template-columns: 1fr;

Cards should use the entire available width.

Do not horizontally scroll a two-column grid.

17. Responsive Breakpoints

Use mobile-first CSS.

Base styles should target mobile.

Recommended breakpoints:

/* Mobile */
default

/* Tablet */
@media (min-width: 768px)

/* Desktop */
@media (min-width: 1024px)

/* Large desktop */
@media (min-width: 1280px)

Do not design desktop first and then simply shrink it.

18. Mobile Profile Layout

Desktop:

PROFILE | MAIN CONTENT

Mobile:

┌─────────────────────────────┐
│          AVATAR             │
│                             │
│ Benjamin HAISE              │
│ HaiseB                      │
│                             │
│ [ Edit profile ]            │
│                             │
│ 3 followers · 6 following   │
└─────────────────────────────┘

MAIN CONTENT

Everything should become vertically stacked.

The profile area should not consume excessive vertical space.

19. Mobile Spacing

Use smaller spacing than desktop.

Recommended base spacing system:

4px
8px
12px
16px
24px
32px

Prefer these values instead of arbitrary numbers.

Example:

gap: 16px;
padding: 16px;
margin-bottom: 24px;

Desktop can increase spacing slightly.

20. Borders

Borders are extremely important to the visual identity.

Use thin neutral borders:

border: 1px solid #d0d7de;

Avoid:

border: 2px solid ...

unless specifically required.

Borders should create structure without becoming visually dominant.

21. Radius

Use restrained rounding.

Primary:

border-radius: 6px;

Small badges:

border-radius: 2em;

Avatars:

border-radius: 50%;

Avoid the modern SaaS tendency of:

border-radius: 16px;
border-radius: 24px;

for every component.

The UI should feel sharper and more developer-oriented.

22. Shadows

Shadows should be extremely rare.

Default:

box-shadow: none;

Use a subtle shadow only for floating elements:

dropdown
modal
popover
mobile menu

Never use large card shadows.

23. Links

Default links:

color: #0969da;
text-decoration: none;

On hover:

text-decoration: underline;

Important project/repository names should look like links.

Do not underline everything by default.

24. Icons

Use a consistent icon library.

Icons should generally be:

16px
20px for primary controls
monochrome
stroke-based

Examples:

menu
search
bell
settings
repository
project
package
star
users

Icons should support text rather than replace it unless the meaning is universally obvious.

25. Interactive States

Every interactive component must have:

Default

Clean neutral appearance.

Hover

Subtle background or text change.

Focus

Visible keyboard focus ring.

Example:

outline: 2px solid #0969da;
outline-offset: 2px;
Active

Slightly stronger background/border.

Disabled

Lower contrast but still readable.

Do not rely only on color to communicate state.

26. Tables / Lists

For dense data, prefer compact GitHub-style lists.

Example:

┌────────────────────────────────────────────┐
│ Name                 Status       Updated  │
├────────────────────────────────────────────┤
│ Project A            Active       2d       │
│ Project B            Archived     1mo      │
└────────────────────────────────────────────┘

Avoid huge row heights.

On mobile, convert tables into stacked cards when necessary.

Never force a complex desktop table to fit a narrow mobile screen.

27. Empty States

Empty states should remain minimal.

Example:

No projects yet.

[ Create project ]

Do not use giant illustrations unless the application specifically needs them.

28. Loading States

Use simple skeletons or understated loading indicators.

Skeletons should use:

background: #f6f8fa;

Do not use animated colorful loaders.

29. Overall Page Density

The UI should be relatively dense.

Compared with a typical marketing website:

smaller typography
smaller cards
less vertical whitespace
more information per viewport
stronger use of borders
fewer decorative elements

However, maintain enough whitespace to preserve hierarchy.

The goal is:

"A developer dashboard that feels comfortable to use for hours."

Not:

"A marketing landing page."

30. Mobile UX Rules

Mobile must receive special attention.

Always:

stack columns
use one-column card grids
reduce avatar sizes
simplify navigation
maintain comfortable touch targets
preserve readable text
avoid horizontal overflow
keep important actions accessible

Never:

shrink desktop UI until it technically fits
create tiny 10px buttons
require horizontal scrolling for normal content
keep desktop sidebar visible if it makes the content cramped
31. Desktop UX Rules

Desktop should take advantage of available width.

Use:

two-column project grids
profile sidebar
horizontal navigation
larger avatar
compact but information-dense cards

Do not center every component individually.

The page should have a clear global alignment system.

32. Visual Reference

The intended visual result should resemble this structure:

Desktop:

┌──────────────────────────────────────────────────────────────┐
│ ☰  LOGO   Search                         Icons      Avatar  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ PROFILE              │ MAIN                                 │
│                      │                                      │
│      AVATAR          │ Section title                         │
│                      │                                      │
│ Display Name         │ ┌─────────────┐ ┌─────────────┐      │
│ username             │ │ Project     │ │ Project     │      │
│                      │ └─────────────┘ └─────────────┘      │
│ [Edit profile]       │                                      │
│                      │ ┌─────────────┐ ┌─────────────┐      │
│ followers            │ │ Project     │ │ Project     │      │
│                      │ └─────────────┘ └─────────────┘      │
└──────────────────────────────────────────────────────────────┘

Mobile:

┌─────────────────────────────┐
│ ☰   LOGO             Avatar │
├─────────────────────────────┤
│                             │
│          Avatar             │
│                             │
│ Display Name                │
│ username                    │
│                             │
│ [ Edit profile ]            │
│                             │
│ followers · following       │
│                             │
├─────────────────────────────┤
│                             │
│ Section title               │
│                             │
│ ┌─────────────────────────┐ │
│ │ Project                 │ │
│ │ Description             │ │
│ │ ● JavaScript            │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Project                 │ │
│ │ Description             │ │
│ │ ● Python                │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
33. Component Philosophy

Components should be reusable.

Create reusable primitives such as:

AppHeader
MobileMenu
Navigation
ProfileHeader
Avatar
Button
Badge
Card
RepositoryCard
ProjectCard
TechnologyLabel
SectionHeader
Tabs
List
EmptyState
Modal
Dropdown

Do not create one-off styling for every page.

The design system should remain consistent across the entire website.

34. Accessibility

Follow accessible UI practices.

Requirements:

semantic HTML
buttons for actions
links for navigation
visible keyboard focus
sufficient text contrast
alt text for meaningful images
aria-labels for icon-only buttons
touch targets large enough on mobile
never communicate information through color alone
35. Animation

Animations should be subtle.

Use approximately:

transition: 120ms ease;

or:

transition: 150ms ease;

Use animation only for:

hover
focus
dropdowns
mobile navigation
modal appearance

Avoid:

large page transitions
bouncing elements
excessive parallax
decorative animations

The UI should feel fast.

36. Important Rule

When implementing a new page, do NOT invent a completely different visual style.

Reuse the existing:

colors
borders
typography
spacing
buttons
cards
navigation
responsive behavior

The website should feel like one coherent application.

If uncertain between a visually impressive solution and a simpler GitHub-like solution, prefer the simpler solution.

37. Final Visual Target

The final interface should feel:

professional
technical
compact
clean
trustworthy
familiar
highly usable
responsive
developer-oriented

The key visual formula is:

white background + light gray application chrome + thin gray borders + restrained blue links + compact typography + small rounded corners + dense information layout.

Do not turn this into a generic modern SaaS dashboard.

Keep the distinctive GitHub-like visual language.