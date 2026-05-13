import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Book Jeff Horwitz to speak at your school, conference, or podcast about UDL for early childhood.",
};

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
