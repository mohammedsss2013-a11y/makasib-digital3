export interface FreelancePricingParams {
  targetIncome: number;
  fixedExpenses: number;
  hoursPerWeek: number;
  adminRatio: number;
  taxReserve: number;
}

export interface FreelancePricingResult {
  hourlyRateRecommended: number;
  hourlyRateMinimum: number;
  billableHoursMonth: number;
  totalMonthlyTarget: number;
}

export interface SavedToolRecord {
  id?: string;
  user_id?: string;
  category: string;
  tool_slug: string;
  tool_title: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}
