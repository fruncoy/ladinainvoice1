import { useDocumentForm } from '../hooks/useDocumentForm';
import { useDocumentItems } from '../hooks/useDocumentItems';
import { useDocumentStorage } from '../hooks/useDocumentStorage';
import { CurrencySelector } from './CurrencySelector';
import { VehicleItemsTable } from './VehicleItemsTable';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { Document, DocumentType, VehicleItem } from '../../../types';

interface DocumentFormProps {
  type: DocumentType;
  initialData?: Document;
  initialItems?: VehicleItem[];
  onSave?: (document: Document, items: VehicleItem[]) => void;
}

export function DocumentForm({ 
  type, 
  initialData, 
  initialItems = [],
  onSave 
}: DocumentFormProps) {
  const {
    clientName,
    setClientName,
    currency,
    setCurrency,
    documentDate,
    setDocumentDate,
    dueDate,
    setDueDate,
    documentData,
  } = useDocumentForm({ type, initialData });

  const {
    items,
    addItem,
    deleteItem,
    calculateTotal,
  } = useDocumentItems(initialItems);

  const { saveDocumentWithItems } = useDocumentStorage();

  const handleSave = () => {
    const savedDocument = saveDocumentWithItems(
      { ...documentData, total_amount: calculateTotal() },
      items
    );
    onSave?.(savedDocument, items);
  };

  return (
    <div className="space-y-6">
      <CurrencySelector value={currency} onChange={setCurrency} />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Client Details</h2>
        <div className="space-y-4">
          <Input 
            label="Client Name" 
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              type="date" 
              label={`${type.charAt(0).toUpperCase() + type.slice(1)} Date`}
              value={documentDate.split('T')[0]}
              onChange={e => setDocumentDate(e.target.value)}
              required
            />
            <Input 
              type="date" 
              label={type === 'invoice' ? 'Due Date' : 'Valid Until'}
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <VehicleItemsTable
        items={items}
        currency={currency}
        onAddItem={addItem}
        onDeleteItem={deleteItem}
      />

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave}>
          Save {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </div>
    </div>
  );
}