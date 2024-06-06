# Generated by Django 5.0.6 on 2024-05-30 10:32

import django.db.models.deletion
import service.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='категория')),
                ('photo', models.ImageField(upload_to='media/categories', verbose_name='изображение')),
                ('date_creation', models.DateField(auto_now_add=True, verbose_name='дата создания')),
            ],
            options={
                'verbose_name': 'категория',
                'verbose_name_plural': 'категории',
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, verbose_name='заголовок')),
                ('description', models.TextField(blank=True, verbose_name='описание')),
                ('price', models.IntegerField(default=0, verbose_name='цена')),
                ('photo', models.ImageField(blank=True, upload_to=service.models.upload_photo_service, verbose_name='изображение')),
                ('date_creation', models.DateField(auto_now_add=True, verbose_name='дата создания')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='service.categories', verbose_name='категория')),
            ],
            options={
                'verbose_name': 'услуга',
                'verbose_name_plural': 'услуги',
            },
        ),
    ]
