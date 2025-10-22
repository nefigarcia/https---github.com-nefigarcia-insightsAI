import DashboardClient from "@/components/dashboard-client";

export default function HomePage() {
  // In a static export, we can't fetch data on the server.
  // We pass an empty array and let the client component fetch the data.
  return (
    <DashboardClient initialFeedback={[]} />
  );
}
