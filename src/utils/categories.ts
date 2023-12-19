export interface Categories {
  label: string;
  value: string;
  color: string;
}

export const categories: Categories[] = [
  { label: 'Personal', value: 'personal', color: '#148F77' },
  { label: 'Trabajo', value: 'work', color: '#5499C7' },
  { label: 'Estudios', value: 'study', color: '#A569BD' },
  { label: 'Casa', value: 'home', color: '#E67E22' },
  { label: 'Compras', value: 'shopping', color: '#D98880' },
  { label: 'Viajes', value: 'travel', color: '#00CED1' },
  { label: 'Gastos', value: 'expenses', color: '#F1C40F' },
  { label: 'Comida', value: 'food', color: '#FAEBD7' },
  { label: 'Salud', value: 'health', color: '#28B463' },
  { label: 'Educación', value: 'education', color: '#DEB887' },
  { label: 'Transporte', value: 'transport', color: '#BDB76B' },
  { label: 'Otros', value: 'other', color: '#ABB2B9' },
];
