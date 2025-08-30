"use client";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";

interface TimeInputProps<T extends FieldValues> {
  control: Control<T>;
  namePrefix: FieldPath<T>;
}

export const timeSchema = z.object({
  hours: z
    .number({ message: "Ingresa una cantidad de horas" })
    .min(0, { message: "Las horas debe ser entre 0 y 24" })
    .max(24, { message: "Las horas debe ser entre 0 y 24" }),
  minutes: z
    .number({ message: "Ingresa una cantidad de minutos" })
    .min(0, { message: "Las minutos debe ser entre 0 y 60" })
    .max(60, { message: "Las minutos debe ser entre 0 y 60" }),
});

export function TimeInput<T extends FieldValues>({
  control,
  namePrefix,
}: TimeInputProps<T>) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`${namePrefix}.hours` as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Horas</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : Number.parseInt(e.target.value, 10);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${namePrefix}.minutes` as FieldPath<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel required>Minutos</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : Number.parseInt(e.target.value, 10);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
