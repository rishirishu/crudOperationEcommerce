from django.db import models

# Create your models here.

class Product(models.Model):
    image = models.ImageField(upload_to='media/uploads/images')
    name = models.CharField(max_length=150, null=False, blank= False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name
    