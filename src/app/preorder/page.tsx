import { isBookLaunched } from "@/lib/preorder";
import PreorderClient from "./PreorderClient";

// Re-render hourly so the wording switches on launch day without a redeploy.
export const revalidate = 3600;

export default function PreorderPage() {
  return <PreorderClient launched={isBookLaunched()} />;
}
