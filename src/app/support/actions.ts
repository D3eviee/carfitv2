'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSupportTicket(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;

    const html = `
    <h1>Nowe zgłoszenie od ${name}</h1>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tytuł:</strong> ${title}</p>
    <p><strong>Treść:</strong><br/>${message}</p>
  `

    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: ["hipolitroszkowski@protonmail.ch"],
            subject: `Support ticket from ${name}`,
            html
        })

        if (error) return { success: false, message: "There was a problem with sending your request!" }
        return { success: true, message: "Thank your for contatct. We will response ASAP" }
    }
    catch (error) {
        return { success: false, message: "There was a server problem. Please try later :/" }
    }
}