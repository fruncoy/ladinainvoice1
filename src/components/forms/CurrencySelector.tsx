import { Button } from '../ui/Button';

interface CurrencySelectorProps {
  value: 'KSH' | 'USD';
  onChange: (currency: 'KSH' | 'USD') => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Currency</h2>
      <div className="flex space-x-4">
        <Button
          variant={value === 'KSH' ? 'primary' : 'secondary'}
          onClick={() => onChange('KSH')}
        >
          KSH
        </Button>
        <Button
          variant={value === 'USD' ? 'primary' : 'secondary'}
          onClick={() => onChange('USD')}
        >
          USD
        </Button>
      </div>
    </div>
  );
}