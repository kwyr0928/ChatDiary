interface EmailTemplateProps {
  mail: string;
  url: string;
}

export const EmailTemplate = ({ mail, url }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {mail}!</h1>
    <a href={`http://localhost:3000/signup/complete?email=${mail}`}>
    </a>
  </div>
);
