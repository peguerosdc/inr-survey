import { WeekendFormSchema } from "@/components/form/weekend-form";
import { WorkingFormSchema } from "@/components/form/working-form";

export function computeAverageHours(
  working: WorkingFormSchema,
  weekend: WeekendFormSchema
) {
  const weekdays =
    5 *
    (60 *
      (working.one.hours +
        working.two.hours +
        working.three.hours +
        working.four.hours) +
      (working.one.minutes +
        working.two.minutes +
        working.three.minutes +
        working.four.minutes));
  const weekends =
    2 *
    (60 *
      (weekend.five.hours +
        weekend.six.hours +
        weekend.seven.hours +
        weekend.eight.hours) +
      (weekend.five.minutes +
        weekend.six.minutes +
        weekend.seven.minutes +
        weekend.eight.minutes));
  const total = (weekdays + weekends) / 420;
  return total;
}

export function formatNumber(number: number) {
  return number.toFixed(0);
}
