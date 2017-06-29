from django.shortcuts import render, HttpResponse
from .models import Tool


# 首页
def index(request):
    tools = Tool.objects.all()
    content = {
        'tools': tools
    }
    return render(request, 'tools/index.html', content)


# 在线生成二维码
def qrcode(request):
    return render(request, 'tools/qrcode.html')


# 在线 base64 加密解密
def base64(request):
    return render(request, 'tools/base64.html')


# 在线进制转换
def convertion(request):
    return render(request, 'tools/convertion.html')


# 在线 md-html 转换
def markdown(request):
    return render(request, 'tools/markdown.html')


# 在线 2048
def game2048(request):
    return render(request, 'tools/game2048.html')


# 正则匹配
def reg(request):
    return render(request, 'tools/regexp.html')


# json 美化
def tojson(request):
    return render(request, 'tools/jsonpretty.html')


# crontab识别
def cron(request):
    return render(request, 'tools/crontab.html')


# 状态码查询
def statuscode(request):
    return render(request, 'tools/statuscode.html')