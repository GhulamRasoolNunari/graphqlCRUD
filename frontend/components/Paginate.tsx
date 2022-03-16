import { useEffect, useState } from "react";
import { LeftIcon } from "../icons/LeftIcon";
import { RigthIcon } from "../icons/RigthIcon";
import { IPaginateProps } from "../types/Paginate";

export const Paginate = (props: IPaginateProps) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSegemnts, setPageSegments] = useState<
    { isActive: boolean; label: number }[]
  >([]);

  const setPagination = () => {
    const totalPages = Math.ceil(props.total / props.limit);
    if (totalPages && totalPages < page) {
      setPage(totalPages);
    }
    setTotalPage(totalPages);
    const segment: { isActive: boolean; label: number }[] = [];
    if (page == 1) {
      segment.push({ isActive: true, label: page });
      if (totalPages > 1) {
        segment.push({ isActive: false, label: 2 });
      }
      if (totalPages > 2) {
        segment.push({ isActive: false, label: 3 });
      }
    } else if (page == totalPages) {
      if (totalPages > 2) {
        segment.push({ isActive: false, label: totalPages - 2 });
      }

      if (totalPages > 1) {
        segment.push({ isActive: false, label: totalPages - 1 });
      }
      segment.push({ isActive: true, label: page });
    } else {
      segment.push({ isActive: false, label: page - 1 });
      segment.push({ isActive: true, label: page });
      segment.push({ isActive: false, label: page + 1 });
    }
    setPageSegments(segment);
  };

  useEffect(() => {
    setPagination();
  }, [page, props.total, props.limit]);

  useEffect(() => {
    props.setSkip((page - 1) * props.limit);
  }, [page, props.limit,props.total]);

  // const getPage = async (page: number) => {
  //   setPage(page);
  // };

  return (
    <>
      <div className="paginate">
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          className="item"
        >
          <LeftIcon></LeftIcon>
        </button>
        {pageSegemnts.map((item, i) => (
          <button
            key={i}
            disabled={item.isActive}
            onClick={() => setPage(item.label)}
          >
            {item.label}
          </button>
        ))}

        <button
          disabled={page == totalPage}
          onClick={() => setPage(page + 1)}
          className="item"
        >
          <RigthIcon></RigthIcon>
        </button>
      </div>
    </>
  );
};
