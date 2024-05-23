from django.contrib import admin

from api.users.models import User

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['email','firstName','lastName','address','phone']

admin.site.register(User, UserAdmin)