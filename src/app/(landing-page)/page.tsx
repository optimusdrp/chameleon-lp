import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { OptimusAIAssistant } from "@/components/OptimusAIAssistant";
import { Solutions } from "@/components/Solutions";
import { TechStack } from "@/components/TechStack";
import { TransformationMatrix } from "@/components/TransformationMatrix";
import { ConsoleExecution } from "@/components/v2/ConsoleExecution";
import { ContactFormV2 } from "@/components/v2/ContactFormV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { PerformanceBenchmark } from "@/components/v2/PerformanceBenchmark";
import { WorkflowBuilderV2 } from "@/components/v2/WorkflowBuilder";

export default async function LandingPage() {

  return (
    <main>
      <HeroV2 />
      <div id="workflow">
        <WorkflowBuilderV2 />
      </div>
      <div id="console">
        <ConsoleExecution />
      </div>
      <div id="benchmark">
        <PerformanceBenchmark />
      </div>
      <ContactFormV2 />
      <OptimusAIAssistant />
    </main>
  );
}