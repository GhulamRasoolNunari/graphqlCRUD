import { IChild } from './Default.d';


interface IModalData  {
  title?: string;
  closeOnBGClick?:boolean
  onClose?: () => void;
  state?: boolean;
}


type IModalProps = IModalData & IChild


