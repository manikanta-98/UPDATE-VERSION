"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Loader2, X, LayoutGrid, List } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TrustSection } from "@/components/trust-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BikeCard } from "@/components/bike-card"
import { api } from "@/lib/api"
import type { Bike } from "@/lib/types"

const PAGE_SIZE = 12

function bikeKey(bike: Bike) {
  return `${bike.id}-${bike.number ?? bike._id ?? "na"}`
}

function mergeBikes(prev: Bike[], list: Bike[], append: boolean): Bike[] {
  const merged = append ? [...prev, ...list] : list
  const seen = new Set<string>()
  return merged.filter((bike) => {
    const key = bikeKey(bike)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function BikesContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [bikes, setBikes] = useState<Bike[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [viewLayout, setViewLayout] = useState<"grid" | "list">("grid")

  const [searchQuery, setSearchQuery] = useState(initialSearch)

  useEffect(() => {
    const s = searchParams.get("search")
    if (s !== null) {
      setSearchQuery(s)
    }
  }, [searchParams])
  const [priceRange, setPriceRange] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sort, setSort] = useState("latest")

  const fetchBikes = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) setLoadingMore(true)
        else setLoading(true)

        const params: Record<string, string> = {
          page: String(pageNum),
          limit: String(PAGE_SIZE),
          sort,
        }
        if (searchQuery.trim()) params.search = searchQuery.trim()
        if (priceRange !== "all") params.priceRange = priceRange
        if (yearFilter !== "all") params.year = yearFilter
        if (statusFilter !== "all") params.status = statusFilter

        const res = await api.getBikes(params)
        const list = Array.isArray(res.data) ? res.data : []
        setBikes((prev) => mergeBikes(prev, list, append))
        setTotalCount(res.pagination?.total ?? list.length)
        setHasMore(res.pagination?.hasMore ?? false)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bikes")
        if (!append) setBikes([])
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [searchQuery, priceRange, yearFilter, statusFilter, sort]
  )

  useEffect(() => {
    setPage(1)
    fetchBikes(1, false)
  }, [fetchBikes])

  const loadMore = () => {
    if (loadingMore || loading || !hasMore) return
    const next = page + 1
    setPage(next)
    fetchBikes(next, true)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange("all")
    setYearFilter("all")
    setStatusFilter("all")
    setSort("latest")
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    priceRange !== "all" ||
    yearFilter !== "all" ||
    statusFilter !== "all" ||
    sort !== "latest"

  const yearOptions = Array.from({ length: 11 }, (_, i) => 2025 - i)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Amazon/Flipkart Style) */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6 bg-card border border-border p-6 rounded-2xl shadow-sm h-fit lg:sticky lg:top-24">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Sort By</label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bikes..."
                    className="pl-10 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50000">Under ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000-150000">₹1,00,000 - ₹1,50,000</SelectItem>
                    <SelectItem value="150000-999999">Above ₹1,50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Year</label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {yearOptions.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unsold">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-6" onClick={() => fetchBikes(1)}>
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Browse Bikes</h1>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{bikes.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalCount}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewLayout === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewLayout("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewLayout === "list" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewLayout("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                {error}. Start the backend with <code className="font-mono">npm run dev</code>.
              </div>
            )}

            {loading && bikes.length === 0 ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : bikes.length > 0 ? (
              <>
                <div className={viewLayout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                  {bikes.map((bike) => (
                    <div key={bikeKey(bike)} className={viewLayout === "list" ? "max-w-4xl" : ""}>
                      <BikeCard bike={bike} />
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="min-w-[160px] bg-white border-border hover:bg-secondary"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-white border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query to find what you&apos;re looking for.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </div>
  )
}

export default function BikesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <BikesContent />
    </Suspense>
  )
}
