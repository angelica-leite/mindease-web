import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "MindEase",
  description: "Organize suas tarefas com calma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
