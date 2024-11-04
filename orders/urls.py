from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_order, name='create_order'),  # مسیر API برای ایجاد سفارش
    # مسیرهای دیگر مربوط به API‌ها می‌توانند به اینجا اضافه شوند
]
