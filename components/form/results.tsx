import { WeekendFormSchema } from "./weekend-form";
import { WorkingFormSchema } from "./working-form";
import { Button } from "../ui/button";

interface FormResultsProps {
  working: WorkingFormSchema;
  weekend: WeekendFormSchema;
  onReset?: () => void;
}

export function FormResults({ working, weekend, onReset }: FormResultsProps) {
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
    5 *
      (weekend.five.minutes +
        weekend.six.minutes +
        weekend.seven.minutes +
        weekend.eight.minutes);
  const total = (weekdays + weekends) / 420;
  return (
    <div className="container px-4 sm:max-w-3xl sm:mx-auto py-10 flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-center">
          El tiempo promedio al día en conductas sedentarias es:
        </p>
        <p className="text-2xl font-bold text-center">
          {total.toFixed(2)} h/dia
        </p>
        <p>
          Ubica en que nivel del semáforo mostrado en el cartel, te encuentras y
          da click en el botón enviar.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Button>Enviar</Button>
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Volver a empezar
          </Button>
        )}
      </div>
    </div>
  );
}
