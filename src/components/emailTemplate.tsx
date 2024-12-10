interface EmailTemplateProps {
  mail: string;
  url: string;
}

export const EmailTemplate = ({ mail, url }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {mail}!</h1>
    <p>{url}</p>
  </div>
);
