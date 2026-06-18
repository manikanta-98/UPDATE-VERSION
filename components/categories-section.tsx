"use client"

import { Bike, Battery, Zap, Wind } from "lucide-react"

import { useInventory } from "@/components/providers/inventory-provider"
import Link from "next/link"

function getCategoryIcon(name: string) {
  const upper = name.toUpperCase()
  if (upper.includes("SCOOTER")) return { icon: Wind, type: "icon" }
  if (upper.includes("SPORT")) return { icon: Zap, type: "icon" }
  if (upper.includes("ELECTRIC") || upper.includes("EV")) return { icon: Battery, type: "icon" }
  return { 
    initial: name.substring(0, 2).toUpperCase(), 
    type: "brand" 
  }
}

export function CategoriesSection() {
  const { categories } = useInventory()

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Browse by Brand & Category
          </h2>
        </div>

        {/* Scrollable Container for Mobile, Wrap on Desktop */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 md:flex-wrap md:justify-center md:gap-6 lg:gap-8 scrollbar-hide">
          <Link
            href={`/bikes`}
            className="group flex flex-col items-center flex-shrink-0 w-20 md:w-24 gap-3 cursor-pointer"
          >
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white border border-border shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary/50 transition-all duration-300">
              <Bike className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-xs md:text-sm text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                All Bikes
              </h3>
            </div>
          </Link>
          {categories.map((category) => {
            const display = getCategoryIcon(category.name)
            return (
              <Link
                href={`/bikes?search=${category.name}`}
                key={category.name}
                className="group flex flex-col items-center flex-shrink-0 w-20 md:w-24 gap-3 cursor-pointer"
              >
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white border border-border shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary/50 transition-all duration-300">
                  {display.type === "icon" && display.icon ? (
                    <display.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  ) : (
                    <span className="font-bold text-lg md:text-xl text-primary font-mono tracking-tighter">
                      {display.initial}
                    </span>
                  )}
                </div>
                <div className="text-center flex flex-col items-center">
                  <h3 className="font-medium text-xs md:text-sm text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-[10px] md:text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full mt-1">
                    {category.count}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

