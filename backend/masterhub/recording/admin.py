from django.contrib import admin
from .models import WorkTime, Recording


# Register your models here.


@admin.register(WorkTime)
class WorkTimeAdmin(admin.ModelAdmin):
    pass


@admin.register(Recording)
class RecordingAdmin(admin.ModelAdmin):
    pass