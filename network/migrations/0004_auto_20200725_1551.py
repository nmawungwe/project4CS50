# Generated by Django 3.0.8 on 2020-07-25 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20200724_2355'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post',
            new_name='Tweet',
        ),
    ]
