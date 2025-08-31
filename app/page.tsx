"use client";
import {
  IntroForm,
  introFormSchema,
  IntroSchema,
} from "@/components/form/intro";
import { InstructionsForm } from "@/components/form/instructions";
import {
  WorkingFormForm,
  workingFormSchema,
  WorkingFormSchema,
} from "@/components/form/working-form";
import {
  WeekendFormForm,
  weekendFormSchema,
  WeekendFormSchema,
} from "@/components/form/weekend-form";
import { FormResults } from "@/components/form/results";
import { FormFooter } from "@/components/form/footer";
import { useLocalStorage } from "@/lib/use-local-storage";
import { z } from "zod";
import { saveSurveyResults } from "@/lib/actions";

const schema = z.object({
  step: z.number(),
  intro: introFormSchema.optional(),
  working: workingFormSchema.optional(),
  weekend: weekendFormSchema.optional(),
});

export type FormState = z.infer<typeof schema>;

export default function Home() {
  const [data, setData] = useLocalStorage<FormState>(
    "inr-survey-form-state",
    {
      step: 1,
    },
    {
      step: 0,
    },
    schema
  );
  const onBack = () => {
    setData({ ...data, step: data.step - 1 });
    window.scrollTo(0, 0);
  };

  const handleIntroSubmit = (intro: IntroSchema) => {
    setData({ ...data, intro, step: data.step + 1 });
  };

  const handleInstructionsSubmit = () => {
    setData({ ...data, step: data.step + 1 });
  };

  const handleWorkingSubmit = (working: WorkingFormSchema) => {
    setData({
      ...data,
      working,
      step: data.step + 1,
    });
    window.scrollTo(0, 0);
  };

  const handleWeekendSubmit = (weekend: WeekendFormSchema) => {
    setData({ ...data, weekend, step: data.step + 1 });
    saveSurveyResults(data.intro!, data.working!, weekend);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setData({ step: 1 });
    window.scrollTo(0, 0);
  };

  return (
    <div className="container px-4 sm:max-w-3xl sm:mx-auto py-10">
      {data.step === 1 && (
        <IntroForm defaultValues={data.intro} handleSubmit={handleIntroSubmit}>
          <FormFooter step={data.step} onBack={onBack} />
        </IntroForm>
      )}
      {data.step === 2 && (
        <InstructionsForm handleSubmit={handleInstructionsSubmit}>
          <FormFooter step={data.step} onBack={onBack} />
        </InstructionsForm>
      )}
      {data.step === 3 && (
        <WorkingFormForm
          defaultValues={data.working}
          handleSubmit={handleWorkingSubmit}
        >
          <FormFooter step={data.step} onBack={onBack} />
        </WorkingFormForm>
      )}
      {data.step === 4 && (
        <WeekendFormForm
          defaultValues={data.weekend}
          handleSubmit={handleWeekendSubmit}
        >
          <FormFooter step={data.step} onBack={onBack} />
        </WeekendFormForm>
      )}
      {data.step === 5 && data.working && data.weekend && data.intro && (
        <FormResults
          email={data.intro.email}
          working={data.working}
          weekend={data.weekend}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
