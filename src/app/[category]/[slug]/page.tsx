import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routesMap } from "@/data/routes";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const normalizeSlug = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[()&]/g, "").replace(/--+/g, "-");

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = `${slugToTitle(slug)} | Ale Vazquez`;
  return {
    title,
    openGraph: { title },
  };
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;

  const sectionRoutes = routesMap[category.toLowerCase()];
  const Component = sectionRoutes ? sectionRoutes[normalizeSlug(slug)] : null;

  if (!Component) return notFound();

  return <Component />;
}
