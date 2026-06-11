# Payment Integration

## Overview

The payment system uses **Stripe Checkout** for subscription billing. It supports two user roles (`seeker` / `recruiter`), each with free and paid plans. The frontend is a Next.js App Router application that communicates with Stripe directly via the server-side SDK and delegates subscription record creation to an external backend.

---

## Architecture

```
User (Browser)          Next.js (port 3000)              Stripe              External Backend (port 5000)
     │                        │                           │                          │
     │  POST /pricing (form)  │                           │                          │
     │───────────────────────>│                           │                          │
     │                        │                           │                          │
     │                        │  stripe.checkout.         │                          │
     │                        │  sessions.create()        │                          │
     │                        │──────────────────────────>│                          │
     │                        │                           │                          │
     │  303 Redirect to       │                           │                          │
     │  Stripe Checkout URL   │                           │                          │
     │<───────────────────────│                           │                          │
     │                        │                           │                          │
     │  User completes        │                           │                          │
     │  payment on            │                           │                          │
     │  Stripe hosted page    │                           │                          │
     │───────────────────────────────────────────────────>│                          │
     │                        │                           │                          │
     │  Redirect to           │                           │                          │
     │  /success?session_id=  │                           │                          │
     │<───────────────────────────────────────────────────│                          │
     │                        │                           │                          │
     │                        │  stripe.checkout.         │                          │
     │                        │  sessions.retrieve()      │                          │
     │                        │──────────────────────────>│                          │
     │                        │                           │                          │
     │                        │  createSubscription()     │                          │
     │                        │  POST /api/plans          │                          │
     │                        │─────────────────────────────────────────────────────>│
     │                        │                           │                          │
     │                        │                           │                  Updates user plan in DB
```

---

## Plans

| Plan ID                  | Role       | Price    | Stripe Price ID                          |
|--------------------------|------------|----------|------------------------------------------|
| `seeker_free`            | seeker     | Free     | —                                        |
| `seeker_pro`             | seeker     | Paid     | `price_1Tg5mN9iO2gE4Luu5oDaYnfe`        |
| `seeker_premium`         | seeker     | Paid     | `price_1TgbMa9iO2gE4Luue73DzNYb`        |
| `recruiter_free`         | recruiter  | Free     | —                                        |
| `recruiter_growth`       | recruiter  | Paid     | `price_1TgbKv9iO2gE4LuufvWD9MnL`        |
| `recruiter_Enterprise`   | recruiter  | Paid     | `price_1TgbKv9iO2gE4LuufvWD9MnL` (⚠️ duplicate) |

Free plans are assigned on signup (`src/app/sign-up/page.jsx`). Paid plans require Stripe Checkout.

---

## Flow Details

### 1. Pricing Page → Checkout Session

**File:** `src/app/pricing/page.jsx`

User selects a plan and submits a form via `POST` to `/api/checkout_sessions` with a hidden `pricing_id` field.

```jsx
<form action="/api/checkout_sessions" method="POST">
  <input type="hidden" name="pricing_id" value={plan.id} />
  <button type="submit">Checkout</button>
</form>
```

### 2. Checkout Session API

**File:** `src/app/api/checkout_sessions/route.js`

The route handler:
1. Looks up the authenticated user via headers.
2. Maps the submitted `pricing_id` to a Stripe Price ID using `PLAN_PRICE_ID` from `src/lib/stripe.js`.
3. Creates a Stripe Checkout Session in `subscription` mode with customer email and plan metadata.
4. Returns a `303` redirect to the Stripe hosted checkout URL.

```js
const session = await stripe.checkout.sessions.create({
  customer_email: user?.email,
  line_items: [{ price: pricingId, quantity: 1 }],
  mode: 'subscription',
  metadata: { planId },
  success_url: `${origin}/success/?session_id={CHECKOUT_SESSION_ID}`,
});
return NextResponse.redirect(session.url, 303);
```

### 3. Stripe Checkout (Hosted Page)

Stripe handles the payment UI. On completion, the user is redirected to `/success?session_id=cs_test_...`.

### 4. Success Page → Subscription Creation

**File:** `src/app/success/page.jsx`

1. Retrieves the Checkout Session from Stripe (expanded with `line_items` and `payment_intent`).
2. Extracts `planId` from `session.metadata.planId` and `customerEmail` from `session.customer_email`.
3. Calls `createSubscription({ email, planId })`.
4. Displays a confirmation with a "Go to Dashboard" link.

### 5. Subscription Server Action

**File:** `src/lib/actions/Subscription.js`

Makes a `POST` request to the external backend at `http://localhost:5000/api/plans` with `{ email, planId }` to persist the subscription.

```js
export const createSubscription = async (data) => {
  const result = await serverMutation('/api/plans', data);
  return result;
};
```

### 6. Plan Enforcement (Application Limits)

**Files:** `src/app/jobs/[id]/apply/page.jsx`, `src/app/jobs/[id]/apply/JobApply.jsx`

On the job application page:
1. The user's plan is fetched from the external backend (`GET /api/plans?plan_id=${id}`).
2. If the number of submitted applications >= `plan.maxApplied`, the form is hidden and an upgrade upsell is shown.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/stripe.js` | Stripe SDK initialization + plan-to-price-ID mapping |
| `src/app/api/checkout_sessions/route.js` | Creates Stripe Checkout session |
| `src/app/success/page.jsx` | Post-payment confirmation; creates subscription |
| `src/app/pricing/page.jsx` | Pricing page UI with plan selection |
| `src/components/PricingSection.jsx` | Homepage marketing pricing (decorative only) |
| `src/lib/actions/Subscription.js` | Server action to create subscription via external backend |
| `src/lib/api/plans.js` | Fetches plan details from external backend |
| `src/app/jobs/[id]/apply/JobApply.jsx` | Application form with plan limit enforcement |
| `src/app/jobs/[id]/apply/page.jsx` | Server component that fetches plan data for apply page |
| `src/app/sign-up/page.jsx` | Assigns free plan on registration |
| `src/lib/auth.js` | Auth config; defines `plans` as an additional user field |
| `.env` | Stripe secret key and other environment variables |

---

## Environment Variables

```
STRIPE_SECRET_KEY=sk_test_...          # Used server-side in stripe.js
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Declared but currently unused
NEXT_PUBLIC_URL=http://localhost:5000            # External backend URL
BETTER_AUTH_URL=http://localhost:3000            # Auth URL
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

---

## Dependencies

| Package | Version | Usage |
|---------|---------|-------|
| `stripe` | `^22.2.0` | Server-side Stripe SDK |
| `@stripe/stripe-js` | `^9.7.0` | Client-side Stripe.js (not currently used) |

---

## Known Gaps & Issues

1. **No webhook handler** — Stripe events (`checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`, etc.) are not handled. If the user closes the browser before the success page loads, the subscription may not be activated.
2. **No subscription management** — No cancel, upgrade, downgrade, or customer portal flow exists.
3. **Duplicate price IDs** — `recruiter_growth` and `recruiter_Enterprise` map to the same Stripe Price ID (`price_1TgbKv9iO2gE4LuufvWD9MnL`), likely a bug.
4. **Unused publishable key** — `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is in `.env` but never referenced in code.
5. **External backend dependency** — Subscription persistence relies on a separate backend at `http://localhost:5000` that is not part of this repository.
6. **No failed payment handling** — There is no retry or notification logic for failed payments.
