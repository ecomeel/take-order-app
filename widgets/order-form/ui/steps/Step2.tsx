import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { useTouchedFields } from '@/shared/lib/useTouchedFields';
import { type Order, validateStep2 } from '@/entities/order';

export const Step2 = ({ data, update }: { data: Partial<Order>, update: (d: Partial<Order>) => void }) => {
  const { touch, isTouched } = useTouchedFields();
  const { errors } = validateStep2(data);

  const getError = (field: keyof typeof errors) => {
    return isTouched(field) ? errors[field] : undefined;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-900">Детали посылки</h2>
      <Input 
        label="ФИО получателя"
        placeholder="Иван Иванов"
        value={data.receiverName || ''} 
        onChange={e => {
          update({ receiverName: e.target.value });
          if (!isTouched("receiverName")) touch("receiverName");
        }} 
        onBlur={() => touch('receiverName')}
        error={getError('receiverName')}
      />
      <Input 
        label="Город назначения" 
        placeholder="Москва"
        value={data.destinationCity || ''} 
        onChange={e => {
          update({ destinationCity: e.target.value });
          if (!isTouched("destinationCity")) touch("destinationCity");
        }}
        error={getError("destinationCity")}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select 
          label="Тип груза" 
          value={data.cargoType}
          onChange={e => update({ cargoType: e.target.value as any })}
          options={[
            { label: 'Обычный', value: 'standard' },
            { label: 'Документы', value: 'documents' },
            { label: 'Хрупкое', value: 'fragile' },
          ]}
        />
        <Input 
          label="Вес (кг)" 
          type="number"
          value={data.weight || ''} 
          onChange={e => update({ weight: Number(e.target.value) })}
          error={getError("weight")}
        />
      </div>
    </div>
  );
};