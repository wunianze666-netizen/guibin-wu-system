import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人主页",
  description: "记录成长、项目、作品和生活片段的个人空间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
