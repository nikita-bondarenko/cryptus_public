import Icon from "@/components/helpers/Icon";
import clsx from "clsx";

interface ProgressBarProps {
  currentStep: number;
  isBackward?: boolean;
  totalSteps?: number;
}

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
  delay?: boolean;
}

const Step: React.FC<StepProps> = ({ isActive, isCompleted, delay }) => (
  <div
    className={clsx(
      "w-20 h-20 border-2 border-neutral-blue-100 rounded-full flex items-center justify-center relative shrink-0",
      {
        "bg-neutral-blue-100": isCompleted,
        "delay-500": delay,
      }
    )}
  >
    <Icon
      src="white-sign.svg"
      className={clsx(
        "w-10 h-10 opacity-0 top-5 center-x",
        {
          "[&]:opacity-100": isCompleted,
          "delay-500": delay,
        }
      )}
    />
  </div>
);

interface ProgressLineProps {
  currentStep: number;
  stepNumber: number;
  isBackward?: boolean;
}

const ProgressLine: React.FC<ProgressLineProps> = ({ currentStep, stepNumber, isBackward }) => {
  const getWidth = () => {
    if (currentStep < stepNumber) return "w-0";
    if (currentStep === stepNumber) return "w-26";
    return "w-52";
  };

  return (
    <div className="w-52 h-2 bg-neutral-gray-300 rounded-full relative">
      <div
        className={clsx(
          "h-2 bg-neutral-blue-100 rounded-full absolute top-0 left-0",
          {
            [getWidth()]: true,
            "delay-1000": isBackward && stepNumber === 1 || (!isBackward && stepNumber === 2 && currentStep !== 3),
          }
        )}
      />
    </div>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  isBackward = false,
  totalSteps = 4 
}) => {
  return (
    <div className="flex items-center gap-5 [&_*]:transition-all [&_*]:duration-500">
      <div className="w-20 h-20 rounded-full relative shrink-0 bg-neutral-blue-100">
        <Icon src="white-sign.svg" className="w-10 h-10 top-6 center-x" />
      </div>
      <ProgressLine currentStep={currentStep} stepNumber={1} isBackward={isBackward} />
      <Step isActive={currentStep >= 2} isCompleted={currentStep >= 2} delay />
      <ProgressLine currentStep={currentStep} stepNumber={2} isBackward={isBackward} />
      <Step isActive={currentStep >= 3} isCompleted={currentStep >= 3} delay />
    </div>
  );
}; 