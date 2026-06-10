import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1Tg5mN9iO2gE4Luu5oDaYnfe',
    'seeker_premium': 'price_1TgbMa9iO2gE4Luue73DzNYb',
    'recruiter_growth': 'price_1TgbKv9iO2gE4LuufvWD9MnL',
    'recruiter_Enterprise': 'price_1TgbKv9iO2gE4LuufvWD9MnL'
}