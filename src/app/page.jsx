'use client'
import React, { useState } from 'react';
import NAV from './nav';
import BOARD from './board';
import Flex from './flex';
import './css/mainlayout.css';
const navname = ["数据看板", "flex"]
export default function Home(){
  const [pnfromchild, setPnFromChild] = useState(2)
  const handlemasfromNAV = (message) => {
    console.log("from NAV " + message)
    setPnFromChild(message)
  }
  return (
    <div id="layout-main">
    <NAV nav2pagefunc={handlemasfromNAV} navname={navname[pnfromchild-1]} /> 
    {pnfromchild==1 && <BOARD/>}
    {pnfromchild==2 && (<Flex />)}
    </div>
  )
}