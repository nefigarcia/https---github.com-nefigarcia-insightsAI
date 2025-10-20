"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Feedback } from "@/lib/types";
import { MessageSquareQuote, Info } from "lucide-react";

export function FeedbackDetailView({ feedback }: { feedback: Feedback | null }) {
  if (!feedback) {
    return (
      <Card className="flex h-full min-h-[300px] items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MessageSquareQuote className="mx-auto h-12 w-12" />
          <p className="mt-4">Select a feedback message to see its details.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Feedback Details</CardTitle>
        <CardDescription>Full analysis of the selected message.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Patient Message</h3>
              <p className="mt-1 text-sm italic">"{feedback.message}"</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">AI Notes Analysis</h3>
              <p className="mt-1 text-sm">{feedback.notes_analysis}</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
