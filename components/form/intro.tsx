"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const introFormSchema = z.object({
  email: z.string().min(1, { message: "El correo electrónico es requerido" }),
  gender: z.string().min(1, { message: "El género es requerido" }),
  age: z
    .number({ message: "La edad es requerida" })
    .int({ message: "La edad debe ser un número entero" })
    .min(1, { message: "La edad debe ser entre 1 y 150" })
    .max(150, { message: "La edad debe ser entre 1 y 150" }),
});

export type IntroSchema = z.infer<typeof introFormSchema>;

export function IntroForm({
  handleSubmit,
  defaultValues,
  children,
}: {
  handleSubmit: (data: IntroSchema) => void;
  defaultValues?: IntroSchema;
  children: React.ReactNode;
}) {
  const form = useForm<IntroSchema>({
    resolver: zodResolver(introFormSchema),
    defaultValues: defaultValues || {
      email: "",
      gender: "",
      age: "" as unknown as number,
    },
  });

  function onSubmit(values: IntroSchema) {
    handleSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Escriba un correo electrónico válido
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel required>Género</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {[
                    ["Masculino", "male"],
                    ["Femenino", "female"],
                    ["Otro", "other"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0 hover:cursor-pointer"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Edad</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
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
              <FormDescription>
                Especifica tu edad en años cumplidos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
