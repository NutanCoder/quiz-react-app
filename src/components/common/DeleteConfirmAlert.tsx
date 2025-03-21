import React from 'react';
import { Button } from './Button';

interface DeleteConfirmAlertProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmAlert: React.FC<DeleteConfirmAlertProps> = ({
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="">
      <p className="text-lg text-red-400 font-medium  mb-3">{title}</p>
      <div className="flex justify-end space-x-2">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};

export { DeleteConfirmAlert };
export type { DeleteConfirmAlertProps }; 