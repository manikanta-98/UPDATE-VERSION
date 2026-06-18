"use client"

import { useEffect, useState } from "react"
import { OPEN_SELL_MODAL_EVENT } from "@/components/sell-bike-modal"
import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronRight, Bike, Search } from "lucide-react"
import { SellBikeModal } from "@/components/sell-bike-modal"

export function HeroSection() {
  const [sellModalOpen, setSellModalOpen] = useState(false)

  useEffect(() => {
    const open = () => setSellModalOpen(true)
    window.addEventListener(OPEN_SELL_MODAL_EVENT, open)
    return () => window.removeEventListener(OPEN_SELL_MODAL_EVENT, open)
  }, [])

  const handleWhatsApp = () => {
    window.open("https://wa.me/919676499794?text=Hi! I'm interested in bikes at AK Bikes", "_blank")
  }

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl bg-primary/5 border border-primary/10">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="p-8 lg:p-16 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  India's Most Trusted Bike Marketplace
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Find Your <br className="hidden lg:block"/> <span className="text-primary">Perfect Bike</span>
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                Browse verified pre-owned bikes at trusted prices.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Button size="lg" className="h-12 px-8 text-base shadow-sm" asChild>
                  <a href="/bikes">
                    Browse Bikes
                  </a>
                </Button>
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white border-2 border-primary text-primary px-8 text-base font-semibold transition-colors hover:bg-primary/5"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSellModalOpen(true)
                  }}
                >
                  <Bike className="h-5 w-5" />
                  Sell Your Bike
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 hidden lg:block" />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop"
                alt="Premium second-hand bike"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <SellBikeModal
        open={sellModalOpen}
        onOpenChange={setSellModalOpen}
      />
    </section>
  )
}
