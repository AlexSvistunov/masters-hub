from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

def upload_photo_profile_services(instance, filename):
    if instance.specialist:
        return f'{settings.BASE_DIR}/static/media/specialist/{instance.specialist.name}/{filename}'
    return f'{settings.BASE_DIR}/static/media/profile/{instance.profile.user}/{filename}'


def upload_photo_profile(instance, filename):
    return f'{settings.BASE_DIR}/static/media/profile/{instance.user}/{filename}'


def upload_photo_user(instance, filename):
    return f'{settings.BASE_DIR}/static/media/users/{instance.username}/{filename}'


def upload_photo_specialist(instance, filename):
    return f'{settings.BASE_DIR}/static/media/specialist/{instance.name}/{filename}'


class Categories(models.Model):
    """Модель категорий."""

    title = models.CharField(
        verbose_name='категория',
        max_length=255
    )
    photo = models.ImageField(
        verbose_name='изображение',
        upload_to='static/media/categories/'
    )
    date_creation = models.DateField(
        verbose_name='дата создания',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    def __str__(self):
        return f'category_{self.title}'


class CustomUser(AbstractUser):
    """Модель юзера"""

    username = models.CharField(
        verbose_name='имя',
        max_length=255,
        unique=True
    )
    email = models.EmailField(
        verbose_name='почта',
        unique=True
    )
    photo = models.ImageField(
        upload_to=upload_photo_user,
        verbose_name='аватарка',
        default='media/users/default.jpg'
    )


class ProfileMaster(models.Model):
    """Профиль студии/мастера"""

    CHOICES = [
        ('master', 'мастер'),
        ('studio', 'студия'),
    ]
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )
    name = models.CharField(
        verbose_name='имя',
        max_length=255,
        blank=True
    )
    categories = models.ManyToManyField(
        Categories,
        blank=True,
        null=True
    )
    photo = models.ImageField(
        upload_to=upload_photo_profile,
        default='media/users/default.jpg'
    )
    address = models.CharField(
        verbose_name='адрес',
        max_length=255,
        blank=True
    )
    phone = models.CharField(
        verbose_name='телефон',
        max_length=255,
        blank=True
    )
    specialization = models.CharField(
        choices=CHOICES,
        max_length=25,
        default='master',
        verbose_name='специализация'
    )
    link_vk = models.URLField(
        verbose_name='ссылка на VK',
        blank=True
    )
    link_tg = models.URLField(
        verbose_name='ссылка на TG',
        blank=True
    )

    description = models.TextField(
        verbose_name='описание',
        blank=True
    )
    time_relax = models.TimeField(
        default='00:30:00',
        verbose_name='время отдыха между процедурами'
    )

    date_creation = models.DateField(
        verbose_name='дата создания',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Профиль мастера/студия'
        verbose_name_plural = 'Профили мастеров/студий'

    def __str__(self):
        return f'profile_{self.user}_{self.specialization}'


class Specialist(models.Model):
    name = models.CharField(
        verbose_name='имя',
        max_length=255
    )
    job = models.CharField(
        verbose_name='кфалификация',
        max_length=50
    )
    description = models.TextField(verbose_name='описание')
    profile = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        related_name='profile_specialist',
        verbose_name='профиль',
        blank=True,
        null=True
    )
    photo = models.ImageField(
        upload_to=upload_photo_specialist,
        verbose_name='аватарка',
        default='media/specialist/default.jpg'
    )

    def __str__(self):
        return f'specialist_{self.profile}_{self.name}'


class ProfileImages(models.Model):
    '''
    модель примеры работ
    '''
    profile = models.ForeignKey(
        ProfileMaster,
        verbose_name='профиль',
        on_delete=models.CASCADE,
        related_name='profile_images',
        blank=True,
        null=True
    )
    specialist = models.ForeignKey(
        Specialist,
        on_delete=models.CASCADE,
        related_name='profile_services',
        verbose_name='специалист',
        blank=True,
        null=True
    )
    image = models.ImageField(
        verbose_name='изображение',
        upload_to=upload_photo_profile_services,
    )
    date_creation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'image_{self.profile}'


class Reviews(models.Model):
    '''
    модель отзывы
    '''
    CHOICES = [
        ('1', 1),
        ('2', 2),
        ('3', 3),
        ('4', 4),
        ('5', 5),
    ]
    profile = models.ForeignKey(
        ProfileMaster,
        on_delete=models.CASCADE,
        related_name='reviews_profile',
        verbose_name='профиль мастера/студии'
    )
    rating_star = models.CharField(
        verbose_name='кол-во звезд',
        choices=CHOICES,
        max_length=1,
        default='5'
    )
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name='пользователь'
    )
    description = models.TextField(verbose_name='описание')
    data_create = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'отзыв'


class Favorites(models.Model):
    '''
    модель избранное
    '''
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='favorites_user',
        verbose_name='пользователь'
    )
    profile = models.ForeignKey(
        ProfileMaster,
        related_name='favorites_profile',
        on_delete=models.CASCADE,
        verbose_name='профиль мастера/студии'
    )
    date_create = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'избранное'

# @receiver(post_save, sender=CustomUser)
# def create_profile(sender, instance, **kwargs):
#     pass
