from rest_framework import serializers
from api.users.models import User


class UserSerailizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= '__all__'