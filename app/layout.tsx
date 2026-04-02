import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kishore V — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer at BIZZZUP building RAG pipelines, LLM integrations, and automation systems. Full-stack developer based in Chennai, India.",
  keywords: [
    "AI Engineer",
    "RAG",
    "LLM",
    "Full Stack Developer",
    "Chennai",
    "Next.js",
    "NestJS",
    "Python",
  ],
  alternates: {
    canonical: "https://kishore.dev",
  },
  openGraph: {
    title: "Kishore V — AI Engineer",
    description:
      "Building intelligent systems with RAG, LLM integrations, and automation.",
    url: "https://kishore.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishore V — AI Engineer",
    description:
      "Building RAG pipelines, LLM integrations, and automation systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${ibmPlex.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
