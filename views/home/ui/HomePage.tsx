import { OrderForm } from '@/widgets/order-form';

export const HomePage = () => (
  <main className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-8">Новая заявка</h1>
    <OrderForm />
  </main>
);