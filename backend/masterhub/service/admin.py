from django.contrib import admin

from user.models import ProfileMaster
from .models import Service, Categories


# Register your models here.




@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price', 'category', 'specialist']
    list_filter = ['profile__user',  'date_creation', 'category']


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'date_creation']
    list_display_links = ['id', 'title']
