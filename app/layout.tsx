import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://makasib.digital"),
  title: "مكاسب رقمية | منصة تمكين رقمي وتوجيه عملي",
  description: "منصة تمكين رقمي عربية تجمع بين المقالات التطبيقية، الأدوات المجانية، والمجتمع لتوجيه الشباب والمستقلين نحو مكاسب مالية ومهنية حقيقية.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "مكاسب رقمية",
    title: "مكاسب رقمية | منصة تمكين رقمي وتوجيه عملي",
    description: "منصة تمكين رقمي عربية تجمع بين المقالات التطبيقية، الأدوات المجانية، والمجتمع لتوجيه الشباب والمستقلين نحو مكاسب مالية ومهنية حقيقية.",
  },
  twitter: {
    card: "summary",
    title: "مكاسب رقمية",
    description: "منصة تمكين رقمي عربية تجمع بين المقالات التطبيقية، الأدوات المجانية، والمجتمع.",
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-3 focus:font-bold focus:text-slate-950"
          >
            تخطي إلى المحتوى الرئيسي
          </a>
          <NavbarWrapper />
          <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}