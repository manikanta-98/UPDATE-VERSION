export function calculateEMI(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;

  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function getStartingEMI(price: number | null): number | null {
  if (!price || price <= 0) return null;
  const downPayment = price * 0.2; // 20% default down payment
  const loanAmount = price - downPayment;
  return calculateEMI(loanAmount, 14, 60); // 14% interest, 60 months
}
