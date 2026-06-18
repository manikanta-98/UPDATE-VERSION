"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  Search,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { triggerSellBikeModal } from "@/components/sell-bike-modal"
import { useInventory } from "@/components/providers/inventory-provider"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Bikes", href: "/bikes" },
  { name: "Sell Bike", href: "#", openSellModal: true },
  { name: "Finance", href: "/finance" },
  { name: "About", href: "/#why-choose-us" },
  { name: "Contact", href: "/#contact" },
]

interface NavbarProps {
  minimalAuth?: boolean
}

export function Navbar({ minimalAuth = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [logoError, setLogoError] = useState(false)
  const router = useRouter()
  const { categories } = useInventory()

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919676499794?text=Hi! I'm interested in bikes at AK Bikes",
      "_blank"
    )
  }

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center h-12 w-12 bg-white rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 border-2 border-white">
                {!logoError ? (
                  <img
                    src="/logo.png"
                    alt="Bikes4U Hyderabad"
                    className="h-full w-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-xs font-black italic tracking-tighter text-primary">B4U</span>
                )}
              </div>
            </Link>

            {!minimalAuth && (
              <div className="hidden flex-1 max-w-2xl lg:flex mx-8">
                <div className="relative w-full flex">
                  <Input
                    type="search"
                    placeholder="Search for bikes, brands and more..."
                    className="w-full pl-4 pr-12 bg-white text-black border-none h-10 rounded-l-md rounded-r-none focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="h-10 rounded-l-none rounded-r-md bg-accent hover:bg-accent/90 text-accent-foreground px-6" onClick={() => window.location.href = `/bikes?search=${searchQuery}`}>
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {!minimalAuth && (
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) =>
                  link.openSellModal ? (
                    <button
                      key={link.name}
                      onClick={triggerSellBikeModal}
                      className="text-sm font-semibold transition-colors hover:text-accent"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm font-semibold transition-colors hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </nav>
            )}



            <div className="flex lg:hidden items-center gap-2">
              {!minimalAuth && (
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {!minimalAuth && (
        <div className="hidden lg:block bg-background border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex h-12 items-center gap-6 text-sm overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link href="/bikes" className="hover:text-primary transition-colors flex items-center gap-1 font-bold">
                <Menu className="h-4 w-4" /> All Categories
              </Link>
              {categories.slice(0, 10).map((cat) => (
                <Link key={cat.name} href={`/bikes?search=${cat.name}`} className="hover:text-primary transition-colors">
                  {cat.name} <span className="text-xs text-muted-foreground ml-1">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && !minimalAuth && (
        <div className="lg:hidden bg-background border-b animate-in slide-in-from-top-2 absolute w-full top-[64px] left-0 shadow-lg z-40">
          <div className="p-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 bottom-1 h-auto py-0"
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = `/bikes?search=${searchQuery}`
                }}
              >
                Go
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              <div className="font-bold mb-2 uppercase text-xs text-muted-foreground tracking-wider">Categories</div>
              {categories.map((cat) => (
                <Link key={cat.name} href={`/bikes?search=${cat.name}`} className="px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary rounded-lg" onClick={() => setIsOpen(false)}>
                  {cat.name} <span className="text-xs text-muted-foreground ml-1">({cat.count})</span>
                </Link>
              ))}
              <div className="border-t my-2" />
              {navLinks.map((link) =>
                link.openSellModal ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsOpen(false)
                      triggerSellBikeModal()
                    }}
                    className="px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary rounded-lg text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <Button
                onClick={handleWhatsApp}
                className="mt-4 gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white w-full"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
