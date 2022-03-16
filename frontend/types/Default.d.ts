import { ReactElement, ReactNode } from "react";

interface InnerElement  {
    element: ReactElement;
    children?: ReactElement;
  }
  
  interface IChildren  {
    children: ReactNode;
    element?: ReactElement;
  }


export type IChild = InnerElement | IChildren;
