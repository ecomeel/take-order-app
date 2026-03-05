'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Order } from '@/entities/order/model/types';
import { storage } from '@/shared/lib/storage';
import { Button } from '@/shared/ui/Button';
import { CARGO_LABELS } from '@/entities/order';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = storage.get<Order[]>('orders', []);
    const found = orders.find(o => o.id === id);
    if (found) setOrder(found);
  }, [id]);

  if (!order) return <div className="p-10 text-center">Загрузка...</div>;

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        ← Вернуться к списку
      </Button>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 p-8 text-white">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">Заявка #{order.id.slice(0, 8)}</p>
          <h1 className="text-3xl font-bold">{order.originCity} → {order.destinationCity}</h1>
        </div>

        <div className="p-8 space-y-8">
          <section className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Отправитель</h3>
              <p className="font-bold text-slate-900 text-lg">{order.senderName}</p>
              <p className="text-slate-600">{order.originCity}</p>
              <p className="text-slate-600">{order.senderPhone}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Получатель</h3>
              <p className="font-bold text-slate-900 text-lg">{order.receiverName}</p>
              <p className="text-slate-600">{order.destinationCity}</p>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Груз</h3>
              <p className="text-slate-900"><span className="font-medium">Тип:</span> {CARGO_LABELS[order.cargoType]}</p>
              <p className="text-slate-900"><span className="font-medium">Вес:</span> {order.weight} кг</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Статус</h3>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                Новая
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};