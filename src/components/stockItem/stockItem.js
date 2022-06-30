import React from "react";

const StockListItem = (stock, props) => {
  return (
    <li className="StockListItem">
      <div className="StockListItem_Symbol">
        <span>Stock: </span>
        {stock.symbol}
      </div>
      <div className="StockListItem_Price">
        <span>Name: </span>
        {stock.name}
      </div>
      <div className="StockListItem_Volume">
        <span>Type: </span>
        {stock.type}
      </div>
      <div className="StockListItem_Time">
        <span>MarketOpen: </span>
        {stock.marketOpen}
      </div>
    </li>
  );
};
export default StockListItem;
