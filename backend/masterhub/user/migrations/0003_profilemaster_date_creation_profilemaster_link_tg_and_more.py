# Generated by Django 5.0.6 on 2024-05-30 16:26

import django.db.models.deletion
import django.utils.timezone
import user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_customuser_specialization'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilemaster',
            name='date_creation',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='дата создания'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilemaster',
            name='link_tg',
            field=models.URLField(blank=True, verbose_name='ссылка на TG'),
        ),
        migrations.AddField(
            model_name='profilemaster',
            name='link_vk',
            field=models.URLField(blank=True, verbose_name='ссылка на VK'),
        ),
        migrations.AlterField(
            model_name='profilemaster',
            name='description',
            field=models.TextField(blank=True, verbose_name='описание'),
        ),
        migrations.CreateModel(
            name='ProfileImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=user.models.upload_photo_profile, verbose_name='изображение')),
                ('date_creation', models.DateField(auto_now_add=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.profilemaster', verbose_name='профиль')),
            ],
        ),
    ]
