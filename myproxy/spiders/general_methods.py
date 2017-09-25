#-*- coding:utf-8 -*-
import requests
import time
from ..models import Proxy
from selenium import webdriver
import time
from functools import wraps

from ..utils.checkip import CheckIp

# 初始化
checkip = CheckIp()

class GeneralMethods():

    def __init__(self):

        self.all_items = Proxy.objects.all()

    def save_proxy(self,resource,ip,port,head, district='其他', http_type='O'):
        '''verifies and saves a IP

        :param resource: which website this IP comes from
        :param ip:  IP in string
        :param port : IP port
        :param head : IP head , http or https
        :param district : where this IP's location
        :param http_type: which type this IP is, 'O' stands for 其他 ,'G' for 高匿,'T' for 透明
        :return:
        '''
        # 查重
        try:
            query = self.all_items.get(ip=ip)
            return
        except:
            pass

        # 不验证直接存储
        Proxy.objects.create(
            resourse=resource,
            ip=ip,
            port=port,
            head=head,
            status='V',
            district=district,
            type=http_type
        )

    # 由于性能不稳定
    # 涉及到 selenium 的方法都已经弃用
    def get_cookie_by_selenium(self, url):
        '''使用 selenium 获取 cookie

        :param url: 获取 cookie 的地址
        :return: 返回字符串形式的
        '''
        try:
            driver = webdriver.PhantomJS()
            driver.get(url)
            cookie = [item["name"] + "=" + item["value"] for item in driver.get_cookies()]
            cookiestr = ';'.join(item for item in cookie)
            driver.quit()
            return cookiestr
        except Exception as e:
            print(e)

    # 由于性能不稳定
    # 涉及到 selenium 的方法都已经弃用
    def get_source_by_selenium(self, url):
        try:
            driver = webdriver.PhantomJS()
            driver.get(url)

            page_state = ''
            while True:
                page_state = driver.execute_script('return document.readyState;')
                if page_state == 'complete':
                    break
                time.sleep(3)


            return driver.page_source
        except Exception as e:
            print(e)


    def req_url(self,url, headers, rep_count=1):
        ''' 请求网页，返回 bs 处理过的字符串

        请求过程如果对方拒绝或者状态码不为 200 ，调用 selenium 重新获取 cookie,然后再次请求
        再失败，就直接返回 None

        :param url: 请求地址
        :param headers: 请求头
        :param rep_count: 请求次数，默认为 1，
        :return: bs4 处理过的网页
        '''
        try:
            req = requests.get(url, headers=headers, timeout=2)
            assert req.status_code == 200
        except Exception as e:

            # if rep_count == 1:
            #     # logging.warning('url：%s 第一次报错，已经跳转重新获取 Cookie,报错信息：%s' %(url,e))
            #     cookie = self.get_cookie_by_selenium(url)
            #     headers['Cookie'] = cookie
            #     return self.req_url(url, headers, rep_count=2)
            # else:
            print('url：%s 报错，报错信息：%s' %(url,e))
            return None

        else:
            return req.text

#
    def printprocesstime(self, func):
        @wraps(func)
        def wrap():
            print('start {0} at {1}'.format(func.__name__, time.ctime()))
            return func()
            print('end {0} at {1}'.format(func.__name__, time.ctime()))

        return wrap

    
