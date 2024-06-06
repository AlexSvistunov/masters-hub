from django.contrib import admin
from .models import Service, Categories


# Register your models here.

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'profile', 'title', 'category', 'price']
    list_filter = ['profile__user', 'category', 'date_creation']


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'date_creation']
    list_display_links = ['id', 'title']
