from fastapi import FastAPI
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
import akshare as ak
import random
import time

app = FastAPI()

# 配置 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.1.107:3000/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sepdays = 90
endays: str = datetime.now().strftime('%Y%m%d')
begindays: str = (datetime.now() - timedelta(days=sepdays)
                      ).strftime('%Y%m%d')

@app.get("/finance/stock/{q}")
async def get_tock_info(q:str | None = '000001'):
    # res = ak.stock_zh_a_hist(symbol=q, period="daily",
    #                                     start_date=begindays,
    #                                     end_date=endays, adjust="qfq")
    d = dict()
    d['日期'] = []##res['日期'].tolist()
    d['开盘'] = []##res['开盘'].tolist()
    d['收盘'] = []##res['收盘'].tolist()
    d['成交量'] = []##res['成交量'].tolist()
    length = 100
    for ele in d.keys():
        if ele == '日期':
            d[ele] = list(range(1, length+1, 1))
            continue
        d[ele] = [random.randint(1, 1000) for _ in range(length)]
    time.sleep(5)
    return {"stockcode":q, "data":d}

@app.get("/random/list/{length}")
def get_random_list(length:int):
    return [random.randint(0,100) for _ in range(length)]

@app.get("/hello")
def get_hello():
    return "Welcome"

@app.get("/query/{q}")
def get_repeat(q:str | None="default name"):
    return "hi "+q
