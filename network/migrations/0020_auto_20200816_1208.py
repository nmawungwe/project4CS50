# Generated by Django 3.0.8 on 2020-08-16 10:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0019_auto_20200816_1203'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userfollowing',
            options={},
        ),
        migrations.RemoveField(
            model_name='userfollowing',
            name='created',
        ),
    ]