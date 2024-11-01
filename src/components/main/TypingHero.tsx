import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";

export async function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor="#5046e6" duration={0.5}>
        <p className="text-2xl font-semibold">
          Welcome to WebSpace<span className="text-[#1e1e1e]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor="#5046e6" duration={0.5}>
        <h2 className="text-base mt-2">
          Inspiring Connections, Empowering Creativity
        </h2>
      </BoxReveal>

      {/* <BoxReveal boxColor="#5046e6" duration={0.5}>
        <div className="text-sm mt-1">
          <p>
            &rarr; 20+ free and open-source animated components built with
            <span className="font-semibold text-[#5046e6]"> React</span>,
            <span className="font-semibold text-[#5046e6]"> Typescript</span>,
            <span className="font-semibold text-[#5046e6]"> Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#5046e6]"> Framer Motion</span>
            . <br />
            &rarr; 100% open-source, and customizable.
          </p>
        </div>
      </BoxReveal> */}

      <BoxReveal boxColor="#5046e6" duration={0.5}>
        <Button className="bg-[#5046e6] mt-4">Explore</Button>
      </BoxReveal>
    </div>
  );
}
