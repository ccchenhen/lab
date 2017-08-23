# coding=utf-8
# author = zhouxin
# date = 2017.8.15
# dexcription
# 分析词汇

import os, django
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lab.server_settings")
django.setup()

from rhyme.worker.rhyme_index import RhymeDct
from rhyme.models import Lrc, Word, Rhyme
from rhyme.worker.settings import RHYMENUM
import xpinyin
import jieba.posseg as pseg
import threading
import time

class AnaRhyme:

    def __init__(self):

        self.pin = xpinyin.Pinyin()
        # 标记是否在循环中

    def _analysis_one(self, lrc):

        # lrc_list = lrc.split('\n')
        n_lrc = lrc.replace('\n', '').replace(' ', '')
        jieba_l = self._jieba_words(n_lrc)

        # for l in lrc_list:
            # 跳过字数不够的词
            # if len(l[0]) <= RHYMENUM:
            #     continue

            # # 切片取得押韵字数
            # n = RHYMENUM * (-1)
            # q_words = l[n:]
            # jieba_l.append(q_words)

        for w in jieba_l:
            words, flag = w
            r = self._analysis_words(words)

            if r:
                rhy = '-'.join(r)
                # 韵脚去重
                try:
                    ry = Rhyme.objects.get(integ=rhy)
                    ry.count += 1
                    ry.save()
                except:
                    ry = Rhyme.objects.create(
                        integ=rhy,
                        num=len(r)

                    )
                    # print(r)
                # 词汇去重
                try:
                    w = Word.objects.get(word=words)
                    w.count += 1
                    w.save()
                except:
                    Word.objects.create(
                        rhyme=ry,
                        word=words,
                        flag=flag
                    )
                    # print(words)


    # jieba 分析歌词行
    def _jieba_words(self, l):
        lst = pseg.cut(l)

        res = []
        for word,flag in lst:
            if len(word) > 1:
                res.append((word,flag))

        return set(res)
    #
    def _analysis_words(self, words):

        word_py = self.pin.get_pinyin((u'{}'.format(words)))
        lst_words = word_py.split('-')
        r = []
        for i in lst_words:

            while True:
                if not i:
                    break
                token = RhymeDct.get(i, None)
                if token:
                    r.append(token)
                    break
                i = i[1:]
        if len(r) == len(words):
            return r

    def main(self):

        query = Lrc.objects.filter(is_alive=True).filter(is_analyzed=False)
        for i in query:
            lrc = i.lrc
            i.is_analyzed = True
            i.save()
            while threading.active_count() > 50:
                time.sleep(3)
            t = threading.Thread(target=self._analysis_one, args=(lrc,))
            t.start()
            t.join()

    # def t2(self):

        # print(next(self._extract()))
        # print('==========')
        # print(next(self._extract()))
        # t = Lrc.get(Lrc.music_id == 493752191)
        # print(t)
        # t = Lrc.select()
        # for i in t:
        #     print(i.music_id)

if __name__ == '__main__':
    ana = AnaRhyme()
    ana.main()