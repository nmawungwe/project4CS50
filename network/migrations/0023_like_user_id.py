# Generated by Django 3.0.8 on 2020-08-19 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0022_auto_20200816_1228'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
    ]
