import { WeekendFormSchema } from "@/components/form/weekend-form";
import { WorkingFormSchema } from "@/components/form/working-form";

export function computeAverageHours(
  working: WorkingFormSchema,
  weekend: WeekendFormSchema
) {
  const weekdays =
    60 *
      (working.one.hours +
        working.two.hours +
        working.three.hours +
        working.four.hours) +
    5 *
      (working.one.minutes +
        working.two.minutes +
        working.three.minutes +
        working.four.minutes);
  const weekends =
    60 *
      (weekend.five.hours +
        weekend.six.hours +
        weekend.seven.hours +
        weekend.eight.hours) +
    2 *
      (weekend.five.minutes +
        weekend.six.minutes +
        weekend.seven.minutes +
        weekend.eight.minutes);
  const total = (weekdays + weekends) / 420;
  return total;
}
