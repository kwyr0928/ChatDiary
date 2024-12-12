interface EmailTemplateProps {
  mail: string;
  token: string;
}

export const EmailTemplate = ({ mail, token }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {mail}!</h1>
    <a href={`http://localhost:3000/signup/complete?token=${token}`}>
    こちらのリンクをクリック</a>
  </div>
);
