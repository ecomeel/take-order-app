'use client';
import { Input } from '@/shared/ui/Input';
import { formatPhoneNumber } from '@/shared/lib/formatPhone';
import { useTouchedFields } from '@/shared/lib/useTouchedFields';
import { type Order, validateStep1 } from '@/entities/order';

export const Step1 = ({ data, update }: { data: Partial<Order>, update: (d: Partial<Order>) => void }) => {
  const {touch, isTouched} = useTouchedFields();
  const { errors } = validateStep1(data);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 18) {
      update({ senderPhone: formatted });
    }

    if (!isTouched("senderPhone")) {
      touch("senderPhone")
    };
  };

  const getError = (field: keyof typeof errors) => {
    return isTouched(field) ? errors[field] : undefined;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-900">Данные отправителя</h2>
      
      <Input 
        label="ФИО отправителя" 
        placeholder="Иван Иванов"
        value={data.senderName || ''} 
        onChange={e => {
          update({ senderName: e.target.value });
          if (!isTouched("senderName")) touch("senderName");
        }}
        onBlur={() => touch('senderName')}
        error={getError('senderName')}
      />

      <Input 
        label="Контактный телефон" 
        placeholder="+7 (___) ___-__-__"
        value={data.senderPhone || ''} 
        onChange={handlePhoneChange}
        onBlur={() => touch('senderPhone')}
        error={getError('senderPhone')}
      />

      <Input 
        label="Город отправления" 
        placeholder="Например, Москва"
        value={data.originCity || ''} 
        onChange={e => {
          update({ originCity: e.target.value });
          if (!isTouched("originCity")) touch("originCity");
        }}
        onBlur={() => touch('originCity')}
        error={getError('originCity')}
      />
    </div>
  );
};