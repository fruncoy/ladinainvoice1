import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { VehicleForm } from '../forms/VehicleForm';
import type { VehicleItem } from '../../types';

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<VehicleItem, 'id'>) => void;
  initialData?: VehicleItem;
}

export function VehicleFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: VehicleFormModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-lg font-semibold">
              {initialData ? 'Edit Item' : 'Add New Item'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <VehicleForm
              onSubmit={(data) => {
                onSubmit(data);
                onClose();
              }}
              onCancel={onClose}
              initialData={initialData}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}