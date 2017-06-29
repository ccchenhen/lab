from django.db import models

class Tool(models.Model):

    title = models.CharField('工具名', max_length=20)
    instruction = models.CharField('简介', max_length=50)
    mark = models.CharField('URL标记', max_length=20, default='#')
    image = models.ImageField('缩略图', upload_to='tools/pic/')
    is_alive = models.BooleanField('是否正常', default=True)

    def __str__(self):
        return self.title
