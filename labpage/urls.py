from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^ppx/$', views.ppx, name='ppx'),
    url(r'^snake/$', views.snake, name='snake')
]