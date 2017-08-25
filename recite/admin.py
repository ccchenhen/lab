from django.contrib import admin
from .models import Chapter, Word, Expand
from import_export import resources
from import_export.admin import ImportExportModelAdmin

class WordResource(resources.ModelResource):
    class Meta:
        model = Word

@admin.register(Word)
class WordAdmin(ImportExportModelAdmin):
    resource_class = WordResource
    list_display = ('word', 'explansion', 'phonogram')


class ChapterResource(resources.ModelResource):
    class Meta:
        model = Chapter

@admin.register(Chapter)
class ChapterAdmin(ImportExportModelAdmin):
    resource_class = ChapterResource
    list_display = ('chap', 'is_full')


class ExpandResource(resources.ModelResource):
    class Meta:
        model = Expand


@admin.register(Expand)
class ExpandAdmin(ImportExportModelAdmin):
    resource_class = ExpandResource
    list_display = ('belong', 'explansion')
