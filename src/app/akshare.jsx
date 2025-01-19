"use client";
import Flex from "./flex";
import "./css/akshare.css";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const base_api = "http://127.0.0.1:8000/finance/info/";

// 第一行输入数据部分
function InputCode({ q, setQ, setData }) {
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    console.log("use fetchData");
    setLoading(true);
    axios
      .get(base_api + q)
      .then((response) => {
        console.log("get data ", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      id="up-items"
      style={{
        width: "20vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "20px" }}>股票代码{q}</h1>
      <InputOTP
        maxLength={6}
        value={q}
        onChange={(value) => {
          if (value.length < 6) {
            console.log("otp未6位");
            return;
          }
          setQ(value);
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button onClick={fetchData}>查询</Button>
    </div>
  );
}

// 第一行展示数据部分
function Datashow({ q, data, which }) {
  const chartConfig = {
    c1:"lightpink",
    c2:"lightblue",
    c3:"purple",
    c4:"lightgreen",
    chart1_1_w_h:{height:"97%", width:"97%"},
    chart1_2_w_h:{height:"97%", width:"97%"},
  };
  const chart1_1 = (
    <Card style={chartConfig.chart1_1_w_h}>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>{q} </CardDescription>
        <p>开盘-收盘-最高-最低</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}  style={{}}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="日期"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value) => value.slice(0, 9.8)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent dot />} />
            <Line
              dataKey="开盘"
              type="natural"
              stroke={chartConfig.c4}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="收盘"
              type="natural"
              stroke={chartConfig.c3}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="最高"
              type="natural"
              stroke={chartConfig.c1}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="最低"
              type="natural"
              stroke={chartConfig.c2}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
  
    </Card>
  );
  const chart1_2 = (
    <Card style={chartConfig.chart1_2_w_h}>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>{q} </CardDescription>
        <p>振幅-涨跌幅-涨跌额-换手率</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="日期"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value) => value.slice(0, 9.8)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent dot />} />
            <Line
              dataKey="振幅"
              type="natural"
              stroke={chartConfig.c4}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="涨跌幅"
              type="natural"
              stroke={chartConfig.c3}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="涨跌额"
              type="natural"
              stroke={chartConfig.c1}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              dataKey="换手率"
              type="natural"
              stroke={chartConfig.c2}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
  
    </Card>
  );
  return (
    <div
      id="up-items"
      style={{
        width: "35vw",
      }}
    >
      {which == "1-1" && (<div id="chart1-1">{chart1_1}</div>)}
      {which == "1-2" && (<div id="chart1-2">{chart1_2}</div>)}

    </div>
  );
}

export default function Akshare() {
  const [data, setData] = useState({});
  const [q, setQ] = useState("000001");
  const upboard = (
    <div id="akshare-single-line">
      <InputCode q={q} setQ={setQ} setData={setData} />
      <Datashow q={q} data={data["chart1-1"]} which={"1-1"} />
      <Datashow q={q} data={data["chart1-2"]} which={"1-2"} />
    </div>
  );
  const downboard = <div id="akshare-single-line"> </div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {upboard}
      {downboard}
    </div>
  );
}
