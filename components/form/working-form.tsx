"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TimeInput, timeSchema } from "./time-input";

export const workingFormSchema = z.object({
  one: timeSchema,
  two: timeSchema,
  three: timeSchema,
  four: timeSchema,
});

export type WorkingFormSchema = z.infer<typeof workingFormSchema>;

interface WorkingFormFormProps {
  handleSubmit: (data: WorkingFormSchema) => void;
  defaultValues?: WorkingFormSchema;
  children: React.ReactNode;
}

export function WorkingFormForm({
  handleSubmit,
  defaultValues,
  children,
}: WorkingFormFormProps) {
  const form = useForm<WorkingFormSchema>({
    resolver: zodResolver(workingFormSchema),
    defaultValues: defaultValues || {
      one: { hours: "" as unknown as number, minutes: "" as unknown as number },
      two: { hours: "" as unknown as number, minutes: "" as unknown as number },
      three: {
        hours: "" as unknown as number,
        minutes: "" as unknown as number,
      },
      four: {
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
          En un típico DÍA LABORABLE de la semana pasada, ¿cuánto tiempo pasó
          sentado o recostado y...
        </h1>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">
              1. Viendo la televisión o utilizando la computadora, tablet,
              teléfono celular o videojuegos en su tiempo libre. <br />
              Cuente el tiempo que pasó mirando televisión, videos, DVDs,
              jugando video juegos o en redes sociales.
            </h3>
            <TimeInput control={form.control} namePrefix="one" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              2. Sentado leyendo un libro o revista <br />
              Incluya solamente la lectura durante su tiempo libre (incluidos
              los formatos electrónicos). No incluya el tiempo dedicado a leer
              en el trabajo o en horas de clase.
            </h3>
            <TimeInput control={form.control} namePrefix="two" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              3. Sin considerar el tiempo especificado en las preguntas 1 y 2,
              ¿cuánto tiempo pasó, en general, sentado en un día laborable?
              <br />
              Incluya el tiempo que pasó sentado en la escuela, el trabajo o en
              el hogar, mientras realizaba las tareas habituales. Esto puede
              incluir el tiempo que pasó haciendo trabajo de oficina,
              manualidades (cocer, tejer, bordar, dibujar, etc.), conversando
              con amigos, leyendo o escribiendo.
            </h3>
            <TimeInput control={form.control} namePrefix="three" />
          </div>
          <div>
            <h3 className="font-medium mb-4">
              4. Cuánto tiempo empleó conduciendo o viajando en automóvil,
              autobús, metro o tren
            </h3>
            <TimeInput control={form.control} namePrefix="four" />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
}
