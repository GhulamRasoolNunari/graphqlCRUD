export interface IPaginateProps {
  setData: () => any;
  setLimit: (limit: number) => any;
  setSkip: (limit: number) => any;
  total: number;
  limit: number;
  skip: number;
}
