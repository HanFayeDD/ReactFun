'use client'
import React, { useState } from 'react';
import NAV from './nav';
import BOARD from './board';
import './css/mainlayout.css';

export default function Home(){
  const [pnfromchild, setPnFromChild] = useState(1)
  const handlemasfromNAV = (message) => {
    console.log("from NAV " + message)
    setPnFromChild(message)
  }
  return (
    <div id="layout-main">
    <NAV nav2pagefunc={handlemasfromNAV}/> 
    {pnfromchild==1 && <BOARD/>}
    
    </div>
  )
}