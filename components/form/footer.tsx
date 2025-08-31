import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface FormFooterProps {
  step: number;
  onBack: () => void;
}

export function FormFooter({ step, onBack }: FormFooterProps) {
  return (
    <div
      className={cn(
        "w-full flex justify-between",
        step === 1 && "flex-row-reverse"
      )}
    >
      {step > 1 && (
        <Button type="button" variant="outline" onClick={onBack}>
          Anterior
        </Button>
      )}
      <Button type="submit">Continuar</Button>
    </div>
  );
}
