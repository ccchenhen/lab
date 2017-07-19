from django.db import models

class Tool(models.Model):

    title = models.CharField('工具名', max_length=20)
    instruction = models.CharField('简介', max_length=50)
    mark = models.CharField('URL标记', max_length=20, default='#')
    image = models.ImageField('缩略图', upload_to='tools/pic/')
    is_alive = models.BooleanField('是否正常', default=True)

    def __str__(self):
        return self.title


class Comment(models.Model):

    ip = models.CharField('IP地址', max_length=50)
    content = models.TextField('评论内容')
    token = models.CharField('页面标记', max_length=50, default='index')
    likes = models.IntegerField('点赞数', default=0)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    update_time = models.DateTimeField('最后编辑',auto_now=True)
    is_alive = models.BooleanField('是否显示', default=True)

    def __str__(self):
        return self.content


