import './globals.css';

export const metadata = {
  title: '经典电影',
  description: '经典电影浏览网站',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
