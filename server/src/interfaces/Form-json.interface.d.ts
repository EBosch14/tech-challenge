export interface IFormJSON {
  items: Item[];
}

export interface Item {
  type: string;
  label: string;
  name?: string;
  required?: boolean;
  options?: Option[];
}

export interface Option {
  label: string;
  value: string;
}
