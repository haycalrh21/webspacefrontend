// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ProviderSession from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import NavbarAvatar from "@/components/Navbars";
import QueryProviders from "@/components/QueryProvider";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Webspace",
  description: "  Inspiring Connections, Empowering Creativity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Script untuk set dark mode sebelum render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const darkMode = localStorage.getItem('darkMode') === 'true';
                document.documentElement.classList.toggle('dark', darkMode);
                if (darkMode) {
                  document.body.style.backgroundColor = '#1a1a1a'; // Warna latar belakang gelap
                  document.body.style.color = '#ffffff'; // Warna teks gelap
                } else {
                  document.body.style.backgroundColor = '#ffffff'; // Warna latar belakang terang
                  document.body.style.color = '#000000'; // Warna teks terang
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ProviderSession>
          <NavbarAvatar />
          <QueryProviders>
            <div className="w-full h-screen bg-background dark:bg-black text-foreground dark:text-white">
              <Toaster position="top-right" reverseOrder={false} />
              {children}
            </div>
          </QueryProviders>
        </ProviderSession>
      </body>
    </html>
  );
}
