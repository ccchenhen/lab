from django.db import models


class Word(models.Model):

    # 单词
    chapter = models.ForeignKey('Chapter', related_name='voca', verbose_name='所属章节', on_delete=models.CASCADE)
    word = models.CharField('单词', max_length=255)
    explansion = models.TextField('解释')
    phonogram = models.CharField('音标', max_length=255)
    is_alive = models.BooleanField('状态', default=True)

    class Meta:
        unique_together = ('chapter', 'word')
        ordering = ['chapter']

    def __str__(self):
        return self.word

    def __unicode__(self):
        return self.chapter


class Chapter(models.Model):

    # 章节
    # 设计为 50 个单词为一组
    chap = models.IntegerField('章节名')

    is_alive = models.BooleanField('状态', default=True)
    is_full = models.BooleanField('是否达到50')

    def __str__(self):
        return str(self.chap)


class Expand(models.Model):

    # 扩展解释
    belong = models.ForeignKey('Word', verbose_name='所属词汇', related_name='expand', on_delete=models.CASCADE)
    explansion = models.TextField('解释')
    is_alive = models.BooleanField('状态', default=True)
