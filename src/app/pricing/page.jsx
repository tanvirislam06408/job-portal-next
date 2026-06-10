"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const seekerPlans = [
    {
        name: "Free",
        id:'seeker_free',
        price: "$0",
        period: "/forever",
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
    },
    {
        name: "Pro",
        id:'seeker_pro',
        price: "$19",
        period: "/month",
        popular: true,
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
    },
    {
        name: "Premium",
        id:'seeker_premium',
        price: "$39",
        period: "/month",
        features: [
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
    },
];

const recruiterPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/forever",
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
        ],
    },
    {
        name: "Growth",
        id:'recruiter_growth',
        price: "$49",
        period: "/month",
        popular: true,
        features: [
            "Up to 10 active job posts",
            "Applicant tracking",
            "Basic analytics",
            "Email support",
        ],
    },
    {
        name: "Enterprise",
         id:'recruiter_Enterprise',
        price: "$149",
        period: "/month",
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured job listings",
            "Team collaboration",
            "Custom branding",
            "Priority support",
        ],
    },
];

const faqs = [
    {
        q: "Can I change plans anytime?",
        a: "Yes, you can upgrade or downgrade your plan at any time.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Absolutely. There are no long-term commitments.",
    },
    {
        q: "Do recruiters get a free plan?",
        a: "Yes, recruiters can start with up to 3 active job posts for free.",
    },
    {
        q: "Is support included?",
        a: "All paid plans include support, with priority support available on higher tiers.",
    },
];

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState("seeker");

    const plans =
        activeTab === "seeker" ? seekerPlans : recruiterPlans;

    return (<div className="relative overflow-hidden min-h-screen py-24 px-6">
        {/* Background Effects */} <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full" /> <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Pricing that helps you move faster
                    <span className="text-primary"> with confidence</span>
                </h1>

                <p className="mt-6 text-default-500 text-lg">
                    Flexible plans for ambitious job seekers and hiring teams who want
                    clarity, speed, and measurable results.
                </p>

                <p className="mt-5 text-default-500 text-base max-w-2xl mx-auto">
                    Switch between seeker and recruiter pricing to compare the features
                    designed for your workflow.
                </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-16">
                <div className="relative flex bg-content2 p-1 rounded-xl">
                    <motion.div
                        layout
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className={`absolute top-1 bottom-1 bg-primary rounded-lg w-[calc(50%-4px)]
          ${activeTab === "seeker"
                                ? "left-1"
                                : "left-[calc(50%+2px)]"
                            }`}
                    />

                    <button
                        onClick={() => setActiveTab("seeker")}
                        className={`relative z-10 px-8 py-3 font-medium transition ${activeTab === "seeker"
                            ? "text-white"
                            : "text-default-600"
                            }`}
                    >
                        Job Seekers
                    </button>

                    <button
                        onClick={() => setActiveTab("recruiter")}
                        className={`relative z-10 px-8 py-3 font-medium transition ${activeTab === "recruiter"
                            ? "text-white"
                            : "text-default-600"
                            }`}
                    >
                        Recruiters
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                                delay: index * 0.08,
                            }}
                            whileHover={{
                                y: -12,
                                scale: 1.04,
                            }}
                            className={`relative rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300
            ${plan.popular
                                    ? "border-primary shadow-[0_0_60px_rgba(59,130,246,.25)] scale-105"
                                    : "border-default-200"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-5 right-5">
                                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">
                                {plan.name}
                            </h3>

                            <div className="mb-8">
                                <span className="text-5xl font-bold">
                                    {plan.price}
                                </span>
                                <span className="text-default-500">
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <form
                                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-center ${plan.popular
                                        ? "bg-primary text-white"
                                        : "border"
                                    }`}
                                action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="pricing_id" value={plan.id} />
                                <section>
                                    <button type="submit" role="link">
                                        Checkout
                                    </button>
                                </section>
                            </form>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Comparison */}
            <div className="mt-28">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Feature Comparison
                </h2>

                <div className="overflow-x-auto border rounded-2xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-left">Feature</th>
                                <th className="p-4">Free</th>
                                <th className="p-4">Pro/Growth</th>
                                <th className="p-4">Premium/Enterprise</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="p-4">Save Jobs</td>
                                <td className="p-4">10</td>
                                <td className="p-4">Unlimited</td>
                                <td className="p-4">Unlimited</td>
                            </tr>

                            <tr className="border-b">
                                <td className="p-4">Applications</td>
                                <td className="p-4">3/month</td>
                                <td className="p-4">30/month</td>
                                <td className="p-4">Unlimited</td>
                            </tr>

                            <tr className="border-b">
                                <td className="p-4">Analytics</td>
                                <td className="p-4">—</td>
                                <td className="p-4">✓</td>
                                <td className="p-4">✓</td>
                            </tr>

                            <tr>
                                <td className="p-4">Priority Support</td>
                                <td className="p-4">—</td>
                                <td className="p-4">—</td>
                                <td className="p-4">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto mt-28">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.q}
                            className="border rounded-xl p-5"
                        >
                            <summary className="cursor-pointer font-semibold">
                                {faq.q}
                            </summary>

                            <p className="mt-3 text-default-500">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-28">
                <h2 className="text-4xl font-bold mb-4">
                    Ready to Get Started?
                </h2>

                <p className="text-default-500 mb-8">
                    Join thousands of professionals and companies today.
                </p>

                <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
                    Start Free Today
                </button>
            </div>
        </div>
    </div>
    );
}

