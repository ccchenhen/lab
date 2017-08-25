from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^chap', views.getChapter, name='chapter'),
    url(r'^exp', views.addExp, name='exp'),
    url(r'', views.index, name='index')
]