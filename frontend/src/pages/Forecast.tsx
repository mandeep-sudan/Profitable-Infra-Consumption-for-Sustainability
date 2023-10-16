import React, { useState } from "react";
import { getForecast } from "../utils/APICalls";
import InfiniteTableTile from "../components/InfiniteTableTile";
import { forecastColumns } from "../utils/TableColumns";
import { Card, Center, Container, SegmentedControl } from "@mantine/core";
import { ForecastChartTile } from "../components/ForecastChartTile";

export const Forecast = () => {
  const [timeframe, setTimeframe] = useState<string>("week");

  const getNumDays = () => {
    switch (timeframe) {
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
          value={timeframe}
          onChange={setTimeframe}
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
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: "100%", height: "100%" }}
        className={"tile full-tile"}
      >
        <ForecastChartTile numDays={getNumDays()} />
      </Card>
    </>
  );
};
