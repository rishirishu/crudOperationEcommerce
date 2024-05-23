from django.db import models


# Create your models here.

class User(models.Model):
    email = models.EmailField(max_length=50)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    address = models.TextField(max_length=200,blank=True)
    phone = models.CharField(max_length=10)
    password = models.CharField( max_length=50)

    def __str__(self):
        return f'{self.firstName}({self.email})'