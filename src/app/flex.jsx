"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { use, useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const number = 12;
const length = 50;
const api_url = "http://127.0.0.1:8000/random/list/" + number + "/" + length;
const chartConfig1 = {
  edge: "lightblue",
  fill: "lightyellow",
};

const chartConfig2 = {
  edge: "lightgreen",
  fill: "lightpink",
};

function Chart({ data, idx }) {
  const dataprocess = [];
  // console.log(data);
  let index = 0;
  for (index = 0; index < data.length; index++) {
    dataprocess.push({ index: index, val: data[index] });
  }
  console.log("处理后的数据 ", dataprocess);
  const pic1 = (
    <Card>
      <CardHeader>
        <CardTitle>{idx}</CardTitle>
        <CardDescription>some describe</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig1}>
          <AreaChart
            accessibilityLayer
            data={dataprocess}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              // tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="val"
              type="natural"
              fill={chartConfig1.fill}
              fillOpacity={0.8}
              stroke={chartConfig1.edge}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              一些说明 <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
  const pic2 = (
    <Card>
      <CardHeader>
        <CardTitle>{idx}</CardTitle>
        <CardDescription>some describe</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <LineChart
            accessibilityLayer
            data={dataprocess}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="index"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              //   tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent dot />} />
            <Line
              dataKey="val"
              type="natural"
              stroke={chartConfig2.edge}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {idx} 
          {/* Trending up by 5.2% this month  */}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {/* Showing total visitors for the last 6 months */}
        </div>
      </CardFooter>
    </Card>
  );
  return <div style={{width:"30vw"}}>{idx % 2 != 1 ? pic1 : pic2}</div>;
}

export default function Flex() {
  const [chartsData, setData] = useState([]);
  const fetchData = () => {
    axios
      .get(api_url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        // console.log(err + "error in " + api_url);
      });
  };
  return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        padding:"1vh"
    }}>
      <Button style={{width:"10vw"}} onClick={fetchData}>click me</Button>

      {chartsData.length == 0 ? (
        <p style={{fontSize:"30vh"}}>No data</p>
      ) : (
        <div style={{
            display:"flex",
            flexDirection:"row",
            width:"98vw",
            // height:"100px",
            justifyContent:"space-around",
            alignItems:"center",
            alignContent:"space-around",
            flexWrap:"wrap",
            overflowX:"nonescroll"
        }}>
            <Chart data={chartsData[1]} idx={1} />
            <Chart data={chartsData[2]} idx={2} />
            <Chart data={chartsData[3]} idx={3} />
            <Chart data={chartsData[4]} idx={4} />
            <Chart data={chartsData[5]} idx={5} />
            <Chart data={chartsData[6]} idx={6} />
            <Chart data={chartsData[7]} idx={7} />
            <Chart data={chartsData[8]} idx={8} />
            <Chart data={chartsData[9]} idx={9} />
            <Chart data={chartsData[10]} idx={10} />
            <Chart data={chartsData[11]} idx={11} />
            <Chart data={chartsData[12]} idx={12} />



        </div>
      )}
    </div>
  );
}
