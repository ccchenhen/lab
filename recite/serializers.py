# coding=utf-8
from rest_framework import serializers
from recite.models import Word, Chapter, Expand

class ExpandSerializer(serializers.ModelSerializer):

    class Meta:

        model = Expand
        fields = ('explansion', )

class WordSerializer(serializers.ModelSerializer):

    # chapter_ = serializers.CharField(source='chapter.chapter')

    expand = ExpandSerializer(many=True)
    class Meta:
        model = Word
        fields = ('id', 'word', 'explansion', 'phonogram', 'expand')


class ChapterSerializer(serializers.ModelSerializer):

    voca = WordSerializer(many=True)
    class Meta:
        model = Chapter
        fields = ('id', 'chap', 'is_alive', 'voca')


