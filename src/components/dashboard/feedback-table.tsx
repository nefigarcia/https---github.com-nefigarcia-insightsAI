"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Feedback } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const getScoreBadgeVariant = (score: number | string) => {
  if (score === "N/A") return "default"; // neutral gray style for N/A
  if (score >= 8) return "success";
  if (score >= 5) return "default";
  return "destructive";
};

// Custom badge color variants
const badgeVariants = {
  success:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900",
  default:
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800",
  destructive:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900",
};

export function FeedbackTable({
  feedbacks,
  selectedFeedback,
  onSelectFeedback,
}: {
  feedbacks: Feedback[];
  selectedFeedback: Feedback | null;
  onSelectFeedback: (feedback: Feedback) => void;
}) {
  const displayScore = (score: number) => {
    // Convert 0 or null to N/A for display
    return score === 0 || score == null ? "N/A" : score;
  };

  return (
    <div className="relative w-full overflow-auto h-[450px]">
      <Table>
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead className="text-center">Doctor</TableHead>
            <TableHead className="text-center">Nurse</TableHead>
            <TableHead className="text-center">Hospital</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow
              key={feedback.id}
              className={cn(
                "cursor-pointer",
                selectedFeedback?.id === feedback.id && "bg-muted/50"
              )}
              onClick={() => onSelectFeedback(feedback)}
            >
              <TableCell className="max-w-[250px] truncate">
                {feedback.message}
              </TableCell>

              {/* Doctor */}
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    badgeVariants[
                      getScoreBadgeVariant(displayScore(feedback.doctor_score))
                    ]
                  )}
                >
                  {displayScore(feedback.doctor_score)}
                </Badge>
              </TableCell>

              {/* Nurse */}
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    badgeVariants[
                      getScoreBadgeVariant(displayScore(feedback.nurse_score))
                    ]
                  )}
                >
                  {displayScore(feedback.nurse_score)}
                </Badge>
              </TableCell>

              {/* Hospital */}
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    badgeVariants[
                      getScoreBadgeVariant(displayScore(feedback.hospital_score))
                    ]
                  )}
                >
                  {displayScore(feedback.hospital_score)}
                </Badge>
              </TableCell>

              <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                {format(new Date(feedback.created_at), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
