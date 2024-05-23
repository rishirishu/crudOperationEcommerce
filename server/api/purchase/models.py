from django.db import models
from api.users.models import User
from products.models import Product


# Create your models here.

class Purchase(models.Model):
    purchaseId = models.IntegerField(primary_key=True)
    userId = models.ForeignKey(User,on_delete=models.CASCADE)
    productId = models.ForeignKey(Product,on_delete=models.CASCADE)
    purchaseDate = models.DateField(auto_now_add=True)
    deliveryAddress = models.TextField(max_length=100)
    deliveryDate = models.DateField()
