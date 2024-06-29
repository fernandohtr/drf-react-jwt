from accounts.models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin): ...
