import { SyntheticEvent } from "react";
import "../css/modal.css";
import { CloseIcon } from "../icons/CloseIcon";
import { IModalProps } from "../types/Modal";
export const Modal = (data: IModalProps) => {
  const close = (e: SyntheticEvent) => {
    if (data.closeOnBGClick && e.target == e.currentTarget) {
      e.stopPropagation();
      data.onClose?.();
    }
  };
  return (
    <>
      <div
        onClick={close}
        className={"modal " + (data.state ? "open" : "close")}
      >
        <div className="modal-body">
          <div className="btn close-modal" onClick={data.onClose}>
            <CloseIcon></CloseIcon>
          </div>
          <div className="title">{data.title ?? "Modal"}</div>
          {data.element ?? data.children}
        </div>
      </div>
      {data.state && <div className="modal-bg"></div>}
    </>
  );
};
