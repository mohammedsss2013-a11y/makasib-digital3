import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://makasib.digital"),
  title: "مكاسب رقمية | منصة الأدوات التفاعلية والدلائل الإجرائية",
  description: "أدوات تفاعلية حية لتطوير الأعمال والتكنولوجيا والنمط الرقمي.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "مكاسب رقمية",
    title: "مكاسب رقمية | منصة الأدوات التفاعلية والدلائل الإجرائية",
    description: "أدوات تفاعلية حية لتطوير الأعمال والتكنولوجيا والنمط الرقمي.",
  },
  twitter: {
    card: "summary",
    title: "مكاسب رقمية",
    description: "منصة الأدوات التفاعلية والدلائل الإجرائية.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NavbarWrapper />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}