import {
  integer,
  text,
  real,
  serial,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("fecha_creacion", { withTimezone: true }).notNull(),
  // intro
  gender: text("genero").notNull(),
  age: integer("edad").notNull(),
  // working
  one_hours: integer("uno_horas").notNull(),
  one_minutes: integer("uno_minutos").notNull(),
  two_hours: integer("dos_horas").notNull(),
  two_minutes: integer("dos_minutos").notNull(),
  three_hours: integer("tres_horas").notNull(),
  three_minutes: integer("tres_minutos").notNull(),
  four_hours: integer("cuatro_horas").notNull(),
  four_minutes: integer("cuatro_minutos").notNull(),
  // weekend
  five_hours: integer("cinco_horas").notNull(),
  five_minutes: integer("cinco_minutos").notNull(),
  six_hours: integer("seis_horas").notNull(),
  six_minutes: integer("seis_minutos").notNull(),
  seven_hours: integer("siete_horas").notNull(),
  seven_minutes: integer("siete_minutos").notNull(),
  eight_hours: integer("ocho_horas").notNull(),
  eight_minutes: integer("ocho_minutos").notNull(),
  // total
  average_hours: real("promedio_horas").notNull(),
});
