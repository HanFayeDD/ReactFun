'use client'
import React, { useState } from 'react';
import NAV from './nav';
import BOARD from './board';
import './css/mainlayout.css';
const navname = ["数据看板"]
export default function Home(){
  const [pnfromchild, setPnFromChild] = useState(1)
  const handlemasfromNAV = (message) => {
    console.log("from NAV " + message)
    setPnFromChild(message)
  }
  return (
    <div id="layout-main">
    <NAV nav2pagefunc={handlemasfromNAV} navname={navname[pnfromchild-1]} /> 
    {pnfromchild==1 && <BOARD/>}
    
    </div>
  )
}