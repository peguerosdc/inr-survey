"use server";
import nodemailer from "nodemailer";
import { computeAverageHours, formatNumber } from "./results";
import { db } from "./db/drizzle";
import { results } from "./db/schema";
import { sql } from "drizzle-orm";
import { IntroSchema } from "@/components/form/intro";
import { WorkingFormSchema } from "@/components/form/working-form";
import { WeekendFormSchema } from "@/components/form/weekend-form";

const privacyPolicy = `Aviso de Privacidad: Conforme a lo establecido en la Ley General de Transparencia y Acceso a la Información Pública en su artículo 4° y la Ley Federal de Transparencia y Acceso a la Información Pública en su artículo 3°, este mensaje electrónico y cualquier archivo adjunto al mismo es considerado como información privilegiada y excepcionalmente podrá clasificarse como información confidencial y/o reservada. Este mensaje es para uso exclusivo del destinatario, por lo que su contenido no podrá divulgarse, distribuirse y/o difundirse por ningún medio sin la previa autorización del emisor. Si usted no es el destinatario a quien fue enviado, se le prohíbe: utilizar total o parcialmente el contenido, retransmitirlo, distribuirlo, copiarlo o realizar ningún acto con base en su contenido. Si ha recibido este correo electrónico por error, le agradecemos informar de inmediato al remitente mediante un correo de respuesta, y borrar este mensaje de forma permanente junto a cualquier copia digital o impresa, así como cualquier archivo adjunto al mismo.`;

export async function sendSurveyResultsEmail(email: string, total: number) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
    const formattedTotal = formatNumber(total);

    const info = await transporter.sendMail({
      from: `"Encuesta INR" <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: "Resultados de tu Encuesta INR",
      text: `El tiempo promedio al día en conductas sedentarias es: ${formattedTotal} h/día\n\n${privacyPolicy}`,
      html: `El tiempo promedio al día en conductas sedentarias es: <b>${formattedTotal} h/día</b><br/><p style="color: #777777;">${privacyPolicy}</p>`,
    });
    console.log(info);

    return { success: true, data: info };
  } catch (error) {
    console.error("Error in sendSurveyResultsEmail:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function saveSurveyResults(
  intro: IntroSchema,
  working: WorkingFormSchema,
  weekend: WeekendFormSchema
) {
  try {
    await db.insert(results).values({
      gender: intro.gender,
      age: intro.age,
      one_hours: working.one.hours,
      one_minutes: working.one.minutes,
      two_hours: working.two.hours,
      two_minutes: working.two.minutes,
      three_hours: working.three.hours,
      three_minutes: working.three.minutes,
      four_hours: working.four.hours,
      four_minutes: working.four.minutes,
      five_hours: weekend.five.hours,
      five_minutes: weekend.five.minutes,
      six_hours: weekend.six.hours,
      six_minutes: weekend.six.minutes,
      seven_hours: weekend.seven.hours,
      seven_minutes: weekend.seven.minutes,
      eight_hours: weekend.eight.hours,
      eight_minutes: weekend.eight.minutes,
      average_hours: computeAverageHours(working, weekend),
      createdAt: sql`now() AT TIME ZONE 'America/Mexico_City'`,
    });
    return { success: true };
  } catch (error) {
    console.error(
      "saveSurveyResults! => ",
      error,
      "intro: ",
      intro,
      "working: ",
      working,
      "weekend: ",
      weekend
    );
    return { success: false };
  }
}
