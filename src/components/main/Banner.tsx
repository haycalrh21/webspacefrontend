import Meteors from "@/components/ui/meteors";
import { BoxRevealDemo } from "./TypingHero";

export function MeteorDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-black dark:border-white">
      <Meteors number={30} />
      <span className="">
        <BoxRevealDemo />
      </span>
    </div>
  );
}
