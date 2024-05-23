from django_filters import rest_framework as filters
from .models import Product

class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name",
                                      lookup_expr='icontains')
    price = filters.CharFilter(field_name="price",
                                      lookup_expr='icontains')
    description = filters.CharFilter(field_name="description",
                                      lookup_expr='icontains')
    category = filters.CharFilter(field_name="category",
                                        lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ( "name", "price","description", "category",)
