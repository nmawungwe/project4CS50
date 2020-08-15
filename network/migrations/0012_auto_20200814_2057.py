# Generated by Django 3.0.8 on 2020-08-14 18:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0011_auto_20200814_2051'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userfollowing',
            options={'ordering': ['-created']},
        ),
        migrations.AddField(
            model_name='userfollowing',
            name='created',
            field=models.DateTimeField(auto_now_add=True, db_index=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
