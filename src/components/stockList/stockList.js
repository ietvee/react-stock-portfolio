import React, { useEffect, useState } from "react";
import StockListItem from "../stockItem/stockItem";

const StockList = (props) => {
  const stockItem = props.stockItems.map((stock) => {
    return (
      <StockListItem
        key={stock.symbol}
        symbol={stock.symbol}
        name={stock.name}
        type={stock.type}
        marketOpen={stock.marketOpen}
      />
    );
  });

  return <ul className="StockList">{stockItem}</ul>;
};

export default StockList;
