from django.shortcuts import render
from .models import Project

# Create your views here.

# 首页
def index(request):
    projects = Project.objects.all()
    content = {
        'projects': projects
    }
    return render(request, 'labpage/index.html', content)


# 皮皮虾
def ppx(request):
    project_ppx = Project.objects.get(url_mark='ppx')
    print(project_ppx.content)
    content = {
        'project': project_ppx
    }
    return render(request, 'labpage/ppx.html', content)


# 贪吃蛇
def snake(request):

    return render(request, 'labpage/snake.html')
