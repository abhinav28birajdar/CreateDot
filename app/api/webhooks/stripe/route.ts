import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    // Webhook handler for Stripe events
    return NextResponse.json({ received: true })
}
