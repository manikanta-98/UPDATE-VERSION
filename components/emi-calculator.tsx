"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"
import { calculateEMI } from "@/lib/emi"

interface EmiCalculatorProps {
  bikePrice: number
  bikeModel: string
}

export function EmiCalculator({ bikePrice, bikeModel }: EmiCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [interestRate, setInterestRate] = useState(14)
  const [tenure, setTenure] = useState(60)
  
  const downPayment = Math.round((bikePrice * downPaymentPercent) / 100)
  const loanAmount = bikePrice - downPayment
  const emi = calculateEMI(loanAmount, interestRate, tenure)
  
  const handleApplyFinance = () => {
    const message = `Hi! I'm interested in financing the ${bikeModel}. Expected down payment: ₹${downPayment.toLocaleString("en-IN")}, Tenure: ${tenure} months. Please share more details.`
    const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Card className="shadow-lg border-t-4 border-t-[#0055A5] rounded-xl overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 pb-4 border-b">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
          <Calculator className="h-5 w-5 text-[#0055A5]" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        {/* Sliders / Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold">Down Payment</Label>
              <span className="font-bold text-[#0055A5]">₹ {downPayment.toLocaleString("en-IN")} ({downPaymentPercent}%)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#0055A5]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold">Interest Rate (p.a.)</Label>
              <span className="font-bold text-[#0055A5]">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#0055A5]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-600 font-semibold">Tenure (Months)</Label>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[12, 24, 36, 48, 60].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`py-2 text-xs font-semibold rounded-md border transition-all ${
                    tenure === t
                      ? "bg-[#0055A5] text-white border-[#0055A5] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#0055A5] hover:text-[#0055A5]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-xl p-4 border flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Monthly EMI</p>
            <p className="text-3xl font-extrabold text-[#0055A5]">₹ {emi.toLocaleString("en-IN")}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Loan Amount</p>
            <p className="text-lg font-bold text-slate-700">₹ {loanAmount.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <Button 
          onClick={handleApplyFinance}
          className="w-full bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold py-6 text-lg shadow-md hover:shadow-lg transition-all"
        >
          Apply for Finance
        </Button>
      </CardContent>
    </Card>
  )
}
