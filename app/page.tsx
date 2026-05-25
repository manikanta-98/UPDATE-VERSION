import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedBikesSection } from "@/components/featured-bikes-section"
import { PopularBrandsSection } from "@/components/popular-brands-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedBikesSection />
        <PopularBrandsSection />
        <WhyChooseUsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
