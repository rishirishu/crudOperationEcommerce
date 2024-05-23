# Generated by Django 4.2.7 on 2024-04-17 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='media/uploads/images')),
                ('name', models.CharField(max_length=150)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField()),
                ('category', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]
