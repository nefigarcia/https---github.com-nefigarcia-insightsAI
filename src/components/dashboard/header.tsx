import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons";
import { FeedbackForm } from "@/components/dashboard/feedback-form";

export function DashboardHeader({ onNewFeedback }: { onNewFeedback: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <AppLogo className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold font-headline text-foreground">
          Feedback Insights
        </h1>
      </div>
      <div className="ml-auto">
        <FeedbackForm onNewFeedback={onNewFeedback}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Feedback
          </Button>
        </FeedbackForm>
      </div>
    </header>
  );
}
