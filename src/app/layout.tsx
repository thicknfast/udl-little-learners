import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UDL for Little Learners — Resource Hub",
    template: "%s | UDL for Little Learners",
  },
  description:
    "Companion resources for UDL for Little Learners by Jeff Horwitz. Practical strategies for early childhood educators.",
  metadataBase: new URL("https://udlforlittlelearners.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-text antialiased">
        {children}
      </body>
    </html>
  );
}
