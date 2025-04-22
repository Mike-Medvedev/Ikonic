import { SimpleForm } from "./SimpleForm";
import { TripUpdate } from "@/client";

export interface NewTripForm {
  mountain: SimpleForm<string>;
  startDate: SimpleForm<Date | undefined>;
  endDate: SimpleForm<Date | undefined>;
  title: SimpleForm<string>;
}

export type UpdateTripMutation = {
  currentTripId: number;
  form: TripUpdate;
};
