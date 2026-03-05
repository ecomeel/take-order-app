'use client';
import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { OrderFilters } from '@/features/order-filters';
import { EmptyState } from '@/shared/ui/EmptyState';
import Link from 'next/link';
import { type Order, OrderCard, orderStorage } from '@/entities/order';

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    setOrders(orderStorage.getAll());
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.receiverName.toLowerCase().includes(search.toLowerCase()) ||
        order.destinationCity.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'all' || order.cargoType === filterType;
      return matchesSearch && matchesType;
    });
  }, [orders, search, filterType]);

  const confirmDelete = () => {
    const updated = orderStorage.remove(orderToDelete!);
    setOrders(updated);
    setOrderToDelete(null);
  };

  return (
    <div className="space-y-4">
      <OrderFilters 
        search={search} 
        onSearchChange={setSearch} 
        filterType={filterType} 
        onTypeChange={setFilterType} 
      />

      <div className="grid gap-4">
        {!filteredOrders.length ? (
          !orders.length ? (
            <EmptyState 
              title="У вас пока нет заявок"
              description="Создайте свою первую заявку на доставку прямо сейчас, это займет всего пару минут."
              action={
                <Link href="/">
                  <Button className="w-full">Создать заявку</Button>
                </Link>
              }
            />
          ) : (
            <EmptyState 
              title="Ничего не найдено"
              description="Попробуйте изменить параметры поиска или сбросить фильтры."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              action={
                <Button variant="secondary" className="w-full" onClick={() => {setSearch(''); setFilterType('all');}}>
                  Сбросить фильтры
                </Button>
              }
            />
          )
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} onDelete={setOrderToDelete} />
          ))
        )}
      </div>

      <Modal 
        isOpen={!!orderToDelete} 
        onClose={() => setOrderToDelete(null)} 
        title="Удаление заказа"
      >
        <p className="text-slate-600 text-sm leading-relaxed">
          Вы уверены, что хотите удалить эту заявку? Это действие нельзя будет отменить.
        </p>
        <div className="flex gap-3 mt-8">
          <Button 
            variant="secondary" 
            className="flex-1" 
            onClick={() => setOrderToDelete(null)}
          >
            Отмена
          </Button>

          <Button 
            variant="danger" 
            className="flex-1" 
            onClick={confirmDelete}
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </div>
  );
};