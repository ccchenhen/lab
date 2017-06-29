# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-14 06:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20, verbose_name='工具名')),
                ('insturction', models.CharField(max_length=50, verbose_name='简介')),
                ('image', models.ImageField(upload_to='pic/', verbose_name='缩略图')),
                ('is_alive', models.BooleanField(default=True, verbose_name='是否正常')),
            ],
        ),
    ]
