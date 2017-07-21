from django.shortcuts import render
from .models import Project
from django.core.mail import send_mail

# Create your views here.
import logging
logger = logging.getLogger(__name__)

# 首页
def index(request):
    projects = Project.objects.filter(is_active=True)
    content = {
        'projects': projects
    }
    return render(request, 'labpage/index.html', content)

# 皮皮虾
def ppx(request):

    return render(request, 'labpage/ppx.html')


# 贪吃蛇
def snake(request):

    return render(request, 'labpage/snake.html')


# 网络部署
def deploy(request):

    return render(request, 'labpage/deploy.html')


#扫码小程序
def scancode(request):
    return render(request, 'labpage/scanqrcode.html')
