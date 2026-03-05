import Link from 'next/link';
import { type Order } from '../model/types';
import { CARGO_LABELS } from '../model/constants';

interface OrderCardProps {
  order: Order;
  onDelete: (id: string) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  const date = new Date(order.createdAt).toLocaleDateString('ru-RU');

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete(order.id);
  }

  return (
    <Link 
      href={`/orders/${order.id}`} 
      className="group relative bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="block pr-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {CARGO_LABELS[order.cargoType]}
          </span>
          <span className="text-xs text-slate-400 font-medium">{date}</span>
        </div>
        
        <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          {order.originCity} 
          <span className="text-slate-300 text-sm">→</span> 
          {order.destinationCity}
        </h4>
        
        <p className="text-sm text-slate-500 mt-1 italic">
          Получатель: <span className="text-slate-700 font-semibold not-italic">{order.receiverName}</span>
        </p>
      </div>
      
      <button 
        onClick={handleDelete}
        className="absolute top-5 right-5 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
        title="Удалить"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </Link>
  );
};