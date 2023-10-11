import React from "react";
import { getForecast } from "../utils/APICalls";
import InfiniteTableTile from "../components/InfiniteTableTile";
import { allDataColumns, forecastColumns } from "../utils/TableColumns";

export const Forecast = () => (
  <>
    <InfiniteTableTile
      title={"Forecast Data"}
      apiCall={getForecast}
      columns={forecastColumns}
      queryParams={undefined}
      modal={""}
    />
  </>
);
