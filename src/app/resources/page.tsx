import { getAllResources } from "@/lib/resources";
import { ResourcesClient } from "./ResourcesClient";
import type { Metadata } from "next";

// Re-render hourly so date-gated resources appear on launch day without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable guides, bonus chapters, templates, and activities for UDL for Little Learners.",
};

export default function ResourcesPage() {
  const resources = getAllResources();
  return <ResourcesClient resources={resources} />;
}
