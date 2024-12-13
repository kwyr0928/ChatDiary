interface EmailTemplateProps {
  mail: string;
  token: string;
}

export const EmailTemplate = ({ mail, token }: EmailTemplateProps) => (
  <div>
    <h1>ようこそ, {mail}さん!</h1>
    <p>ChatDiaryに登録いただきありがとうございます！以下のリンクより、メールアドレス登録をお願いします。</p>
    <p>リンクの有効期限は5分間です。リンクが切れていた場合、登録後の画面より「メールを再送」ボタンを押してください。</p>
    <a href={`${process.env.AUTH_URL}/signup/complete?token=${token}`}>こちらをクリックで認証</a>
    <br></br>
    <p>このメールアドレスは送信専用のため、返信は受け付けておりません。</p>
    <p>本メールに身に覚えの無い場合は、本メールを破棄していただきますようお願いいたします。</p>
  </div>
);
