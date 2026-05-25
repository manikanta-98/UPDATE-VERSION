"use client"

import { Zap, Bike, Car, Battery } from "lucide-react"
import { categories } from "@/lib/data"

const iconMap = {
  Zap: Zap,
  Bike: Bike,
  Car: Car,
  Battery: Battery,
}

export function CategoriesSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect bike for your needs from our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <button
                key={category.name}
                className="group relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm md:text-base">{category.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {category.count} Bikes
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
