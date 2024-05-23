from django.shortcuts import render
from rest_framework import viewsets
from api.users.models import User
from api.users.serializers import UserSerailizer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .userfilters import UserFilter
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Create your views here.

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerailizer
    filter_backends = [DjangoFilterBackend,SearchFilter,OrderingFilter]
    filterset_class = UserFilter
    ordering_fields = (
        'email',
        'firstName',
        'lastName',
        'address'
    )

    ordering = ('email')
    search_fields = (
        'email',
        'firstName',
        'lastName',
        'address'
    )


class Register(APIView):
    def post(self,request):
        
        return 
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.password==password:
            token = self.generate_token(user)
            serializer = UserSerailizer(user)
            serialized_data = serializer.data
            return Response({'token': str(token),'user':serialized_data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def generate_token(self, user):
        token_serializer = TokenObtainPairSerializer()
        token = token_serializer.get_token(user)
        return str(token.access_token)



class LogoutView(APIView):
    pass
    # permission_classes = [AllowAny]

    # def post(self,request):
    #     refresh_token = request.data["token"]
    #     token = RefreshToken(refresh_token)
    #     token.blacklist()
    #     return Response('Token deleted succesfully',status=status.HTTP_200_OK)



