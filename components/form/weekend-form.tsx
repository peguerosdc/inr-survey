"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TimeInput, timeSchema } from "./time-input";

export const weekendFormSchema = z.object({
  five: timeSchema,
  six: timeSchema,
  seven: timeSchema,
  eight: timeSchema,
});

export type WeekendFormSchema = z.infer<typeof weekendFormSchema>;

interface WeekendFormFormProps {
  handleSubmit: (data: WeekendFormSchema) => void;
  defaultValues?: WeekendFormSchema;
  children: React.ReactNode;
}

export function WeekendFormForm({
  handleSubmit,
  defaultValues,
  children,
}: WeekendFormFormProps) {
  const form = useForm<WeekendFormSchema>({
    resolver: zodResolver(weekendFormSchema),
    defaultValues: defaultValues || {
      five: {
        hours: "" as unknown as number,
        minutes: "" as unknown as number,
      },
      six: { hours: "" as unknown as number, minutes: "" as unknown as number },
      seven: {
        hours: "" as unknown as number,
        minutes: "" as unknown as number,
      },
      eight: {
        hours: "" as unknown as number,
        minutes: "" as unknown as number,
      },
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full"
      >
        <h1 className="text-2xl font-bold">
          En un típico DIA de FIN DE SEMANA, ¿cuánto tiempo pasó sentado o
          recostado y...
        </h1>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">
              5. Viendo la televisión o utilizando la computadora, tablet,
              teléfono celular o videojuegos. <br />
              Cuente el tiempo que pasó mirando televisión, videos, DVDs,
              jugando video juegos o en redes sociales.
            </h3>
            <TimeInput control={form.control} namePrefix="five" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              6. Sentado leyendo un libro o revista. <br />
              Incluídos los formatos electrónicos
            </h3>
            <TimeInput control={form.control} namePrefix="six" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              7. Sin considerar el tiempo especificado en las preguntas 5 y 6,
              ¿Cuánto tiempo pasó, en general, sentado en un día de fin de
              semana? <br />
              Incluya el tiempo que pasó sentado mientras realizaba las tareas
              habituales
            </h3>
            <TimeInput control={form.control} namePrefix="seven" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              8. ¿Cuánto tiempo empleó conduciendo o viajando en automóvil,
              autobús, metro o tren?
            </h3>
            <TimeInput control={form.control} namePrefix="eight" />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
}
