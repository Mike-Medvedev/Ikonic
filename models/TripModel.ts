import { SimpleForm } from "./SimpleForm";

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

export interface NewTripForm {
  mountain: SimpleForm<string>;
  startDate: SimpleForm<Date | undefined>;
  endDate: SimpleForm<Date | undefined>;
  title: SimpleForm<string>;
}
