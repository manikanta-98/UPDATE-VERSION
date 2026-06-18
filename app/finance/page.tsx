import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GenericEmiCalculator } from "@/components/generic-emi-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Percent, ShieldCheck } from "lucide-react"
import { calculateEMI } from "@/lib/emi"

export const metadata = {
  title: "Bike Finance | Bikes4U",
  description: "Check EMI instantly and apply for bike finance at Bikes4U.",
}

function EmiExampleCard({ loanAmount }: { loanAmount: number }) {
  const emi = calculateEMI(loanAmount, 14, 60)
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-all border-t-4 border-t-[#2874F0]">
      <CardHeader className="bg-slate-50 pb-4">
        <CardTitle className="text-center text-slate-600 uppercase tracking-widest text-sm font-bold">
          Loan Amount
        </CardTitle>
        <p className="text-3xl font-black text-center text-slate-800">₹ {loanAmount.toLocaleString("en-IN")}</p>
      </CardHeader>
      <CardContent className="pt-6 text-center space-y-2">
        <p className="text-sm text-slate-500 font-semibold">Estimated EMI (60 months)</p>
        <p className="text-2xl font-bold text-[#2874F0]">₹ {emi.toLocaleString("en-IN")} <span className="text-sm font-normal text-slate-500">/mo</span></p>
      </CardContent>
    </Card>
  )
}

export default function FinancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#2874F0] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Bike Finance Made Easy
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Check EMI instantly and apply for bike finance. Get your dream bike today with our flexible financing options.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="container mx-auto px-4 -mt-12 md:-mt-16 relative z-10">
          <GenericEmiCalculator />
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Why Finance With Us?</h2>
            <div className="h-1 w-20 bg-[#FF6B00] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border hover:border-[#2874F0] transition-colors">
              <div className="mx-auto h-16 w-16 bg-blue-50 text-[#2874F0] flex items-center justify-center rounded-full">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Quick Approval</h3>
              <p className="text-slate-600 font-medium">Get your loan approved in minutes with minimal documentation.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border hover:border-[#2874F0] transition-colors">
              <div className="mx-auto h-16 w-16 bg-blue-50 text-[#2874F0] flex items-center justify-center rounded-full">
                <Percent className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Low Down Payment</h3>
              <p className="text-slate-600 font-medium">Start riding with down payments as low as 10% of the bike price.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border hover:border-[#2874F0] transition-colors">
              <div className="mx-auto h-16 w-16 bg-blue-50 text-[#2874F0] flex items-center justify-center rounded-full">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Flexible EMI Options</h3>
              <p className="text-slate-600 font-medium">Choose a tenure from 12 to 60 months that perfectly fits your budget.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border hover:border-[#2874F0] transition-colors">
              <div className="mx-auto h-16 w-16 bg-blue-50 text-[#2874F0] flex items-center justify-center rounded-full">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Transparent Processing</h3>
              <p className="text-slate-600 font-medium">No hidden charges. What you see on the calculator is what you pay.</p>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section className="bg-white py-20 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">Popular Financing Plans</h2>
              <p className="text-slate-600 mt-3 font-medium max-w-2xl mx-auto">
                Here is a quick look at estimated monthly payments for common loan amounts at 14% p.a.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <EmiExampleCard loanAmount={100000} />
              <EmiExampleCard loanAmount={140000} />
              <EmiExampleCard loanAmount={200000} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
