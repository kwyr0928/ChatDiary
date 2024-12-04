import { Resend } from 'resend';
import { EmailTemplate } from '~/components/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(mail: string) {
  try {
    const data = await resend.emails.send({
      from: 'diaryappwithai@peach-fi-zz.org',
      to: mail,
      subject: 'Hello world',
      react: EmailTemplate({ mail: mail }),
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
