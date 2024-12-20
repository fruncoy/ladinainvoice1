import type { Document, VehicleItem } from '../../types';

export interface PDFGeneratorOptions {
  document: Document;
  items: VehicleItem[];
}

export interface TableData {
  head: string[][];
  body: any[][];
  foot: any[][];
}