# Generated by Django 3.0.8 on 2020-08-09 06:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_auto_20200802_1511'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tweet',
            name='likes',
        ),
    ]
