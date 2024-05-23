from django_filters import rest_framework as filters
from .models import User
class UserFilter(filters.FilterSet):
    email = filters.CharFilter(field_name="email",
                                      lookup_expr='icontains')
    firstName = filters.CharFilter(field_name="firstName",
                                      lookup_expr='icontains')
    lastName = filters.CharFilter(field_name="lastName",
                                      lookup_expr='icontains')
    address = filters.CharFilter(field_name="address",
                                        lookup_expr='icontains')

    class Meta:
        model = User
        fields = ('email',
        'firstName',
        'lastName',
        'address')