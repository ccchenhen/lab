from django.db import models

# Create your models here.

class Project(models.Model):

    title = models.CharField('项目名', max_length=30)
    abstract = models.TextField('简介')
    image = models.ImageField('配图', upload_to='pic/')
    author = models.CharField('作者', max_length=20)
    url_mark = models.CharField('url标记', max_length=20)
    content = models.TextField('内容', default=None)
    is_active = models.BooleanField('有效', default=True)
    # click_count = models.PositiveIntegerField('点击数', default=0)
    created_time = models.DateField('创建日期', auto_now=True)
    modified_time = models.DateTimeField('修改时间', auto_now_add=True)

    def __str__(self):
        return self.title