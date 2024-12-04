interface EmailTemplateProps {
  mail: string;
}

export const EmailTemplate = ({ mail }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {mail}!</h1>
  </div>
);
