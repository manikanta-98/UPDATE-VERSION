"use client"

import { Users, Bike, TrendingUp, ShieldCheck } from "lucide-react"
import { useInventory } from "@/components/providers/inventory-provider"

export function StatisticsSection() {
  const { stats } = useInventory()

  const dynamicStats = [
    {
      label: "Total Bikes",
      value: stats?.total ? `${stats.total}+` : "100+",
      icon: Bike,
    },
    {
      label: "Happy Customers",
      value: stats?.sold ? `${Math.max(500, stats.sold)}+` : "500+",
      icon: Users,
    },
    {
      label: "Bikes Sold",
      value: stats?.sold ? `${stats.sold}` : "0",
      icon: TrendingUp,
    },
    {
      label: "Years of Trust",
      value: "10+",
      icon: ShieldCheck,
    },
  ]
  return (
    <section className="bg-secondary py-12 text-secondary-foreground border-y border-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {dynamicStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center group">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-white/10">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-white mb-2">{stat.value}</p>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
