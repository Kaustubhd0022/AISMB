# Design Document – AI Marketing Co-pilot for Home-Based D2C Sellers

---

## Document Information

| Field | Value |
|-------|-------|
| Document Version | 1.0 |
| Date | 2026-04-25 |
| Status | Approved for Design |

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Visual Design System](#2-visual-design-system)
3. [User Journey Maps](#3-user-journey-maps)
4. [Screen-by-Screen Design](#4-screen-by-screen-design)
5. [Conversation Design Guidelines](#5-conversation-design-guidelines)
6. [UX Patterns & Micro-interactions](#6-ux-patterns--micro-interactions)
7. [Accessibility Guidelines](#7-accessibility-guidelines)
8. [Edge Cases & Error States](#8-edge-cases--error-states)

---

## 1. Design Principles

### Principle 1: WhatsApp-First Familiarity

The interface should feel like WhatsApp because that's where sellers are most comfortable. Every interaction should feel familiar, reducing the learning curve to near zero.

**Guidelines:**
- Chat bubbles with timestamps and read receipts
- Single green check for sent, double blue check for read
- Bottom action bar similar to WhatsApp
- Swipe gestures for quick actions
- Voice note button (future)

### Principle 2: Warm & Homey Aesthetic

The design should feel welcoming, not corporate. Like visiting a friend's home kitchen—warm, inviting, and authentic.

**Guidelines:**
- Warm color palette (oranges, yellows, creams)
- Rounded corners everywhere (12-16px)
- Soft shadows, no harsh edges
- Hand-drawn accent elements where appropriate
- Food and craft imagery in onboarding

### Principle 3: One-Tap Actions

Every common action should be one tap away. Sellers are busy and value their time.

**Guidelines:**
- Primary action always visible
- No multi-step flows for core tasks
- Quick actions inline with messages
- Swipe gestures for common actions

### Principle 4: Progress Always Visible

Users should always know where they are and what's next. No confusion, no dead ends.

**Guidelines:**
- Step indicators for multi-step flows
- Loading states with friendly messages
- Confirmation after every action
- Clear "what happens next" explanations

### Principle 5: Error Prevention over Error Handling

Design so users can't make mistakes, not just handle them well.

**Guidelines:**
- Preview before every send (cannot bypass)
- Confirmation before destructive actions
- Smart defaults based on learning
- Clear, specific button labels

---

## 2. Visual Design System

### 2.1 Color Palette

#### Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Orange** | #FF9F43 | Primary buttons, highlights, active states |
| **Yellow** | #FFA502 | Secondary accents, stars, badges |
| **Brown** | #6D214F | Text headings, important info |
| **Cream** | #F8EFBA | Backgrounds, cards |
| **Dark Gray** | #2F3640 | Body text, borders |
| **Light Gray** | #F5F6FA | Secondary backgrounds |
| **White** | #FFFFFF | Clean backgrounds, cards |

#### Accent Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **WhatsApp Green** | #25D366 | Success states, checkmarks, WhatsApp references |
| **Instagram Gradient** | #833AB4, #FD1D1D, #F77737 | Instagram references (gradient) |
| **Error Red** | #FF6B6B | Error states, destructive actions |
| **Warning Yellow** | #FFA502 | Warning states |

#### Semantic Colors

| State | Color | Usage |
|-------|-------|-------|
| Success | #25D366 | Completed actions, success messages |
| Error | #FF6B6B | Error states, invalid inputs |
| Warning | #FFA502 | Warnings, attention needed |
| Info | #54A0FF | Informational messages |

### 2.2 Typography

#### Font Family

```
Primary: Poppins (Google Fonts)
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

#### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| H1 - Display | 32px | 600 | Welcome screens, big headers |
| H2 - Page Title | 24px | 600 | Page titles |
| H3 - Section Title | 20px | 600 | Section headers, card titles |
| H4 - Card Title | 18px | 600 | Card titles, message headers |
| Body - Large | 16px | 400 | Primary body text |
| Body - Regular | 14px | 400 | Secondary text |
| Body - Small | 12px | 400 | Captions, helper text |
| Button | 16px | 600 | Button text |

#### Line Heights

| Font Size | Line Height |
|-----------|-------------|
| 32px | 40px |
| 24px | 32px |
| 20px | 28px |
| 18px | 24px |
| 16px | 24px |
| 14px | 20px |
| 12px | 16px |

### 2.3 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Very tight spacing |
| sm | 8px | Tight spacing |
| md | 16px | Default spacing |
| lg | 24px | Loose spacing |
| xl | 32px | Extra loose spacing |
| xxl | 48px | Section spacing |

### 2.4 Border Radius

| Component | Radius |
|-----------|--------|
| Buttons | 12px |
| Cards | 16px |
| Inputs | 12px |
| Chat Bubbles | 16px (user), 12px (AI) |
| Modals | 20px |
| Badges | 8px |

### 2.5 Shadows

| Elevation | Shadow | Usage |
|-----------|--------|-------|
| None | none | Flat elements |
| Low | 0 2px 4px rgba(0,0,0,0.05) | Cards, buttons |
| Medium | 0 4px 12px rgba(0,0,0,0.08) | Floating elements |
| High | 0 8px 24px rgba(0,0,0,0.12) | Modals, overlays |

### 2.6 Iconography

**Icon Set:** Material Icons or Heroicons (consistent across platforms)

**Icon Guidelines:**
- Line icons, 24px standard size
- Consistent stroke width (2px)
- Orange (#FF9F43) for active/primary states
- Gray (#2F3640) for inactive states

**Key Icons:**
- Chat: 💬
- Dashboard: 📊
- Campaign: ⚡
- Profile: 👤
- Settings: ⚙️
- Bell: 🔔
- Check: ✅
- Close: ✕
- Back: ←
- Forward: →

---

## 3. User Journey Maps

### Journey 1: First-Time User Onboarding

```
┌─────────────────────────────────────────────────────────────────┐
│                     ONBOARDING JOURNEY                         │
└─────────────────────────────────────────────────────────────────┘

Step 1: Download & Launch
  ↓
Emotion: Curious, hopeful
Pain Point: "Will this be complicated?"
Touchpoint: Welcome screen with warm messaging

Step 2: Sign Up (Phone Number)
  ↓
Emotion: Cautious
Pain Point: "Is this safe?"
Touchpoint: Simple phone input with OTP

Step 3: Business Setup (3 questions)
  ↓
Emotion: Engaged
Pain Point: "How long will this take?"
Touchpoint: Chat-style questions, progress indicator

Step 4: Connect WhatsApp
  ↓
Emotion: Hesitant
Pain Point: "Why do they need this?"
Touchpoint: Clear benefits explained, easy connection

Step 5: AI Learns Business
  ↓
Emotion: Impatient
Pain Point: "How long does this take?"
Touchpoint: Friendly loading animation

Step 6: First Suggestion Appears
  ↓
Emotion: Surprised, pleased
Pain Point: "Is this actually helpful?"
Touchpoint: Relevant, personalized content suggestion

Step 7: User Edits & Schedules
  ↓
Emotion: Accomplished
Pain Point: None
Touchpoint: Easy edit, clear scheduling options

Step 8: Confirmation
  ↓
Emotion: Confident, excited
Pain Point: None
Touchpoint: Clear confirmation, what to expect next
```

### Journey 2: Daily Content Creation

```
┌─────────────────────────────────────────────────────────────────┐
│                   DAILY CONTENT JOURNEY                         │
└─────────────────────────────────────────────────────────────────┘

Step 1: Open App (Morning)
  ↓
Emotion: Busy, rushed
Pain Point: "I don't have time for this"
Touchpoint: Quick load, suggestion ready

Step 2: See Daily Suggestion
  ↓
Emotion: Relieved
Pain Point: "What should I post?"
Touchpoint: Complete post ready, one-tap review

Step 3: Quick Review & Edit
  ↓
Emotion: In control
Pain Point: "Does this sound like me?"
Touchpoint: Easy edit, preview exactly as it will appear

Step 4: Choose Schedule Time
  ↓
Emotion: Decisive
Pain Point: "When should I post?"
Touchpoint: AI recommendation, easy picker

Step 5: Confirmation
  ↓
Emotion: Done, relieved
Pain Point: None
Touchpoint: Clear confirmation, reminder set

Step 6: Post Goes Live (Later)
  ↓
Emotion: Hopeful
Pain Point: "Will anyone see this?"
Touchpoint: Notification of live post

Step 7: Results (Next Day)
  ↓
Emotion: Pleased, motivated
Pain Point: "Did it work?"
Touchpoint: Clear results in plain language

Step 8: Next Suggestion
  ↓
Emotion: Ready for more
Pain Point: None
Touchpoint: Cycle repeats, builds habit
```

### Journey 3: Viewing Results

```
┌─────────────────────────────────────────────────────────────────┐
│                     RESULTS VIEW JOURNEY                        │
└─────────────────────────────────────────────────────────────────┘

Step 1: Open Dashboard
  ↓
Emotion: Curious
Pain Point: "What are all these numbers?"
Touchpoint: Simple cards, not charts

Step 2: See Weekly Summary
  ↓
Emotion: Surprised
Pain Point: "Is this good or bad?"
Touchpoint: Clear numbers, trend indicators

Step 3: Read "What's Working"
  ↓
Emotion: Insightful
Pain Point: "What should I do differently?"
Touchpoint: Actionable insights, not just data

Step 4: See "Next Best Action"
  ↓
Emotion: Motivated
Pain Point: "What should I do now?"
Touchpoint: Specific, actionable suggestion

Step 5: Take Action
  ↓
Emotion: Accomplished
Pain Point: None
Touchpoint: One-tap action, immediate feedback
```

---

## 4. Screen-by-Screen Design

### Screen 1: Welcome Screen

**Purpose:** First impression, value proposition, entry point

**Layout:**
```
┌─────────────────────────────────────────────┐
│                                             │
│            [  Warm Logo  ]                  │
│                                             │
│                                             │
│           Get More Orders,                   │
│              Less Stress!                    │
│                                             │
│    Your AI marketing assistant that          │
│    handles the thinking, you decide.         │
│                                             │
│                                             │
│   ┌───────────────────────────────────┐    │
│   │     Let's Get Started  🚀         │    │
│   └───────────────────────────────────┘    │
│                                             │
│         Already have an account?            │
│              Sign In                         │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Specs:**
- Logo: 120x120px, orange/cream gradient
- Title: 32px, brown (#6D214F), bold
- Subtitle: 16px, dark gray (#2F3640), regular
- CTA Button: Full width, orange (#FF9F43), white text, 48px height
- Secondary Link: 14px, orange (#FF9F43), centered

### Screen 2: Onboarding - Step 1 (Business Info)

**Purpose:** Collect basic business information

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ←  Step 1 of 3                    Skip   │
├─────────────────────────────────────────────┤
│                                             │
│   Tell me about your business 🏠            │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │ What do you sell?                   │  │
│   │                                     │  │
│   │ [User types answer...]              │  │
│   └─────────────────────────────────────┘  │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │ Where are you located?              │  │
│   │                                     │  │
│   │ [User types answer...]              │  │
│   └─────────────────────────────────────┘  │
│                                             │
│   What's your average order value?          │
│   ┌─────────────────────────────────────┐  │
│   │ ○ Under ₹500                       │  │
│   │ ● ₹500 - ₹1,000                   │  │
│   │ ○ ₹1,000 - ₹2,000                 │  │
│   │ ○ Above ₹2,000                    │  │
│   └─────────────────────────────────────┘  │
│                                             │
│   ┌───────────────────────────────────┐    │
│   │           Next  →                 │    │
│   └───────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Specs:**
- Header: 16px, gray, with progress indicator
- Title: 24px, brown, bold
- Input fields: 48px height, 12px radius, light gray border
- Radio buttons: Custom orange selection, 20px circles
- Next button: Full width, orange, white text

### Screen 3: Main Chat (Home Screen)

**Purpose:** Primary interface, daily suggestions, AI interaction

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ☰  Orders-First AI         🔔  ⚙️         │
├─────────────────────────────────────────────┤
│                                             │
│  You  ─────────────────────────  9:15 AM  │
│                                             │
│         Good morning! ☀️                    │
│         How's business today?                │
│                                             │
│  AI   ─────────────────────────  9:16 AM  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Good morning! 🌞                     │   │
│  │                                      │   │
│  │  Today's suggestion:                 │   │
│  │  Post your mango cake with this...  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [Image Preview]                     │   │
│  │  Fresh Mango Cake 🥭                 │   │
│  │  Just out of the oven! Limited...  │   │
│  │                                      │   │
│  │  [Approve]  [Edit]  [Schedule]     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  AI   ─────────────────────────  9:16 AM  │
│                                             │
│         Want me to try a different option?  │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  💬  Type a message...                      │
└─────────────────────────────────────────────┘
```

**Design Specs:**
- Header: 48px height, cream background
- User bubble: Right-aligned, orange background (#FF9F43), white text
- AI bubble: Left-aligned, white background, dark text, 12px radius
- Suggestion card: White background, shadow, rounded corners
- Action buttons: 36px height, pill shape
- Input bar: 56px height, light gray background

### Screen 4: Content Preview

**Purpose:** Preview and edit content before posting

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ←  Preview Post                    ✕     │
├─────────────────────────────────────────────┤
│                                             │
│          This is how it will look:          │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │      [Your Photo Here]              │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Fresh Mango Cake 🥭                        │
│  Just out of the oven! Made with...         │
│                                             │
│  #mangocake #homemade #freshbaking          │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Schedule for:                              │
│  ┌─────────────────────────────────────┐   │
│  │  Today, 6:00 PM  ⭐ Recommended     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Tomorrow, 8:00 AM                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Pick another time...               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌───────────────────────────────────┐    │
│  │        Schedule Post  ✅           │    │
│  └───────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Specs:**
- Preview area: Matches Instagram/WhatsApp post format
- Caption: 16px, dark gray, line-height 24px
- Hashtags: 14px, orange (#FF9F43)
- Time options: Cards with selection state, star for recommended
- CTA button: Full width, green (#25D366), white text

### Screen 5: Dashboard

**Purpose View weekly summary, insights, and next actions

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ←  Dashboard                    ⚙️        │
├─────────────────────────────────────────────┤
│                                             │
│  This Week 📊                               │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  12  Posts Suggested               │   │
│  │  10  Approved & Posted             │   │
│  │  47  Orders Received  🎉            │   │
│  │  ₹23,500  Revenue  💰               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  What's Working 💡                          │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  • Chocolate cake posts get the...  │   │
│  │  • Evening posts (6-8 PM) perform...│   │
│  │  • WhatsApp Status brings 2x more...│   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Next Best Action 🚀                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  8 customers haven't ordered in... │   │
│  │                                      │   │
│  │  ┌─────────────────────────────┐    │   │
│  │  │  Send Reminder  [Yes] [No] │    │   │
│  │  └─────────────────────────────┘    │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Specs:**
- Summary card: 4 metrics in 2x2 grid
- Insight card: Bullet points with orange bullets
- Action card: White background, shadow, inline buttons
- Numbers: 24px, bold, orange
- Labels: 14px, gray

---

## 5. Conversation Design Guidelines

### 5.1 AI Personality

**Tone:** Friendly, informal, encouraging

**Characteristics:**
- Uses emojis appropriately (1-2 per message)
- Feels like a helpful friend, not a robot
- Adapts to seller's selected tone (default: friendly/casual)
- Celebrates small wins
- Apologizes gracefully for mistakes

### 5.2 Conversation Patterns

#### Pattern 1: Suggest → Review → Act

```
AI: [Makes suggestion]
User: [Reviews]
AI: "Want to edit, approve, or see another option?"
User: [Takes action]
AI: [Confirms + next step]
```

**Example:**
```
AI: "Here's a post for your chocolate cake today:
     'Fresh chocolate cake just ready! 🍫
      Pre-order now for evening delivery.
      DM to reserve yours!'

     Want to edit, approve, or see another option?"

User: [Approves]

AI: "Great! ✅ Should I post now at 6 PM or
     schedule for tomorrow morning?"
```

#### Pattern 2: Question → Clarify → Suggest

```
User: [Asks for something]
AI: [Asks clarifying question]
User: [Answers]
AI: [Makes specific suggestion]
```

**Example:**
```
User: "I want to run a sale"

AI: "Exciting! 🎉 What kind of sale?
     A) Festival special (Diwali, Eid, etc.)
     B) Stock clearance
     C) New product launch
     D) Fill slow days"

User: "A - Diwali special"

AI: "Perfect! Here's what I suggest for your
     Diwali sale:
     'Diwali is coming! 🪔 Special 15% off
      on all cakes. Pre-book now and get
      free home delivery!'
     Want to send this to your past customers?"
```

#### Pattern 3: Fallback

```
User: [Unclear input]
AI: [Clarifies with options]
User: [Selects or clarifies]
AI: [Proceeds]
```

**Example:**
```
User: "help"

AI: "I want to make sure I understand. Did you mean:
     A) Help with creating a post?
     B) Help with running a campaign?
     C) Help understanding your results?
     D) Something else?"

User: "A"

AI: "Got it! Let me create a post suggestion for you..."
```

### 5.3 Message Guidelines

**DO:**
- Keep messages under 100 words
- Use Hinglish where natural
- Explain "why" before asking
- Give specific examples
- Celebrate successes

**DON'T:**
- Use marketing jargon (CTR, ROAS, etc.)
- Write long paragraphs
- Be vague or ambiguous
- Sound robotic or corporate
- Overuse emojis

### 5.4 Timing Guidelines

| Scenario | Response Time |
|----------|---------------|
| User message | < 2 seconds |
| Content generation | < 3 seconds |
| Dashboard load | < 1 second |
| Analytics query | < 2 seconds |

---

## 6. UX Patterns & Micro-interactions

### 6.1 Loading States

**Short Loads (< 1s):** No indicator, instant

**Medium Loads (1-3s):** Simple spinner

```
    AI is thinking...
         ●  ●  ●
```

**Long Loads (3+s):** Friendly message + spinner

```
    AI is learning your business...
         ●  ●  ●
    This will take just a moment!
```

### 6.2 Success Feedback

**Confirmation Toast:**
```
┌─────────────────────────────────────────┐
│  ✅  Post scheduled for 6 PM!     [✕] │
└─────────────────────────────────────────┘
```

**Success Screen (after action):**
```
┌─────────────────────────────────────────┐
│                                         │
│              ✅ Done!                   │
│                                         │
│  Your post is scheduled for 6 PM.       │
│  I'll notify you when it goes live.     │
│                                         │
│  ┌─────────────────────────────┐       │
│  │      Back to Chat  →        │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### 6.3 Swipe Gestures

**On Chat Messages:**
- Swipe right: Reply
- Swipe left: Delete (with confirmation)

**On Dashboard Cards:**
- Swipe right: Take action
- Swipe left: Dismiss

### 6.4 Pull to Refresh

**On Chat Screen:**
- Pull down to get new suggestions
- Shows: "Getting fresh suggestions..."
- On release: Refreshes with animation

### 6.5 Long Press

**On Posted Content:**
- Long press shows: View Results, Edit, Delete, Share

### 6.6 Keyboard Shortcuts (Web)

- `/` - Open quick actions menu
- `?` - Show help
- `Esc` - Close modal/overlay
- `Enter` - Send message (in chat)

---

## 7. Accessibility Guidelines

### 7.1 Visual Accessibility

**Contrast Ratios:**
- All text: Minimum 4.5:1 (WCAG AA)
- Large text (18px+): Minimum 3:1
- Icons with text: Minimum 3:1

**Color Independence:**
- Don't rely on color alone to convey meaning
- Use icons, labels, or patterns alongside color
- Support high contrast mode

**Typography:**
- Minimum font size: 14px for body text
- Line height: Minimum 1.5x font size
- Letter spacing: 0.01em for body text

### 7.2 Motor Accessibility

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Minimum 8px spacing between targets

**Gesture Alternatives:**
- Always provide button alternatives to gestures
- One-handed operation support
- Reachability for bottom navigation

### 7.3 Cognitive Accessibility

**Clear Language:**
- Plain language, no jargon
- Short sentences (< 15 words)
- One idea per sentence

**Consistent Patterns:**
- Same action in same place
- Predictable navigation
- Clear feedback for all actions

**Error Prevention:**
- Clear instructions before actions
- Confirmations for destructive actions
- Undo for common mistakes

### 7.4 Screen Reader Support

- All images have alt text
- Form fields have labels
- Buttons have descriptive labels
- Live regions for dynamic content
- ARIA labels for custom components

---

## 8. Edge Cases & Error States

### 8.1 No Internet Connection

```
┌─────────────────────────────────────────┐
│                                         │
│            📶 No Internet               │
│                                         │
│  Please check your connection and       │
│  try again.                             │
│                                         │
│  ┌─────────────────────────────┐       │
│  │        Retry  🔄            │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### 8.2 WhatsApp Connection Failed

```
┌─────────────────────────────────────────┐
│                                         │
│     Connection Failed  ⚠️                │
│                                         │
│  Couldn't connect to WhatsApp Business. │
│  Please try again or contact support.   │
│                                         │
│  ┌─────────────────────────────┐       │
│  │        Try Again            │       │
│  └─────────────────────────────┘       │
│                                         │
│  Need help? Contact Support →           │
│                                         │
└─────────────────────────────────────────┘
```

### 8.3 Content Generation Failed

```
┌─────────────────────────────────────────┐
│                                         │
│        Oops! Something went wrong       │
│                                         │
│  I couldn't generate a suggestion.      │
│  Let me try again...                    │
│                                         │
│         ●  ●  ●                         │
│                                         │
└─────────────────────────────────────────┘
```

### 8.4 Empty State - No Scheduled Posts

```
┌─────────────────────────────────────────┐
│                                         │
│         No Scheduled Posts  📅           │
│                                         │
│  You don't have any posts scheduled.    │
│  Want me to suggest something for today? │
│                                         │
│  ┌─────────────────────────────┐       │
│  │     Get Suggestion  ✨       │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### 8.5 Empty State - No Results Yet

```
┌─────────────────────────────────────────┐
│                                         │
│          Results Coming Soon! 📊         │
│                                         │
│  Post your first content to start       │
│  seeing results. It usually takes       │
│  a day or two to gather data.           │
│                                         │
│  ┌─────────────────────────────┐       │
│  │      Back to Chat  →        │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### 8.6 Rate Limit Exceeded

```
┌─────────────────────────────────────────┐
│                                         │
│         Slow Down! 🐢                    │
│                                         │
│  You're using the app too quickly.      │
│  Please wait a moment and try again.     │
│                                         │
│  Try again in: 30 seconds               │
│                                         │
└─────────────────────────────────────────┘
```

### 8.7 Session Expired

```
┌─────────────────────────────────────────┐
│                                         │
│         Session Expired  🔒              │
│                                         │
│  Please sign in again to continue.       │
│                                         │
│  ┌─────────────────────────────┐       │
│  │        Sign In  →            │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

---

## 9. Animation Guidelines

### 9.1 Micro-animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Button press | Scale down to 0.95 | 100ms |
| Card appear | Fade in + slide up | 300ms |
| Chat bubble | Fade in | 200ms |
| Loading dots | Bounce | 1.2s infinite |
| Success check | Draw path | 500ms |
| Swipe action | Follow finger | Instant |

### 9.2 Page Transitions

| Transition | Animation | Duration |
|------------|-----------|----------|
| Push (forward) | Slide in from right | 250ms |
| Pop (back) | Slide out to right | 250ms |
| Modal | Fade in + scale up | 300ms |
| Bottom sheet | Slide up from bottom | 300ms |

### 9.3 Performance Guidelines

- Use transform/opacity for animations (GPU accelerated)
- Avoid animating width/height (causes reflow)
- Keep animation frame rate at 60fps
- Reduce motion for users who prefer it

---

## 10. Responsive Design

### 10.1 Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Primary target |
| Tablet | 640px - 1024px | Adapted layout |
| Desktop | > 1024px | Optimized layout |

### 10.2 Mobile First (Primary)

- Single column layout
- Bottom navigation
- Full-width buttons
- Touch-optimized targets

### 10.3 Tablet Adaptations

- Two-column dashboard
- Side navigation
- Larger tap targets maintained
- More content visible

### 10.4 Desktop Optimizations

- Three-column layout where appropriate
- Keyboard shortcuts available
- Hover states for interactive elements
- Larger content areas

---

## End of Design Document

**Version:** 1.0
**Date:** 2026-04-25
**Status:** Approved
