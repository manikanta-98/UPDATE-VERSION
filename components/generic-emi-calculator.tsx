"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"
import { calculateEMI } from "@/lib/emi"

export function GenericEmiCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number | "">(140000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [interestRate, setInterestRate] = useState(14)
  const [tenure, setTenure] = useState(60)

  const price = typeof vehiclePrice === "number" ? vehiclePrice : 0
  const downPayment = Math.round((price * downPaymentPercent) / 100)
  const loanAmount = Math.max(0, price - downPayment)
  const emi = calculateEMI(loanAmount, interestRate, tenure)

  const handleApplyFinance = () => {
    const message = `Hi, I am interested in bike finance.\nLoan Amount: ₹${loanAmount.toLocaleString("en-IN")}\nDown Payment: ₹${downPayment.toLocaleString("en-IN")}\nTenure: ${tenure} Months\nExpected EMI: ₹${emi.toLocaleString("en-IN")}/month`
    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Card className="shadow-xl border-t-4 border-t-[#2874F0] rounded-xl overflow-hidden bg-white max-w-2xl mx-auto">
      <CardHeader className="bg-slate-50/80 pb-6 border-b">
        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-800">
          <Calculator className="h-7 w-7 text-[#2874F0]" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        
        {/* Sliders / Inputs */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-slate-600 font-semibold text-base">Vehicle Price (₹)</Label>
            <Input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value ? Number(e.target.value) : "")}
              className="text-lg font-semibold border-slate-300 focus-visible:ring-[#2874F0]"
              placeholder="Enter vehicle price"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold text-base">Down Payment</Label>
              <span className="font-bold text-[#2874F0] text-lg">₹ {downPayment.toLocaleString("en-IN")} ({downPaymentPercent}%)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#2874F0] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold text-base">Interest Rate (p.a.)</Label>
              <span className="font-bold text-[#2874F0] text-lg">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#2874F0] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold text-base">Tenure (Months)</Label>
            </div>
            <div className="grid grid-cols-5 gap-3 pt-1">
              {[12, 24, 36, 48, 60].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`py-3 text-sm font-bold rounded-lg border-2 transition-all ${
                    tenure === t
                      ? "bg-[#2874F0] text-white border-[#2874F0] shadow-md transform scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#2874F0] hover:text-[#2874F0]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border-2 flex justify-between items-center shadow-inner">
          <div>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Monthly EMI</p>
            <p className="text-4xl font-black text-[#2874F0]">₹ {emi.toLocaleString("en-IN")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Loan Amount</p>
            <p className="text-2xl font-bold text-slate-700">₹ {loanAmount.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Button 
          onClick={handleApplyFinance}
          className="w-full bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold py-7 text-xl shadow-lg hover:shadow-xl transition-all rounded-xl"
        >
          Apply for Finance
        </Button>
      </CardContent>
    </Card>
  )
}
