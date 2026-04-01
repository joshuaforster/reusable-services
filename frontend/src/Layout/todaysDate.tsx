import {format} from "date-fns";

export default function TodaysDate() {
  const today = new Date()
  const todaysDate = format(today, "EEEE do MMMM yyyy");
  return todaysDate;
}
