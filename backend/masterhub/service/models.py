from django.db import models
# from user.models import CustomUser
# Create your models here.
from django.conf import settings
from user.models import ProfileMaster, Specialist, Categories


def upload_photo_service(instance, filename):

    if instance.profile:
        return f'{settings.BASE_DIR}/static/media/service/{instance.profile.user}/{filename}'
    else:
        return f'{settings.BASE_DIR}/static/media/service/{instance.specialist.name}/{filename}'


class Service(models.Model):
    """Модель услуг."""

    profile = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        related_name='profile_services',
        blank=True,
        null=True,
        verbose_name='профиль мастера'
    )
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name='specialist_services',
        blank=True,
        null=True,
        verbose_name='специалист'
    )
    title = models.CharField(
        verbose_name='заголовок',
        max_length=255,
        blank=True
    )
    description = models.TextField(
        verbose_name='описание',
        blank=True
    )
    price = models.IntegerField(
        verbose_name='цена',
        default=0
    )
    time = models.TimeField(
        verbose_name='время процедуры',
        blank=True,
        null=True
    )
    photo = models.ImageField(
        verbose_name='изображение',
        upload_to=upload_photo_service,
    )
    category = models.ForeignKey(
        Categories,
        verbose_name='категория',
        on_delete=models.CASCADE,

    )
    date_creation = models.DateField(
        verbose_name='дата создания',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'услуга'
        verbose_name_plural = 'услуги'

    def __str__(self):
        return f'service_{self.title}'
