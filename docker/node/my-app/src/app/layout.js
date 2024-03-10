import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "./_components/header/header";
import Form from "./_components/form/form";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "English Speak",
  description: "English Speak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className="bg-zinc-800">
      <StoreProvider>
        <body className={inter.className}>
          <Header />
          <main className="bg-zinc-800">
            <Form />
            {children}
          </main>
        </body>
      </StoreProvider>
    </html>
  );
}
