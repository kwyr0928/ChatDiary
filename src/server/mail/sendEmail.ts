import { Resend } from 'resend';
import { EmailTemplate } from '~/components/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(mail: string, tokenId: string) {
  try {
    const url = "https://chat-diary.vercel.app/signup/complete?tokenId="+tokenId;
    const data = await resend.emails.send({
      from: 'diaryappwithai@peach-fi-zz.org',
      to: mail,
      subject: 'Hello world',
      react: EmailTemplate({ mail: mail, url: url }),
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
