from django.contrib import admin
from .models import CinemaUrl, Cover, Movie
# Register your models here.

admin.site.register(Cover)

# admin.site.register()

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    ordering = ('created_time', )
    list_display = ('name', 'rating', 'directors', 'casts', 'genes', 'created_time', 'is_top', 'is_in_theater')
    list_editable = ('is_top', 'is_in_theater')


@admin.register(CinemaUrl)
class CinemaAdmin(admin.ModelAdmin):
    list_display = ('city', 'district', 'location', 'cinema_name', 'view_count', 'code')

