from django.shortcuts import render
from django.http import  HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Word, Chapter, Expand
from .serializers import WordSerializer, ChapterSerializer
import re

# Create your views here.

@csrf_exempt
def index(request):


    return render(request, 'recite/index.html')

def getChapter(request):

    if request.method == 'GET':

        chap = request.GET.get('c', 1)
        chapter = Chapter.objects.get(pk=int(chap))
        serializer_c = ChapterSerializer(chapter)
        return JsonResponse(serializer_c.data)
        # pass


def addExp(request):

    if request.method == 'GET':

        ipt = request.GET.get('text', None)
        wid = request.GET.get('wid', None)

        if not ipt or len(ipt) < 1:
            return JsonResponse({'code':0})
        if not wid or (not re.match('^\d+$', wid)):
            return JsonResponse({'code': 0})

        try:
            belong = Word.objects.get(id=int(wid))
        except:
            return JsonResponse({'code': 0})

        Expand.objects.create(
            belong=belong,
            explansion=ipt
        )

        return JsonResponse({'code': 1})