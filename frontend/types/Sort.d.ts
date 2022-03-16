import { IChild } from "./Default.d";

export type SortType = { order: "asc" | "desc" | undefined; name: string };
interface Sort {
  name: string;
  setSort?: (data: SortType | undefined) => void;
  state?: SortType;
}

export type ISortProp = Sort & IChild;
