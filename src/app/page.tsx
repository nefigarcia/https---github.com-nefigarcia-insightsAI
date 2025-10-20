import DashboardClient from "@/components/dashboard-client";
import { feedbacks } from "@/lib/data";

export default function HomePage() {
  // In a real application, this data would be fetched from your API.
  // const feedbacks = await fetch('https://your-api-endpoint/feedback').then(res => res.json());
  
  return (
    <DashboardClient initialFeedback={feedbacks} />
  );
}
