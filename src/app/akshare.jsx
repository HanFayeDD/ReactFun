"use client";
import Flex from "./flex";
import "./css/akshare.css";
import { TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  PieChart,
  Pie,
  Label,
  Sector,
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
import React, { useEffect, useState } from "react";
import axios from "axios";

const base_api = "http://127.0.0.1:8000/finance/info/";

// 第一行输入数据部分
function InputCode({ q, setQ, setData }) {
  const [loading, setLoading] = useState(false);
  const [tq, setTq] = useState("000001");
  const fetchData = () => {
    setQ(tq);
  };
  //监听变化，因此输入不变，按按钮也不会与后端通信
  useEffect(() => {
    console.log(q);
    console.log("use fetchData");
    setLoading(true);
    axios
      .get(base_api + q)
      .then((response) => {
        // console.log("get data ", response.data["chart2-1"]);
        setData(response.data);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [q]);

  return (
    <div
      id="items"
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
        value={tq}
        onChange={(value) => {
          if (value.length < 6) {
            console.log("otp未6位");
            return;
          }
          setTq(value);
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

      {loading ? (
        <Button disabled style={{ width: "35%", height: "10%" }}>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button onClick={fetchData} style={{ width: "35%", height: "10%" }}>
          {/* //???onClick怎样写究竟 */}
          查询
        </Button>
      )}
    </div>
  );
}

// 第一行展示数据部分
function Datashow({ q, data, which }) {
  const chartConfig = {
    c1: "lightpink",
    c2: "lightblue",
    c3: "purple",
    c4: "lightgreen",
    chart1_1_w_h: { height: "97%", width: "97%" },
    chart1_2_w_h: { height: "97%", width: "97%" },
    chart2_1_w_h: { height: "97%", width: "97%" },
    chart2_2_w_h: { height: "97%", width: "97%" },
  };
  const chart1_1 = (
    <Card style={chartConfig.chart1_1_w_h}>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>{q} </CardDescription>
        <p>开盘-收盘-最高-最低</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{}}>
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
  const chart2_1 = (
    <Card className="flex flex-col" style={chartConfig.chart2_1_w_h}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{q}营业收入</CardTitle>
        <CardDescription>按照产品分类</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="营业收入"
              nameKey="分类"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {/* {sum.toLocaleString()} */}
                          按产品分
                        </tspan>
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan> */}
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          按产品分 <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
  const chart2_2 = (
    <Card className="flex flex-col" style={chartConfig.chart2_2_w_h}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{q}营业收入</CardTitle>
        <CardDescription>按照地区分类</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="营业收入"
              nameKey="分类"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {/* {sum.toLocaleString()} */}
                          按地区分
                        </tspan>
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan> */}
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          按地区分 <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div> */}
      </CardFooter>
    </Card>
  );
  return (
    <div
      id="items"
      style={{
        width: "35vw",
      }}
    >
      {which == "1-1" && <div id="chart1-1">{chart1_1}</div>}
      {which == "1-2" && <div id="chart1-2">{chart1_2}</div>}
      {which == "2-1" && <div id="chart2-1">{chart2_1}</div>}
      {which == "2-2" && <div id="chart2-2">{chart2_2}</div>}
      {which == "test" && <div id="chart1-1"></div>}
    </div>
  );
}
const text = ["aa", "b", "a", "aa", "aaa"]

function InfoText({q, data }) {
  if (!Array.isArray(data)) {
    return (<div></div>)
  }
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 " style={{height:"32vh"}} >
        {data.map((t, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card style={{height:"31vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <CardContent className="flex items-center justify-around flex-col w-4/5 h-4/5">
                    <div style={{fontSize:"1.5rem", fontWeight:"bold"}}>
                      {t.key}
                    </div>
                    <div style={{}}>
                      {t.val}
                    </div>
                </CardContent>
                {/* {t.key}
                {t.val} */}
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export default function Akshare() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("000001");
  const upboard = (
    <div id="akshare-single-line">
      <InputCode q={q} setQ={setQ} setData={setData} />
      <Datashow q={q} data={data["chart1-1"]} which={"1-1"} />
      <Datashow q={q} data={data["chart1-2"]} which={"1-2"} />
    </div>
  );
  const downboard = (
    <div id="akshare-single-line">
      <Datashow q={q} data={data["chart2-1"]} which={"2-1"} />
      <Datashow q={q} data={data["chart2-2"]} which={"2-2"} />
      <div id="items" style={{ width: "20vw", display:"flex", justifyContent:"space-around", alignItems:"center" }}>
        <InfoText q={q} data={data["info"]} />
      </div>
    </div>
  );
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
