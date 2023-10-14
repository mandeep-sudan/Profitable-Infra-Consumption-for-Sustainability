import React, { useState } from "react";
import { getForecast } from "../utils/APICalls";
import InfiniteTableTile from "../components/InfiniteTableTile";
import { forecastColumns } from "../utils/TableColumns";
import { Center, Container, SegmentedControl } from "@mantine/core";

export const Forecast = () => {
  const [tileStatus, setTileStatus] = useState<string>("week");
  const getNumDays = () => {
    switch (tileStatus) {
      case "week":
        return 7;
      case "month":
        return 30;
      case "year":
        return 365;
    }
  };

  return (
    <>
      <Container>
        <SegmentedControl
          value={tileStatus}
          onChange={setTileStatus}
          data={[
            {
              label: <Center>W</Center>,
              value: "week",
            },
            {
              label: <Center>M</Center>,
              value: "month",
            },
            {
              label: <Center>Y</Center>,
              value: "year",
            },
          ]}
          color="blue"
        />
      </Container>
      <InfiniteTableTile
        title={"Forecast Data"}
        apiCall={getForecast}
        columns={forecastColumns}
        queryParams={{ numDays: getNumDays() }}
        modal={""}
      />
    </>
  );
};
