import { Card } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getForecastTimeline } from "../utils/APICalls";
import "./Tiles.css";

type ForecastChartTileProps = {
  numDays: number;
};

export const ForecastChartTile = ({ numDays }: ForecastChartTileProps) => {
  const [forecastTimeline, setForecastTimeline] = useState<ForecastTimeline[]>(
    []
  );

  useEffect(() => {
    getForecastTimeline(numDays).then((response) => {
      setForecastTimeline(response.data);
    });
  }, [numDays]);

  const getTimeSeries = () => [
    ...forecastTimeline
      .reduce((r, n: ForecastTimeline) => {
        if (r.get(n.usageDate)) {
          let obj = r.get(n.usageDate);
          obj[n.serviceDesc] = (obj[n.serviceDesc] || 0) + n.predictedCost;
        } else {
          let obj = {} as any;
          obj[n.serviceDesc] = n.predictedCost;
          obj["usageDate"] = n.usageDate;
          r.set(n.usageDate, obj);
        }
        return r;
      }, new Map<string, any>())
      .values(),
  ];

  const getServiceNames = () => [
    ...forecastTimeline.reduce(
      (r, n) => r.add(n.serviceDesc),
      new Set<string>()
    ),
  ];

  return (
    <div
      className={"tile full-tile"}
      style={{ width: "100%", height: "400px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={400} data={getTimeSeries()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"usageDate"} interval={"preserveStart"} minTickGap={20} />
          <YAxis unit={"$"} />
          {getServiceNames().map((e) => {
            console.log(getTimeSeries());
            return <Line key={e} dataKey={e}></Line>;
          })}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
