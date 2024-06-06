from django.db import models
from user.models import ProfileMaster, CustomUser, Specialist


# Create your models here.
class WorkTime(models.Model):
    profile = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        verbose_name='профиль'
    )
    monday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    tuesday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    wednesday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    thursday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    friday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    saturday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )
    sunday = models.CharField(
        max_length=255,
        blank=True,
        help_text='время формата: 00:00-24:00'
    )

    class Meta:
        verbose_name = 'рабочее время мастера/студии'


class Recording(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,

    )
    profile_master = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,

    )
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    date = models.DateField(verbose_name='дата записи')
    time_start = models.TimeField()
    time_end = models.TimeField(
        blank=True,
        null=True
    )
    date_create = models.DateTimeField(
        verbose_name='дата создания записи',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'запись'
