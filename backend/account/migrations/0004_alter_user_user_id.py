# Generated by Django 4.2.6 on 2023-11-29 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_user_is_admin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.UUIDField(blank=True, null=True),
        ),
    ]