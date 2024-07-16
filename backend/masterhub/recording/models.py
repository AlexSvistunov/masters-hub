from django.db import models
from user.models import ProfileMaster, CustomUser, Specialist
from service.models import Service


# Create your models here.
class WorkTime(models.Model):
    profile = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        verbose_name='профиль',
        blank=True,
        null=True
    )
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name='work_time',
        blank=True,
        null=True
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
        related_name='user_recordings'

    )
    profile_master = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        related_name='profile_recordings',
        blank=True,
        null=True

    )
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    service = models.ForeignKey(
        Service,
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
    name = models.CharField(
        max_length=20,
        verbose_name='Имя',
        blank=True,
        null=True
    )

    surname = models.CharField(
        max_length=20,
        verbose_name='Фамилия',
        blank=True,
        null=True
    )
    phone = models.CharField(
        max_length=20,
        verbose_name='Номер',
        blank=True,
        null=True
    )
    date_create = models.DateTimeField(
        verbose_name='дата создания записи',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'запись'
