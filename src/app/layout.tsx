import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "吴贵宾个人主页",
  description: "明亮、清爽、持续生长的个人空间",
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
