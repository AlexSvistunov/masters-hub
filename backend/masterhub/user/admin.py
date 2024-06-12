from django.contrib import admin
from .models import CustomUser, ProfileMaster, ProfileImages, Specialist, Reviews, Favorites
from service.models import Service


class SpecialistInline(admin.StackedInline):
    model = Specialist
    extra = 1


class ServiceInline(admin.StackedInline):
    model = Service
    extra = 1


# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email']
    list_display_links = ['id', 'username']


@admin.register(ProfileMaster)
class ProfileMasterAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'specialization']
    list_display_links = ['id', 'name']
    inlines = [SpecialistInline]


@admin.register(ProfileImages)
class ProfileImagesAdmin(admin.ModelAdmin):
    list_display = ['id', 'profile', 'date_creation']
    list_filter = ['profile', 'date_creation']


@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ['id']
    inlines = [ServiceInline]


@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    pass


@admin.register(Favorites)
class FavoritesAdmin(admin.ModelAdmin):
    pass
