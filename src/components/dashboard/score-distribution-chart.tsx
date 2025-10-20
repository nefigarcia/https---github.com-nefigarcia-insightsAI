"use client";

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Feedback } from '@/lib/types';

const chartConfig = {
  score: {
    label: "Score",
  },
  doctor: {
    label: "Doctor",
    color: "hsl(var(--chart-1))",
  },
  nurse: {
    label: "Nurse",
    color: "hsl(var(--chart-3))",
  },
  hospital: {
    label: "Hospital",
    color: "hsl(var(--chart-2))",
  },
};

export function ScoreDistributionChart({ feedbacks }: { feedbacks: Feedback[] }) {
  const averageScores = useMemo(() => {
    if (feedbacks.length === 0) {
      return { doctor: 0, nurse: 0, hospital: 0 };
    }

    const total = feedbacks.reduce(
      (acc, curr) => {
        acc.doctor += curr.doctor_score;
        acc.nurse += curr.nurse_score;
        acc.hospital += curr.hospital_score;
        return acc;
      },
      { doctor: 0, nurse: 0, hospital: 0 }
    );

    return {
      doctor: total.doctor / feedbacks.length,
      nurse: total.nurse / feedbacks.length,
      hospital: total.hospital / feedbacks.length,
    };
  }, [feedbacks]);

  const chartData = [
    { name: "Doctor", score: parseFloat(averageScores.doctor.toFixed(1)), fill: "var(--color-doctor)" },
    { name: "Nurse", score: parseFloat(averageScores.nurse.toFixed(1)), fill: "var(--color-nurse)" },
    { name: "Hospital", score: parseFloat(averageScores.hospital.toFixed(1)), fill: "var(--color-hospital)" },
  ];

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 10]}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip 
          cursor={{fill: 'hsl(var(--muted))'}}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="score" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
