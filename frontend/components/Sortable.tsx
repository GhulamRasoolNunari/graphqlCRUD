import { useState } from "react";
import { DownIcon } from "../icons/DownIcon";
import { UpIcon } from "../icons/UpIcon";
import { ISortProp } from "../types/Sort";
import "../css/sort.css";
export const Sortable = (props: ISortProp) => {
  const setSort = (order: "asc" | "desc") => {
    if (props.state?.name == props.name && props.state.order == order) {
      props.setSort?.(undefined);
    } else
      props.setSort?.({
        name: props.name,
        order: order,
      });
  };
  return (
    <div className="sort">
      <span>{props.element ?? props.children}</span>
      <span className="sort-items">
        <span
          onClick={() => setSort("asc")}
          className={
            "item-up sort-item " +
            (props.name == props.state?.name && props.state?.order == "asc"
              ? "active"
              : "")
          }
        >
          <UpIcon />
        </span>
        <span onClick={() => setSort("desc")}
        
        className={
          "item-down sort-item " +
          (props.name == props.state?.name && props.state?.order == "desc"
            ? "active"
            : "")
        }
        >
          <DownIcon />
        </span>
      </span>
    </div>
  );
};
