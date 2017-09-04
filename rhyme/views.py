from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import Word, Rhyme
import xpinyin
from rhyme.worker.rhyme_index import RhymeDct


def index(request):

    return render(request, 'rhyme/index2.html')


def query(request):

    if request.method == 'GET':

        word = request.GET.get('word')
        # print(word)
        if not word or len(word) < 2:
            return JsonResponse({'code': 0})

        res = {}
        res[word] = query_word(word)
        # print(res)
        return JsonResponse(res)


def query_word(word):

    p = xpinyin.Pinyin()
    piny = p.get_pinyin(word)
    wlst = piny.split('-')
    rhyme_l = []

    for i in wlst:

        while True:
            if i == '':
                rhyme_l.append('none')
                break
            r = RhymeDct.get(i, None)
            if r:
                rhyme_l.append(r)
                break

            i = i[1:]

    rhyme_r = []
    for idx in range(len(rhyme_l)-1):

        s = '-'.join(rhyme_l[idx:])
        r_s = get_words(s)
        if r_s:
            rhyme_r += r_s

    rhyme_r.sort(key=lambda x: x[1], reverse=True)
    return rhyme_r


def get_words(integ):

    q = Rhyme.objects.filter(integ=integ)
    if not q:
        return

    res = []
    words = q[0].word_set.all()
    for w in words:
        res.append((w.word, w.count))

    return res





