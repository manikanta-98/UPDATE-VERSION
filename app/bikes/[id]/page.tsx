"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Loader2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FeaturedBikesSection } from "@/components/featured-bikes-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api, formatPrice, getWhatsAppLink } from "@/lib/api"
import type { Bike } from "@/lib/types"
import {
  getBikeImages,
  normalizeImageUrl,
  PLACEHOLDER,
  isAvailable,
  statusLabel,
} from "@/lib/bike-helpers"
import { BikeImage } from "@/components/bike-image"
import { EmiCalculator } from "@/components/emi-calculator"

export default function BikeDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [bike, setBike] = useState<Bike | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [mainSrc, setMainSrc] = useState(PLACEHOLDER)

  const primaryImage = bike?.images?.[0]?.trim()
    ? normalizeImageUrl(bike.images[0])
    : PLACEHOLDER

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api
      .getBike(id)
      .then((res) => {
        setBike(res.data)
        setError(null)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load bike")
      })
      .finally(() => setLoading(false))
  }, [id])

  const images = bike ? getBikeImages(bike) : [PLACEHOLDER]

  useEffect(() => {
    if (bike) {
      const first = bike.images?.[0]?.trim()
        ? normalizeImageUrl(bike.images[0])
        : PLACEHOLDER
      setMainSrc(first)
      setImageIndex(0)
    }
  }, [bike])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link href="/bikes">
            <ArrowLeft className="h-4 w-4" />
            Back to bikes
          </Link>
        </Button>

        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button asChild variant="outline">
              <Link href="/bikes">Browse all bikes</Link>
            </Button>
          </div>
        )}

        {!loading && bike && (
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 border">
              {images.length > 1 && images[0] !== PLACEHOLDER ? (
                <BikeImage
                  src={images[imageIndex]}
                  alt={bike.model}
                  className="h-full w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainSrc || primaryImage || bike.images?.[0] || PLACEHOLDER}
                  alt={bike.model}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setMainSrc(PLACEHOLDER)}
                />
              )}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                        i === imageIndex ? "border-primary" : "border-transparent opacity-70"
                      }`}
                    >
                      <BikeImage
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center"
                    onClick={() =>
                      setImageIndex((i) => (i - 1 + images.length) % images.length)
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 flex items-center justify-center"
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <Badge
                className={`absolute top-4 left-4 ${
                  isAvailable(bike.status)
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                {statusLabel(bike.status)}
              </Badge>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                    AK Bikes Premium
                  </p>
                  <Badge
                    className={
                      isAvailable(bike.status)
                        ? "bg-success text-success-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }
                  >
                    {statusLabel(bike.status)}
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                  {bike.model}
                </h1>
              </div>

              <div className="p-6 rounded-2xl border-2 border-border bg-card shadow-sm space-y-4">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                  Vehicle Price
                </p>
                <p className="text-4xl font-bold text-accent">
                  {formatPrice(bike.price)}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Registration Year</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {bike.year ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Registration No.</p>
                    <p className="font-mono font-medium">
                      {bike.number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Vehicle Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {bike.description || "No detailed description provided for this vehicle."}
                </p>
              </div>

              <div className="pt-4">
                {bike.price && bike.price > 0 && (
                  <EmiCalculator bikePrice={bike.price} bikeModel={bike.model} />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 h-14 text-lg gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md"
                  disabled={!isAvailable(bike.status)}
                  onClick={() => window.open(getWhatsAppLink(bike), "_blank")}
                >
                  <MessageCircle className="h-6 w-6" />
                  WhatsApp
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 h-14 text-lg gap-2 shadow-md border-2 border-primary text-primary hover:bg-primary/5" 
                  asChild
                >
                  <a href="tel:+919676499794">
                    <Phone className="h-5 w-5" />
                    Call Seller
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Similar Bikes Section */}
        {!loading && bike && (
          <div className="mt-20 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Similar Bikes You Might Like</h2>
            <FeaturedBikesSection />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
