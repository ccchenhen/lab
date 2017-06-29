from django.conf.urls import url
from . import views


urlpatterns = [
    url('^$', views.index, name='index'),
    # 工具
    url('^qrcode/$', views.qrcode, name='qrcode'),
    url('^base64/$', views.base64, name='base64'),
    url('^conv/$', views.convertion, name='conv'),
    url('^md/$', views.markdown, name='markdown'),
    url('^game2048/$', views.game2048, name='game2048'),
    url('^reg/$', views.reg, name='reg'),
    url('^json/$', views.tojson, name='tojson'),
    url('^cron/$', views.cron, name='cron'),
    url('^sc/$', views.statuscode, name='statuscode')

]