# Generated by Django 5.1.5 on 2025-01-24 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('controller', '0006_card_allot_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='facility_code',
            field=models.IntegerField(blank=True, db_index=True, null=True),
        ),
    ]
