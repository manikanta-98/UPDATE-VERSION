"use client"

import { ShieldCheck, IndianRupee, FileText, HeadphonesIcon } from "lucide-react"

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified Bikes",
    description: "Every bike undergoes a strict 150-point inspection before listing.",
  },
  {
    icon: IndianRupee,
    title: "Best Price Guarantee",
    description: "Get the most competitive prices in the market, with zero hidden fees.",
  },
  {
    icon: FileText,
    title: "Easy Documentation",
    description: "We handle all the paperwork, RC transfer, and NOC seamlessly.",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    description: "24/7 dedicated assistance to help you buy or sell your bike.",
  },
]

export function TrustSection() {
  return (
    <section className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustFeatures.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-6 rounded-[20px] bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
