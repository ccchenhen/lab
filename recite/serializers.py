# coding=utf-8
from rest_framework import serializers
from recite.models import Word, Chapter, Expand


class ExpandSerializer(serializers.ModelSerializer):
    class Meta:

        model = Expand
        fields = ('explansion', )


class WordSerializer(serializers.ModelSerializer):
    expand = serializers.SerializerMethodField()

    class Meta:
        model = Word
        fields = ('id', 'word', 'explansion', 'phonogram', 'expand')

    def get_expand(self, obj):
        qs = obj.expand.filter(is_alive=True)
        serializer = ExpandSerializer(qs, many=True)
        return serializer.data

class ChapterSerializer(serializers.ModelSerializer):
    voca = WordSerializer(many=True)

    class Meta:
        model = Chapter
        fields = ('id', 'chap', 'is_alive', 'voca')


