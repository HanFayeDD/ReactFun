"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NAV({ nav2pagefunc }) {
  const [pagenum, setPagenum] = useState(1);
  return (
    <div id="layout-nav">
      <Button
        onClick={() => {
          setPagenum(pagenum - 1);
          console.log(pagenum - 1);
          nav2pagefunc(pagenum - 1);
        }}
        style={{ width: "100px", height: "50px" }}
      >
        上一页
      </Button>
      <div
        style={{
          fontSize: "40px",
          position: "relative",
        }}
      >
        InfoBoard {pagenum}
      </div>
      <Button
        onClick={() => {
          setPagenum(pagenum + 1);
          console.log(pagenum + 1);
          nav2pagefunc(pagenum + 1);
        }}
        style={{ width: "100px", height: "50px" }}
      >
        下一页
      </Button>
    </div>
  );
}
