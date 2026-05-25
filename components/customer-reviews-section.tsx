"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { reviews } from "@/lib/data"

export function CustomerReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers who found their perfect ride with us
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative flex flex-col p-6 rounded-2xl bg-card border border-border"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-warning text-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground flex-1">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative flex flex-col p-6 rounded-2xl bg-card border border-border">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            <div className="flex items-center gap-4 mb-4">
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{reviews[currentIndex].name}</h4>
                <p className="text-sm text-muted-foreground">
                  {reviews[currentIndex].location}
                </p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < reviews[currentIndex].rating
                      ? "fill-warning text-warning"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{reviews[currentIndex].comment}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prevReview}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextReview}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
