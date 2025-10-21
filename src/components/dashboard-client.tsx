"use client";

import { useState, useCallback } from "react";
import type { Feedback } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard/header";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ScoreDistributionChart } from "@/components/dashboard/score-distribution-chart";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { FeedbackDetailView } from "@/components/dashboard/feedback-detail-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function DashboardClient({ initialFeedback }: { initialFeedback: Feedback[] }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(initialFeedback[0] ?? null);
  const { toast } = useToast();

  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await fetch('https://feedback-ai-git-main-nefigarcias-projects.vercel.app/api/feedback/list', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch feedback.');
      }
      const result = await response.json();
      const newFeedbacks = result.data || [];
      setFeedbacks(newFeedbacks);
      
      // If a feedback was selected, try to find it in the new list. Otherwise, select the first one.
      const currentlySelectedId = selectedFeedback?.id;
      if (currentlySelectedId) {
        const reselected = newFeedbacks.find((f: Feedback) => f.id === currentlySelectedId);
        setSelectedFeedback(reselected || newFeedbacks[0] || null);
      } else {
        setSelectedFeedback(newFeedbacks[0] || null);
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Could not refresh data.",
        description: error instanceof Error ? error.message : "There was a problem fetching the latest feedback.",
      });
    }
  }, [toast, selectedFeedback?.id]);

  const handleAddNewFeedback = () => {
    // After a new feedback is added via the form, re-fetch the entire list
    fetchFeedbacks();
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
