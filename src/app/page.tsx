import { Scaffold } from "@components/scaffold";
import { InsightsPage } from "@/features/insights";
import { Center } from "@components/center";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Scaffold>
        {/* @ts-expect-error*/}
        <InsightsPage />
      </Scaffold>
    </div>
  );
}
