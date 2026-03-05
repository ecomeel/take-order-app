interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_NAMES = ["Отправитель", "Посылка", "Подтверждение"];

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <div className="mb-10 px-2">
      <div className="flex items-center justify-between relative">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
                  ${isActive 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white border-slate-200 text-slate-400'}`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : stepNumber}
              </div>
              
              <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-wider transition-colors
                ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                {STEP_NAMES[index]}
              </span>
            </div>
          );
        })}

        <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-0">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};