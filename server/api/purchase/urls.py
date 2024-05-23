from django.urls import path, include
from .views import PurchaseViewset
from rest_framework import routers

router = routers.DefaultRouter()

router.register('product',PurchaseViewset,basename='purchase')


urlpatterns = [
    path('',include(router.urls))
]