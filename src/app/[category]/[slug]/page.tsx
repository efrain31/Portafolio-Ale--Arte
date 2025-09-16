"use client";

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

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;

  const SectionRoutes = routesMap[category.toLowerCase()];
  const Component = SectionRoutes ? SectionRoutes[normalizeSlug(slug)] : null;

  if (!Component) return notFound();

  return <Component />;
}
