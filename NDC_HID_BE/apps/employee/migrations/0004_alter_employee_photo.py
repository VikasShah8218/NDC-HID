# Generated by Django 5.1.5 on 2025-01-27 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_alter_employee_cpf_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='photo',
            field=models.TextField(blank=True, null=True),
        ),
    ]
