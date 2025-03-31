export interface Trip {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  mountain: string;
  owner: string;
  image?: string;
  desc?: string;
  total_cost?: string;
}
