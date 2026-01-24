import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export const metadata: Metadata = {
    title: 'Premium - CreatorFlow',
    description: 'Upgrade your experience',
}

export default function PremiumPage() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Upgrade to Pro</h1>
                <p className="text-lg text-muted-foreground">Get widespread exposure, advanced analytics, and exclusive tools.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="border rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Free</h3>
                    <p className="text-muted-foreground mb-6">For getting started</p>
                    <div className="text-3xl font-bold mb-6">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                    <Button variant="outline" className="w-full mb-6">Current Plan</Button>
                    <ul className="space-y-3">
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Basic Profile</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> 10 Uploads/month</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Community Access</li>
                    </ul>
                </div>

                <div className="border-2 border-primary rounded-xl p-8 shadow-lg relative">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <p className="text-muted-foreground mb-6">For serious creators</p>
                    <div className="text-3xl font-bold mb-6">$12<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                    <Button className="w-full mb-6">Upgrade Now</Button>
                    <ul className="space-y-3">
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Everything in Free</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Unlimited Uploads</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Advanced Analytics</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Pro Badge</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Sell on Marketplace (0% fee)</li>
                    </ul>
                </div>

                <div className="border rounded-xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Team</h3>
                    <p className="text-muted-foreground mb-6">For agencies</p>
                    <div className="text-3xl font-bold mb-6">$30<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                    <Button variant="outline" className="w-full mb-6">Contact Sales</Button>
                    <ul className="space-y-3">
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> 5 Team Members</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Collaborative Projects</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500" /> Team Dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
