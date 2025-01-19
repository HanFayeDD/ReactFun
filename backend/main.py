from fastapi import FastAPI
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
import akshare as ak
import random
import time
import pandas as pd

app = FastAPI()

# 配置 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sepdays = 90
endays: str = datetime.now().strftime('%Y%m%d')
begindays: str = (datetime.now() - timedelta(days=sepdays)
                  ).strftime('%Y%m%d')


@app.get("/finance/info/{q}")
async def get_info(q: str | None = "000001"):
    ans = dict({
        "开盘-收盘-最高-最低": [],
        "振幅-涨跌幅-涨跌额-换手率": []
    })
    # res1 = ak.stock_zh_a_hist(symbol=q, period="daily",
    #                           start_date=begindays,
    #                           end_date=endays, adjust="qfq")
    # res1.to_csv(f"{q}.csv")
    res1 = pd.read_csv(f"{q}.csv")
    length = res1.shape[0]
    days = res1['日期'].tolist()
    for i in range(length):
        ans["开盘-收盘-最高-最低"].append({"日期": days[i],
                                   "开盘": res1.loc[i, "开盘"],
                                   "收盘": res1.loc[i, "收盘"],
                                   "最高": res1.loc[i, "最高"],
                                   "最低": res1.loc[i, "最低"]})
    for i in range(length):
        ans["振幅-涨跌幅-涨跌额-换手率"].append({"日期": days[i],
                                      "振幅": res1.loc[i, "振幅"],
                                      "涨跌幅": res1.loc[i, "涨跌幅"],
                                      "涨跌额": res1.loc[i, "涨跌额"],
                                      "换手率": res1.loc[i, "换手率"]})
    
    df_origin = pd.read_csv(f"industry_{q}.csv")
    time_ls = df_origin['报告期'].unique()
    time_ = None
    for ele in time_ls:
        if ele.endswith("年度"):
            time_ = ele
    df = df_origin.loc[df_origin['报告期'] == time_]
    # 获取按产品分
    df_product = df.loc[(df['分类方向'] == "按产品分") & (
        df['分类'] != '合计')].loc[:, ['分类', '营业收入']]
    danwei = getdanwei(df_product.iloc[0, -1])
    colors = ["#"+hex(random.randint(1, 1e10))[2:].zfill(6)[-6:]
              for _ in range(df_product.shape[0])]
    df_product['colors'] = colors
    df_product.reset_index(drop=True, inplace=True)
    df_product['营业收入'] = df_product['营业收入'].apply(lambda x:x[:-len(danwei)])
    res_product = change_df(df_product)
    ## 获取按地区分
    df_area = df.loc[(df['分类方向'] == "按地区分") & (
        df['分类'] != '合计')].loc[:, ['分类', '营业收入']]
    danwei_area = getdanwei(df_area.iloc[0, -1])
    colors = ["#"+hex(random.randint(1, 1e10))[2:].zfill(6)[-6:]
              for _ in range(df_area.shape[0])]
    df_area['colors'] = colors
    df_area.reset_index(drop=True, inplace=True)
    df_area['营业收入'] = df_area["营业收入"].apply(lambda x:x[:-len(danwei_area)])
    res_area = change_df(df_area)

    time.sleep(1)
    return {
        "stockcode": q,
        "chart1-1": ans["开盘-收盘-最高-最低"],
        "chart1-2": ans["振幅-涨跌幅-涨跌额-换手率"],
        "chart2-1": {
            "data": res_product,
            "category": "按产品分",
            "time": time_,
            "danwei": danwei
        },
        "chart2-2": {
            "data": res_area,
            "category": "按地区分",
            "time": time_,
            "danwei": danwei_area
        }
    }


def change_df(df: pd.DataFrame):
    colnames = df.columns
    res = []
    for i in range(df.shape[0]):
        temp = {}
        for ele in colnames:
            temp[ele] = df.loc[i, ele]
        res.append(temp)
    return res


def getdanwei(ele):
    ele = str(ele)
    buf = ''
    for i in range(len(ele)-1, -1, -1):
        if not ele[i].isdigit():
            buf += ele[i]
        else:
            break
    return buf


@app.get("/finance/stock/{q}")
async def get_tock_info(q: str | None = '000001'):
    res = ak.stock_zh_a_hist(symbol=q, period="daily",
                             start_date=begindays,
                             end_date=endays, adjust="qfq")
    d = dict()
    d['日期'] = res['日期'].tolist()
    d['开盘'] = res['开盘'].tolist()
    d['收盘'] = res['收盘'].tolist()
    d['成交量'] = res['成交量'].tolist()
    return {"stockcode": q, "data": d}


@app.get("/random/list/{number}/{length}")
def get_random_list(number: int, length: int):
    res = dict()
    for i in range(number):
        res[i+1] = [random.randint(1, 100) for _ in range(length)]
    return res


@app.get("/hello")
def get_hello():
    return "Welcome"


@app.get("/query/{q}")
def get_repeat(q: str | None = "default name"):
    return "hi "+q
