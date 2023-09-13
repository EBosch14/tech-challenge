export enum SelectRadioInputType {
  radio = "radio",
  select = "select",
}

export enum OtherInputTypes {
  text = "text",
  password = "password",
  email = "email",
  number = "number",
  url = "url",
  tel = "tel",
  date = "date",
  time = "time",
  datetime = "datetime-local",
  range = "range",
  color = "color",
  search = "search",
  file = "file",
  image = "image",
  checkbox = "checkbox",
  textarea = "textarea",
}

export const InputsType = {
  ...SelectRadioInputType,
  ...OtherInputTypes,
} as const;

export interface IOption {
  label: string;
  value: string;
}

export interface IItemForm {
  type: typeof InputsType;
  name: string;
  label: string;
  options?: IOption[];
  required?: boolean;
}

export interface IItemAnswer extends IItemForm {
  response: string;
}

export interface IForm {
  items: IItemForm[];
}

export interface IAnswer {
  items: IItemAnswer[];
}
