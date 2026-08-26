export interface ContractData {
  freelancerName: string;
  clientName: string;
  projectTitle: string;
  totalFee: number;
  advancePercent: number;
  deliveryDays: number;
}

export interface ContractFinancialSummary {
  advanceAmount: number;
  remainingAmount: number;
}
