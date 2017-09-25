from django.conf.urls import url
from . import views

urlpatterns = [
    # 主页
    url(r'^$', views.index, name='index'),
    # 根据电影 id 到选择电影院页面
    url(r'^(?P<movie_id>[0-9]+)$', views.movie, name='movie'),
    # ajax 加载电影院信息
    url(r'^cinema$', views.cinema, name='cinema'),
    # ajax 加载电影票信息
    url(r'^tickets$', views.tickets, name='tickets')

]
