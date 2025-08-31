import { WeekendFormSchema } from "./weekend-form";
import { WorkingFormSchema } from "./working-form";
import { Button } from "../ui/button";
import { sendSurveyResultsEmail } from "@/lib/actions";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";
import { z } from "zod";
import { computeAverageHours } from "@/lib/results";

interface FormResultsProps {
  email: string;
  working: WorkingFormSchema;
  weekend: WeekendFormSchema;
  onReset: () => void;
}

export function FormResults({
  working,
  weekend,
  onReset,
  email,
}: FormResultsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Track if email has been successfully sent using localStorage
  const [emailSent, setEmailSent] = useLocalStorage(
    "survey-email-sent",
    false,
    false,
    z.boolean()
  );

  const total = computeAverageHours(working, weekend);

  const onSend = () => {
    startTransition(async () => {
      const { error } = await sendSurveyResultsEmail(email, total);
      if (error) {
        setError(error);
      } else {
        setEmailSent(true);
      }
    });
  };

  const handleReset = () => {
    setEmailSent(false);
    onReset?.();
  };

  return (
    <div className="container px-4 sm:max-w-3xl sm:mx-auto py-10 flex flex-col">
      <div className="flex flex-col gap-4 text-center">
        <p>El tiempo promedio al día en conductas sedentarias es:</p>
        <p className="text-2xl font-bold">{total.toFixed(2)} h/dia</p>
        <p>
          Ubica en que nivel del semáforo mostrado en el cartel te encuentras
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {!emailSent && (
          <Button onClick={onSend} disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar resultados por correo"
            )}
          </Button>
        )}
        {emailSent && (
          <p className="text-center text-green-600 font-medium">
            ✅ Resultados enviados por correo
          </p>
        )}
        <Button variant="outline" onClick={handleReset} disabled={isPending}>
          Volver a empezar
        </Button>
        {error && (
          <p className="text-center text-red-600 font-medium">
            No pudimos enviar el correo, por favor intenta nuevamente.
          </p>
        )}
      </div>
    </div>
  );
}
