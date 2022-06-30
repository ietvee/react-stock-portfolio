import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import _ from "lodash";
import axios from "axios";
import SearchBar from "./searchBar/searchBar";
import StockList from "./stockList/stockList";

function Homescreen() {
  const [parsedData, setParsedData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [values, setValues] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const callAPI = () => {
    Papa.parse(
      "https://www.alphavantage.co/query?function=LISTING_STATUS&state=active&apikey=E220DH8RAYLY4R91",
      {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const columnsArray = [];
          const valuesArray = [];

          results.data.map((i) => {
            columnsArray.push(Object.keys(i));
            valuesArray.push(Object.values(i));
          });

          setParsedData(results.data);
          setTableColumns(columnsArray);
          setValues(valuesArray);
        },
      }
    );
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const term = searchInput;
    const key = "E220DH8RAYLY4R91";
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${key}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            let stocks = _.flattenDeep(
              Array.from(res.data["bestMatches"]).map((stock) => [
                {
                  symbol: stock["1. symbol"],
                  name: stock["2. name"],
                  type: stock["3. type"],
                  marketOpen: stock["5. marketOpen"],
                },
              ])
            );
            console.log(stocks);
            setData(stocks);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  };

  useEffect(() => {
    // callAPI();
  }, []);

  return (
    <div>
      <SearchBar
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={handleSearch}
      />
      {searchInput === "" ? (
        <div>
          {values.length > 0 &&
            values.map((value, index) => {
              return <div key={index}>{value[1]}</div>;
            })}
        </div>
      ) : (
        <StockList stockItems={data} />
      )}
    </div>
  );
}

export default Homescreen;
