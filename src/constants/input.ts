import { Form } from '@types';

type Input = {
  name: keyof Form;
  label: string;
  type: string;
  placeholder: string;
};

export const inputs: Input[] = [
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Mitsubishi' },
  { name: 'model', label: 'Model', type: 'text', placeholder: 'Montero' },
  { name: 'vin', label: 'VIN', type: 'text', placeholder: 'SAJWJ0FF3F8321657' },
  { name: 'year', label: 'Year', type: 'text', placeholder: '2023' },
  { name: 'color', label: 'Color', type: 'text', placeholder: 'Yellow' },
  { name: 'price', label: 'Price', type: 'text', placeholder: '$2814.46' },
];
