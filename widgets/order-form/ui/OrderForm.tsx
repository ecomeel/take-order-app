'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Stepper } from './Stepper';
import { 
  type Order,
  createOrder, 
  validateStep1, 
  validateStep2,
  orderStorage,
} from '@/entities/order';

export const OrderForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);
  const [data, setData] = useState<Partial<Order>>({ 
    cargoType: 'standard', 
    weight: 1 
  });

  const updateData = (fields: Partial<Order>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return validateStep1(data).isValid;
      case 2: return validateStep2(data).isValid;
      case 3: return isAgreed;
      default: return true;
    }
  };

  const handleFinish = () => {
    if (!isAgreed) return;

    const newOrder = createOrder(data)

    orderStorage.save(newOrder);
    router.push('/orders');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-lg mx-auto">
      <Stepper currentStep={step} totalSteps={3} />

      <div className="min-h-[350px]">
        {step === 1 && <Step1 data={data} update={updateData} />}
        {step === 2 && <Step2 data={data} update={updateData} />}
        {step === 3 && (
          <Step3 
            data={data} 
            isAgreed={isAgreed} 
            onAgreeChange={setIsAgreed} 
          />
        )}
      </div>

      <div className="flex gap-4 mt-10 pt-6 border-t border-slate-50">
        {step > 1 && (
          <Button 
            variant="secondary" 
            onClick={() => setStep(s => s - 1)} 
            className="flex-1"
          >
            Назад
          </Button>
        )}

        <Button 
          className="flex-[2]"
          disabled={!isStepValid()}
          onClick={step === 3 ? handleFinish : () => setStep(s => s + 1)}
        >
          { step === 3 ? "Оформить доставку" : "Далее" }
        </Button>
      </div>
    </div>
  );
};