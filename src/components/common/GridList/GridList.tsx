import React from "react";

type TGridList<T> = {
  records: T[];
  renderItems: (record: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
};

const GridList = <T extends { id?: number | string }>({
  records,
  renderItems,
  emptyMessage = "There are no items available.",
  className = "",
}: TGridList<T>) => {
  const itemList =
    records.length > 0 ? (
      records.map((record) => (
        <React.Fragment key={record.id}>
          {renderItems(record)}
        </React.Fragment>
      ))
    ) : (
      <p className="text-gray-400">{emptyMessage}</p>
    );

  return <div className={className}>{itemList}</div>;
};

export default GridList;
