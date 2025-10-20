"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Feedback } from "@/lib/types";

const formSchema = z.object({
  message: z.string().min(10, {
    message: "Feedback message must be at least 10 characters.",
  }).max(1000, {
    message: "Feedback message must not be longer than 1000 characters."
  }),
});

export function FeedbackForm({ children, onNewFeedback }: { children: ReactNode; onNewFeedback: (feedback: Feedback) => void; }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://feedback-ai-git-main-nefigarcias-projects.vercel.app/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: values.message }),
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong with the analysis.');
      }
      
      toast({
        title: "Analysis Complete",
        description: "Your feedback has been successfully analyzed and saved.",
      });

      // The backend POST returns the analysis, not the full DB object.
      // We pass a partial object to the parent, but can't fully add it to the list without a GET endpoint.
      const pseudoFeedback = {
        ...result.data,
        id: Date.now(),
        message: values.message,
        doctor_score: result.data.doctor,
        nurse_score: result.data.nurse,
        hospital_score: result.data.hospital,
        notes_analysis: result.data.notes,
        created_at: new Date().toISOString(),
      };
      onNewFeedback(pseudoFeedback);
      
      setOpen(false);
      form.reset();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Submit New Feedback</DialogTitle>
          <DialogDescription>
            Enter the patient's feedback message below. Our AI will analyze it and score the relevant parties.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'The doctor was amazing, but the hospital was a bit noisy...'"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze and Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
