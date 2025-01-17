"use client";
import axios from "axios";
import "./css/mainlayout.css";
import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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

const chartConfig = {
  desktop: {
    label: "open",
    color: "blue",
  },
  mobile: {
    label: "close",
    color: "#ec4899",
  },
};

const chartConfig1 = {
  desktop: {
    label: "成交量",
    color: "#ec4899",
  },
};

function shapedata(data) {
  if (data == null) {
    return [null, null];
  }
  let res = [];
  let res1 = [];
  let length = data.日期.length;
  // console.info(length)
  for (let index = 0; index < length; index++) {
    res.push({
      day: data.日期[index],
      open: data.开盘[index],
      close: data.收盘[index],
    });
  }
  for (let index = 0; index < length; index++) {
    res1.push({ day: data.日期[index], number: data.成交量[index] });
  }
  // console.log(res1);
  return [res, res1];
}

export default function BOARD() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const q = "000009";
  const api_url = "http://127.0.0.1:8000/finance/stock/" + q;
  const fetchData = () => {
    setLoading(true);
    setError(false);
    axios
      .get(api_url)
      .then((response) => {
        setData(response.data.data);
        // console.log("获取到的数据", response.data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []); // 空数组作为依赖项，确保只在组件挂载时执行一次
  //   console.log("函数体中数据", data);
  const [chartdata, chartdata1] = shapedata(data);
  console.log("处理之后的数据", chartdata1);
  const chart = (
    <div style={{ width: "40vw" }}>
      <Card>
        <CardHeader>
          <CardTitle>开盘与收盘</CardTitle>
          <CardDescription>最近时间{q}股票代码开盘收盘价格</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartdata}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="open"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="close"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {q}股票详情
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
  const chart1 = (
    <Card>
      <CardHeader>
        <CardTitle>成交量</CardTitle>
        <CardDescription>最近时间成交量</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig1}>
          <LineChart
            accessibilityLayer
            data={chartdata1}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="number"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {q}成交量
          {/* Trending up by 5.2% this month  */}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {/* Showing total visitors for the last 6 months */}
        </div>
      </CardFooter>
    </Card>
  );
  return (
    <div style={{ padding: "3vh", fontSize: "20px" }} id="layout-board">
      {/* <Button style={{ width: "100px", height: "50px" }} onClick={fetchData}>
        换一换
      </Button> */}
      {loading && <p>loading data</p>}
      {error && <p>Error {error.message}</p>}
      <div
        style={{
          height: "5vh",
          margin: "1vw",
          marginTop: "5vw",
          borderRadius: "10px",
        }}
      >
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
    <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
    </div>
      </div>
      <div style={{ height: "60vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "10vh",
          }}
        >
          {data && !loading && chart}
          <div style={{ width: "40vw" }}>{data && !loading && chart1}</div>
        </div>
      </div>
    </div>
  );
}
