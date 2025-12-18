'use client'

import MathScene from "../components/MathScene";
import { FunctionPlot } from "../components/FunctionPlot";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <MathScene>
        <FunctionPlot f={(x) => (x *x + 4 * x + 4)/(x * x + 4 * x - 4)} />
      </MathScene>
    </div>
  );
}