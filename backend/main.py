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

clist = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#365314']
sepdays = 90
endays: str = datetime.now().strftime('%Y%m%d')
begindays: str = (datetime.now() - timedelta(days=sepdays)
                  ).strftime('%Y%m%d')


@app.get("/finance/info/{q}")
async def get_info(q: str | None = "000001"):
    flag1 = True
    flag2 = True
    ans = dict({
        "开盘-收盘-最高-最低": [],
        "振幅-涨跌幅-涨跌额-换手率": []
    })
    try:
        res1 = ak.stock_zh_a_hist(symbol=q, period="daily",
                                start_date=begindays,
                                end_date=endays, adjust="qfq")
    except:
        flag1 = False
    length = res1.shape[0]
    if flag1 and length != 0:    
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
        
    res_product = []
    res_area = []
    try:
        df_origin = ak.stock_zygc_ym(symbol=q)
    except:
        flag2 = False
    if flag2:
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
        colors = random.sample(clist, df_product.shape[0])
        df_product['fill'] = colors
        df_product.reset_index(drop=True, inplace=True)
        df_product['营业收入'] = df_product['营业收入'].apply(lambda x: float(x[:-len(danwei)]))##!!注意数值类型的转换
        res_product = change_df(df_product)
        ## 获取按地区分
        df_area = df.loc[(df['分类方向'] == "按地区分") & (
            df['分类'] != '合计')].loc[:, ['分类', '营业收入']]
        danwei_area = getdanwei(df_area.iloc[0, -1])
        colors = random.sample(clist, df_area.shape[0])
        df_area['fill'] = colors
        df_area.reset_index(drop=True, inplace=True)
        df_area['营业收入'] = df_area["营业收入"].apply(lambda x:float(x[:-len(danwei_area)]))
        res_area = change_df(df_area)

    ## 信息查询
    flag3 = True
    try:
        res = ak.stock_profile_cninfo(symbol=q)
    except:
        flag3 = False
    
    info = []
    if flag3 and res.shape[0] != 0:
        for ele in res.columns:
            if res.loc[0, ele] == None:
                continue
            content = str(res.loc[0, ele])
            if len(content) > 70:
                content = content[:50] + '...'
            info.append({"key":ele, "val":content})

    return {
        "stockcode": q,
        "chart1-1": ans["开盘-收盘-最高-最低"],
        "chart1-2": ans["振幅-涨跌幅-涨跌额-换手率"],
        "chart2-1": res_product,
        "chart2-2": res_area,
        "info":info
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
