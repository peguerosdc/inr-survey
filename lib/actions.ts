"use server";
import nodemailer from "nodemailer";
import { formatNumber } from "./results";

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
      text: `El tiempo promedio al día en conductas sedentarias es: ${formattedTotal} h/día`,
      html: `El tiempo promedio al día en conductas sedentarias es: <b>${formattedTotal} h/día</b>`,
    });
    console.log(info);

    return { success: true, data: info };
  } catch (error) {
    console.error("Error in sendSurveyResultsEmail:", error);
    return { success: false, error: "Failed to send email" };
  }
}
