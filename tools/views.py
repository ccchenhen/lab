from django.shortcuts import render, HttpResponse, render_to_response
from .models import Tool, Comment

from.subwords import SUBWORDS

# 首页
def index(request):
    tools = Tool.objects.filter(is_alive=True)
    comments = Comment.objects.filter(is_alive=True).filter(token='tools')[::-1]
    content = {
        'tools': tools,
        'comments': comments
    }
    return render(request, 'tools/index.html', content)


# 在线生成二维码
def qrcode(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='qrcode')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/qrcode.html', content)


# 在线 base64 加密解密
def base64(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='base64')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/base64.html', content)


# 在线进制转换
def convertion(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='conv')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/convertion.html', content)


# 在线 md-html 转换
def markdown(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='md')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/markdown.html', content)


# 在线 2048
def game2048(request):
    return render(request, 'tools/game2048.html')


# 正则匹配
def reg(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='reg')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/regexp.html', content)


# json 美化
def tojson(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='json')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/jsonpretty.html', content)


# crontab识别
def cron(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='cron')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/crontab.html', content)


# 状态码查询
def statuscode(request):
    comments = Comment.objects.filter(is_alive=True).filter(token='sc')[::-1]
    content = {
        'comments': comments
    }
    return render(request, 'tools/statuscode.html',content)


# 处理评论
def comment(request):

    if request.method == 'POST':
        # print(request)
        token = request.POST.get('token')
        content = request.POST.get('context')
        content = sub_words(content)
        ip = request.META['REMOTE_ADDR']
        # print(token, content, ip)
        cmt_ins = Comment.objects.create(
            ip=ip,
            content=content,
            token=token,
        )

        content = {
            'item': cmt_ins
        }

        return render_to_response('tools/comment-inner.html', content)


# 屏蔽词替换
def sub_words(text):

    text = text.strip()
    for word in SUBWORDS:
        text = text.replace(word, '*'*len(word))

    return text
