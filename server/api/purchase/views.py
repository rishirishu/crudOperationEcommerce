from django.shortcuts import render
from rest_framework import viewsets
from api.purchase.models import Purchase
from api.purchase.serializers import PurchaseSerializer

# Create your views here.

class PurchaseViewset(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer