# coding=utf-8
# author = zhouxin
# description
# 将 csv 中的数据转义到数据库中

import os, django
import sys
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lab.settings")
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "recruitment.settings")
django.setup()

from recite.models import Word, Chapter
import csv
import peewee
from recite.models_exp import NewWord



class Utils:

    def __init__(self):

        self.filepath = 'python-words-new(juicy).csv'

    # 读取 csv 文件
    def open_csv(self):

        with open(self.filepath, 'r', encoding='gbk', errors='ignore') as f:

            reader = csv.reader(f, delimiter=',')
            lst = []
            for i in reader:
                lst.append(i[0].lower())

        return lst

    # 从数据库内读取单词
    def get_word(self, word):

        query = NewWord.select().where(NewWord.name == word)

        try:
            assert query[0].name == word
            w = query[0]
            return [w.name, w.phonogram, w.explanation]

        except:
            print('未找到',word)

    #　通过 django-orm 存单词
    def create_word(self, lst, chapter):

        try:
            Word.objects.create(
                chapter=chapter,
                word=lst[0],
                explansion=lst[2],
                phonogram=lst[1]
            )
        except Exception as e:
            print(e)
    # 创建章节
    def creat_chapter(self, nth):
        try:
            new = Chapter.objects.create(
                chapter=nth,
                is_full=False
            )

            return new

        except Exception as e:
            print(e)

    # 每个单元仅包含 50 个单词
    # 所以要检测单元是否满了
    def full_chapter(self, chapter):

        chapter.is_full = True
        chapter.save()

    # 主函数
    def main(self):

        word_lst = self.open_csv()
        count = 0
        chap = 1
        new_chap = self.creat_chapter(chap)
        for w in word_lst:

            word_once = self.get_word(w)
            if count == 50:
                chap += 1
                self.full_chapter(new_chap)
                new_chap = self.creat_chapter(chap)
                count = 1

            self.create_word(word_once, new_chap)

            count += 1

    def tdb(self):

        query = NewWord.select()
        for i in query:
            print(i)
            break

if __name__ == '__main__':
    u = Utils()
    u.main()