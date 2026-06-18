"use client"

import React, { createContext, useContext, useEffect, useState, useMemo } from "react"
import { api } from "@/lib/api"
import type { Bike, BikeStats } from "@/lib/types"

export interface CategoryData {
  name: string
  count: number
}

interface InventoryContextType {
  bikes: Bike[]
  stats: BikeStats | null
  categories: CategoryData[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [stats, setStats] = useState<BikeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInventory = async () => {
    try {
      setLoading(true)
      setError(null)
      // Fetch up to 1000 bikes to calculate global categories
      const res = await api.getBikes({ limit: "1000" })
      setBikes(Array.isArray(res.data) ? res.data : [])
      if (res.stats) {
        setStats(res.stats)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inventory")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  // Derive categories and counts dynamically from bike models
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()
    
    // We try to extract the primary brand from the model name (first word)
    bikes.forEach((bike) => {
      // Ignore unsold bikes if needed, or count all bikes
      if (bike.model) {
        const firstWord = bike.model.trim().split(" ")[0].toUpperCase()
        // Map common variations
        let brandName = firstWord
        if (firstWord === "ROYAL") brandName = "ROYAL ENFIELD"
        else if (firstWord === "HERO" || firstWord === "HONDA") {
           // Handle Hero Honda if necessary
           if (bike.model.toUpperCase().startsWith("HERO HONDA")) brandName = "HERO HONDA"
        }
        else {
           // Standardize capitalization (e.g., KTM, Bajaj)
           brandName = firstWord.charAt(0) + firstWord.slice(1).toLowerCase()
           if (firstWord === "KTM" || firstWord === "TVS" || firstWord === "BMW") {
              brandName = firstWord
           }
        }
        
        categoryMap.set(brandName, (categoryMap.get(brandName) || 0) + 1)
      }
    })

    const catArray = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }))

    // Sort by count descending
    return catArray.sort((a, b) => b.count - a.count)
  }, [bikes])

  const value = {
    bikes,
    stats,
    categories,
    loading,
    error,
    refresh: fetchInventory,
  }

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}
