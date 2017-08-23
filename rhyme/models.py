from django.db import models


class Lrc(models.Model):

    music_id = models.IntegerField('音乐ID')
    music_name = models.CharField('音乐名', max_length=255)
    singer = models.CharField('歌手', max_length=255)
    lrc = models.TextField('歌词')
    is_analyzed = models.BooleanField('是否分析过', default=False)
    is_alive = models.BooleanField('是否可用', default=True)


class Rhyme(models.Model):

    integ = models.CharField('押韵组合', max_length=255)
    count = models.IntegerField('韵脚数', default=1)
    num = models.IntegerField('押韵字数', default=2)

    is_alive = models.BooleanField('是否可用', default=True)

    def __str__(self):
        return self.integ


class Word(models.Model):

    rhyme = models.ForeignKey('Rhyme', verbose_name='押韵词汇')
    word = models.CharField('押韵词汇', max_length=255)
    count = models.IntegerField('计数', default=1)
    flag = models.CharField('词性', max_length=255)

    is_alive = models.BooleanField('是否可用', default=True)