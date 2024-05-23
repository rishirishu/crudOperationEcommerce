from django.urls import path, include
from .views import UserViewset, LoginView,LogoutView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

router = routers.DefaultRouter()

router.register('detail',UserViewset,basename='user_detail')


urlpatterns = [
    path('',include(router.urls)),
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='login'),
    path('gettoken/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('refreshtoken/',TokenRefreshView.as_view(),name='token_refresh'),
    path('verifytoken/',TokenVerifyView.as_view(),name='token_verify'),
]