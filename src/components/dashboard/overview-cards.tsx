"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartHandshake, Hospital, Star } from "lucide-react";
import type { Feedback } from '@/lib/types';

export function OverviewCards({ feedbacks }: { feedbacks: Feedback[] }) {
  const averageScores = useMemo(() => {
    if (feedbacks.length === 0) {
      return { doctor: 0, nurse: 0, hospital: 0, overall: 0 };
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

    const doctor = total.doctor / feedbacks.length;
    const nurse = total.nurse / feedbacks.length;
    const hospital = total.hospital / feedbacks.length;
    const overall = (doctor + nurse + hospital) / 3;

    return {
      doctor: parseFloat(doctor.toFixed(1)),
      nurse: parseFloat(nurse.toFixed(1)),
      hospital: parseFloat(hospital.toFixed(1)),
      overall: parseFloat(overall.toFixed(1))
    };
  }, [feedbacks]);

  const metrics = [
    {
      title: "Doctor Score",
      value: averageScores.doctor,
      icon: Stethoscope,
      color: "text-blue-500",
    },
    {
      title: "Nurse Score",
      value: averageScores.nurse,
      icon: HeartHandshake,
      color: "text-green-500",
    },
    {
      title: "Hospital Score",
      value: averageScores.hospital,
      icon: Hospital,
      color: "text-red-500",
    },
  ];

  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 text-muted-foreground ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              average out of 10
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
