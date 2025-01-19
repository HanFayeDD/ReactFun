'use client'
import React, { useState } from 'react';
import NAV from './nav';

import BOARD from './board';
import Flex from './flex';
import Akshare from './akshare';

import './css/mainlayout.css';
const navname = ["数据看板", "flex"]
const initPage = 2
export default function Home(){
  const [pnfromchild, setPnFromChild] = useState(initPage)
  const handlemasfromNAV = (message) => {
    console.log("from NAV " + message)
    setPnFromChild(message)
  }
  return (
    <>
      {pnfromchild != 3 && (
         <div id="layout-main">
         <NAV nav2pagefunc={handlemasfromNAV} navname={navname[pnfromchild-1]} initPage={initPage}/> 
         {pnfromchild==1 && (<BOARD/>)}
         {pnfromchild==2 && (<Flex />)}
         </div>
      )}
      {pnfromchild == 3 && (<Akshare/>)}
    </>
  )
}

