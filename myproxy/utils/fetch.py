#-*- coding:utf-8 -*-

import datetime
from ..spiders import xici, sixsix, kuaidaili, ip181


XICI = xici.fetch_xici
SIXSIX = sixsix.fetch_ss
KUAIDAILI = kuaidaili.fetch_k1
IP181 = ip181.ip181


# 多线程
funcs = [XICI,SIXSIX,KUAIDAILI,IP181]
hour = datetime.datetime.today().hour

def crawl():
    '''
    print('crawling')

    threads = []
    for i in range(len(funcs)):
        t = threading.Thread(target=funcs[i])
        threads.append(t)
    for i in range(len(funcs)):
        threads[i].start()
    for i in range(len(funcs)):
        threads[i].join()

    print('finished')
    '''
    # print(time.ctime())
    nt = nowturn(funcs, hour)
    nfunc = funcs[nt]
    nfunc()
    # print(time.ctime())


def nowturn(lst, time):

    r = time // (len(lst))
    t = r * len(lst)
    return time - t



    


