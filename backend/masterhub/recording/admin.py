from django.contrib import admin
from .models import Recording, WorkTime


# Register your models here.
@admin.register(Recording)
class RecordingAdmin(admin.ModelAdmin):
    pass


@admin.register(WorkTime)
class WorkTimeAdmin(admin.ModelAdmin):
    pass
