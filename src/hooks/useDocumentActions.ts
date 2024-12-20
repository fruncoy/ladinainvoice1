import { useNavigate } from 'react-router-dom';
import type { Document } from '../types';

export function useDocumentActions() {
  const navigate = useNavigate();

  const navigateToEdit = (document: Document) => {
    navigate(`/${document.type}s/${document.id}`);
  };

  return {
    navigateToEdit
  };
}