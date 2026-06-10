import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="relative overflow-hidden min-h-screen py-24 px-6">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-3xl rounded-full" />

        <div className="max-w-lg mx-auto relative z-10">
          <div className="border border-white/10 rounded-3xl p-10 backdrop-blur-xl bg-black/40 text-center">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                <svg
                  className="w-10 h-10 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-3">
              Payment Successful!
            </h1>
            <p className="text-default-500 mb-2">
              Your subscription is now active. Welcome aboard!
            </p>
            <p className="text-default-500 mb-8 text-sm">
              A confirmation email has been sent to{' '}
              <span className="text-white font-medium">{customerEmail}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 hover:scale-105 transition-all duration-300"
              >
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-default-500 text-sm">
              Questions?{' '}
              <a href="mailto:support@jobportal.com" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
