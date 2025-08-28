import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "@/components/ui/accordion";
import React from "react";
import { twMerge } from "tailwind-merge";

type AccordionProps = Omit<
  React.ComponentProps<typeof ShadcnAccordion>,
  "defaultValue" | "type" | "collapsible" | "value" | "onValueChange"
> & {
  trigger: React.ReactNode;
  collapsible?: boolean;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, trigger, collapsible = true, ...props }, ref) => (
    <ShadcnAccordion
      {...props}
      ref={ref}
      collapsible={collapsible}
      type="single"
      defaultValue="accordion-item"
      className={twMerge("mb-4", className)}
    >
      <AccordionItem value="accordion-item" className="border-zinc-800">
        <AccordionTrigger
          className="p-0 pb-3 hover:no-underline"
          chevronClassName="text-zinc-500 w-5 h-5"
        >
          {trigger}
        </AccordionTrigger>
        <AccordionContent className="pb-0">{children}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  )
);

Accordion.displayName = "Accordion";

export { Accordion };
