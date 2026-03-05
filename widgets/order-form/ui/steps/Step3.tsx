import { type Order, CARGO_LABELS } from '@/entities/order';

interface Step3Props {
  data: Partial<Order>;
  isAgreed: boolean;
  onAgreeChange: (value: boolean) => void;
}

export const Step3 = ({ data, isAgreed, onAgreeChange }: Step3Props) => (
  <div className="space-y-6 animate-in fade-in duration-300">
    <h2 className="text-2xl font-bold text-slate-900">Проверьте данные</h2>
    
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
      <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
        <span className="text-slate-500">Откуда:</span>
        <span className="font-semibold text-slate-900">{data.originCity}</span>
      </div>
      <div className="flex justify-between border-b border-slate-200 pb-2 text-sm">
        <span className="text-slate-500">Куда:</span>
        <span className="font-semibold text-slate-900">{data.destinationCity}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">Груз:</span>
        <span className="font-semibold text-slate-900">
          {CARGO_LABELS[data.cargoType!]}, {data.weight} кг
        </span>
      </div>
    </div>

    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-transparent hover:bg-slate-50 transition-colors">
      <input 
        type="checkbox" 
        checked={isAgreed}
        onChange={(e) => onAgreeChange(e.target.checked)}
        className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer" 
      />
      <span className="text-sm text-slate-600 leading-snug">
        Я подтверждаю правильность введённых данных и принимаю условия публичной оферты
      </span>
    </label>
    
    {!isAgreed && (
      <p className="text-[11px] text-red-400 text-center animate-pulse">
        Для завершения необходимо принять условия
      </p>
    )}
  </div>
);