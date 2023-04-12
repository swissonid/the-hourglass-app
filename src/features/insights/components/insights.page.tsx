import { Center } from "@components/center";
import { CircularProgress } from "@components/circular-progress";
import { Container } from "@components/container";
import { PageContainer } from "@components/page-container";
import React, { Suspense } from "react";
import {
  calculateBillablePercentageUseCase,
  createDateRangeFromUntilTodayOrTo,
  getTotalOverTimeUseCase,
} from "../domain/use-cases";
import { BarChart } from "@/charts/bar-char";
//import "../glow.css";

function formatDate(date: Date) {
  // if date is today, return "Today"
  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export default async function InsightsPage() {
  return (
    <PageContainer>
      <div className="flex h-full flex-col">
        <Filter />
        <Center>
          {/* @ts-expect-error Async Server Component */}
          <Overview />
        </Center>
      </div>
    </PageContainer>
  );
}

const Filter = () => {
  return (
    <Container fullWidth={true}>
      <div className="flex flex-row gap-4">
        <input
          className="rounded-md bg-slate-900 p-2 align-middle text-white"
          type="date"
        />
        <input type="date" />
      </div>
    </Container>
  );
};

const Overview = async () => {
  const dateRange = createDateRangeFromUntilTodayOrTo(new Date("2023-02-01"));
  const overTime = await getTotalOverTimeUseCase(dateRange);
  const billablePercentage = await calculateBillablePercentageUseCase(
    dateRange
  );
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="text-center text-xl font-bold">
          Overview {formatDate(dateRange.from)} until {formatDate(dateRange.to)}
        </h2>
        <h3 className="text-center text-lg font-bold">{overTime} hours</h3>
        <div className="h-5" />
        <CircularProgress
          progress={billablePercentage}
          description="Billable"
        />

        <Suspense fallback={<div>Loading...</div>}>
          <BarChart data={[8.4, 9, 7.75, 6, 7, 0, 0]} />
        </Suspense>
      </div>
    </Container>
  );
};
