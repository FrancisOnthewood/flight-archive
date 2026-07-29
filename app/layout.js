export const metadata = {
  title: "航迹 · Flight Atlas",
  description: "记录每一段飞行，点亮你的世界航迹。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, background: "#07111f" }}>{children}</body>
    </html>
  );
}
