import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Al Badar Impex | Premium Custom Sportswear & Apparel Manufacturer",
  description: "Al Badar Impex is a leading custom apparel manufacturer specializing in premium Activewear, Swimwear, Teamwear, and Streetwear. Low MOQs starting at 50 pcs.",
  keywords: "sportswear manufacturer, B2B athletic apparel, teamwear jersey factory, custom hoodies production, clothing supplier, textile manufacturing",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-neutral-850 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
