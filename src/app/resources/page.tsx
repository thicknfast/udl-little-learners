import { getAllResources } from "@/lib/resources";
import { ResourcesClient } from "./ResourcesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Downloadable guides, bonus chapters, templates, and activities for UDL for Little Learners.",
};

export default function ResourcesPage() {
  const resources = getAllResources();
  return <ResourcesClient resources={resources} />;
}
