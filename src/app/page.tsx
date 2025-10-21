import DashboardClient from "@/components/dashboard-client";
import type { Feedback } from "@/lib/types";

async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const response = await fetch('https://feedback-ai-git-main-nefigarcias-projects.vercel.app/api/feedback', {
      cache: 'no-store', // Ensure we get fresh data on every request
    });
    
    if (!response.ok) {
      console.error("Failed to fetch feedback data:", response.statusText);
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
}

export default async function HomePage() {
  const feedbacks = await getFeedbacks();
  
  return (
    <DashboardClient initialFeedback={feedbacks} />
  );
}
