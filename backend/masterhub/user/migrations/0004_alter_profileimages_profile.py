# Generated by Django 5.0.6 on 2024-05-31 03:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_profilemaster_date_creation_profilemaster_link_tg_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileimages',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_images', to='user.profilemaster', verbose_name='профиль'),
        ),
    ]
