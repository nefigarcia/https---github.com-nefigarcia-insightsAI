"use client";

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import type { Feedback } from '@/lib/types';

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
    { name: "Doctor", score: parseFloat(averageScores.doctor.toFixed(1)), fill: "hsl(var(--chart-1))" },
    { name: "Nurse", score: parseFloat(averageScores.nurse.toFixed(1)), fill: "hsl(var(--chart-3))" },
    { name: "Hospital", score: parseFloat(averageScores.hospital.toFixed(1)), fill: "hsl(var(--chart-2))" },
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
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
          <Tooltip 
            cursor={{fill: 'hsl(var(--muted))'}}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
