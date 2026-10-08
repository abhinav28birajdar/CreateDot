import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const signature = req.headers.get('stripe-signature')
    const secret = process.env.STRIPE_WEBHOOK_SECRET

    if (!secret || !signature) {
        return NextResponse.json({ error: 'Webhook verification is not configured' }, { status: 503 })
    }

    return NextResponse.json(
        { error: 'Stripe event processing is not configured' },
        { status: 501 }
    )
}
