# Generated by Django 3.0.6 on 2020-05-21 16:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rating',
            old_name='start',
            new_name='stars',
        ),
    ]
