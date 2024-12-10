interface EmailTemplateProps {
  mail: string;
}

export const EmailTemplate = ({ mail }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {mail}!</h1>
    <a href={`http://localhost:3000/signup/complete?email=${mail}`}>
    </a>
  </div>
);
