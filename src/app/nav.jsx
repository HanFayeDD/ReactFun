"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function NAV({ nav2pagefunc, navname, initPage }) {
  const [pagenum, setPagenum] = useState(initPage);
  return (
    <div id="layout-nav">
      <Button
        onClick={() => {
          setPagenum(pagenum - 1);
          console.log(pagenum - 1);
          nav2pagefunc(pagenum - 1);
        }}
        style={{ width: "6vw", height: "6vh" }}
      >
        上一页
      </Button>
      <div
        style={{
          fontSize: "7vh",
          position: "relative",
        }}
      >
        {navname} {pagenum}
      </div>
      <Button
        onClick={() => {
          setPagenum(pagenum + 1);
          console.log(pagenum + 1);
          nav2pagefunc(pagenum + 1);
        }}
        style={{ width: "6vw", height: "6vh" }}
      >
        下一页
      </Button>
    </div>
  );
}
