# Generated by Django 5.0.6 on 2024-06-17 05:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recording', '0007_worktime_service'),
        ('service', '0013_service_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='worktime',
            name='service',
        ),
        migrations.AddField(
            model_name='recording',
            name='service',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='service.service'),
        ),
    ]
