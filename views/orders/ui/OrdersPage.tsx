import { OrderHistory } from '@/widgets/order-history';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

export const OrdersPage = () => (
  <main className="max-w-4xl mx-auto py-10 px-4">
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Мои заявки</h1>
      <Link href="/">
        <Button>Создать новую</Button>
      </Link>
    </header>
    <OrderHistory />
  </main>
);