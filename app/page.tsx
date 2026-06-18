import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedBikesSection } from "@/components/featured-bikes-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedBikesSection />
        <CategoriesSection />
        <WhyChooseUsSection />
      </main>
      <Footer />
    </div>
  )
}
