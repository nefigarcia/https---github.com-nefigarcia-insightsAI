"use client";

import { useState } from "react";
import type { Feedback } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/header";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ScoreDistributionChart } from "@/components/dashboard/score-distribution-chart";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { FeedbackDetailView } from "@/components/dashboard/feedback-detail-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardClient({ initialFeedback }: { initialFeedback: Feedback[] }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(initialFeedback[0] ?? null);

  const handleAddNewFeedback = (newFeedback: Feedback) => {
    // In a real app, you would likely re-fetch the list or add the new item.
    // Since the API doesn't return the full object, we'll just log it for now.
    console.log("New feedback received, consider refreshing the page to see it in the list.", newFeedback);
    // For a better UX without a GET endpoint, we could prepend a partial object,
    // but that would lead to inconsistent data.
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader onNewFeedback={handleAddNewFeedback} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <OverviewCards feedbacks={feedbacks} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 md:gap-8">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <FeedbackTable 
                feedbacks={feedbacks} 
                selectedFeedback={selectedFeedback}
                onSelectFeedback={setSelectedFeedback} 
              />
            </CardContent>
          </Card>
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Average Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreDistributionChart feedbacks={feedbacks} />
              </CardContent>
            </Card>
            <FeedbackDetailView feedback={selectedFeedback} />
          </div>
        </div>
      </main>
    </div>
  );
}
