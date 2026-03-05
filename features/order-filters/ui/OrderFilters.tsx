import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';

interface OrderFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onTypeChange: (value: string) => void;
}

export const OrderFilters = ({ search, onSearchChange, filterType, onTypeChange }: OrderFiltersProps) => {
  const filterTypes = [
    { label: 'Все типы', value: 'all' },
    { label: 'Обычный', value: 'standard' },
    { label: 'Документы', value: 'documents' },
    { label: 'Хрупкое', value: 'fragile' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-100 p-4 rounded-2xl border border-slate-100 mb-6">
      <div className="md:col-span-2">
        <Input 
          label="Поиск по заказу" 
          placeholder="Имя или город..." 
          value={search} 
          onChange={(e) => onSearchChange(e.target.value)} 
        />
      </div>
      <Select 
        label="Тип груза" 
        value={filterType}
        onChange={(e) => onTypeChange(e.target.value)}
        options={filterTypes}
      />
    </div>
  );
};