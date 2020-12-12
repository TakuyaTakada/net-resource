import { TranslateType } from "./const";
import { AutoCompProps } from "./components/GraphqlAutoComplete/GraphqlAutoComplete";
import { SelectorProps } from "./components/GraphqlSelector/GraphqlSelector";

export type gqlInput = { input: {} };

export type headCellsType = {
  id: string;
  nestId?: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  translate?: TranslateType;
  link?: string;
}[];

export type Order = "asc" | "desc";

export type DialogTransFieldType = {
  name: string;
  label: string;
  transList: TranslateType;
};

export function isTransField(arg: any): arg is DialogTransFieldType {
  return arg !== null && typeof arg === "object" && arg.transList;
}

export type DialogTextFieldType = {
  name: string;
  label: string;
  required?: boolean;
  multiline: boolean;
  rows?: number;
  update?: boolean;
};

export function isTextField(arg: any): arg is DialogTextFieldType {
  return arg !== null && typeof arg === "object" && arg.multiline !== undefined;
}

export type DialogSelectorFieldType = {
  name: string;
  label?: string;
  blankText: string;
  query: any;
  variables: { input: {} };
  typename: string;
  accessors: {
    value(d: {}): any;
    text(d: {}): any;
  };
};

export function isSelectorField(arg: any): arg is DialogSelectorFieldType {
  return arg !== null && typeof arg === "object" && arg.blankText;
}

export type DialogCheckboxFieldType = {
  title: string;
  checkedName: string;
  query: any;
  variables: { input: {} };
  typename: string;
  accessors: {
    value(d: {}): any;
    text(d: {}): any;
  };
};

export function isCheckboxField(arg: any): arg is DialogCheckboxFieldType {
  return arg !== null && typeof arg === "object" && arg.checkedName;
}

export type DialogFields = (
  | DialogTextFieldType
  | DialogTransFieldType
  | DialogSelectorFieldType
  | DialogCheckboxFieldType
)[];

export type SearchSelectorField = {
  name: string;
  blankText: string;
  transList: TranslateType;
  value: number;
  handleChange(a: any): void;
};

export function isSearchSelectorField(arg: any): arg is SearchSelectorField {
  return arg !== null && typeof arg === "object" && arg.transList;
}

export type SearchFieldType = (
  | AutoCompProps
  | SelectorProps
  | SearchSelectorField
)[];
