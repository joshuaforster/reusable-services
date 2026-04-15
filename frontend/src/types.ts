export type Application = {
  id: string;
  reference: string;
  address: string;
  postcode?: string;
  proposal?: string;
  letter_count: number;
  total_cost: number;
};

export type DashboardMetrics = {
  total_spend: number;
  total_letters: number;
};
