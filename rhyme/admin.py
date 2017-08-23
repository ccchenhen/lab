from django.contrib import admin
from .models import Lrc, Word, Rhyme
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class LrcResource(resources.ModelResource):
    class Meta:
        model = Lrc

@admin.register(Lrc)
class LrcAdmin(ImportExportModelAdmin):
    resource_class = LrcResource
    list_display = ('music_id', 'music_name', 'singer', 'is_alive')
    list_filter = ('is_alive', 'is_analyzed')


class WordResource(resources.ModelResource):
    class Meta:
        model = Word

@admin.register(Word)
class WordAdmin(ImportExportModelAdmin):
    resource_class = WordResource
    list_display = ('rhyme', 'word', 'count', 'flag', 'is_alive')


class RhymeResource(resources.ModelResource):
    class Meta:
        model = Rhyme

@admin.register(Rhyme)
class RhymeAdmin(ImportExportModelAdmin):
    resource_class = RhymeResource
    list_display = ('integ', 'count', 'num', 'is_alive')

