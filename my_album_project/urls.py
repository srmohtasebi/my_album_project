from django.contrib import admin
from django.urls import path, include
from orders import views  # اضافه کردن این خط برای استفاده از Viewهای فرانت‌اند

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/orders/', include('orders.urls')),  # شامل کردن مسیرهای API مربوط به orders
    path('', views.home, name='home'),  # مسیر صفحه اصلی
    path('about/', views.about, name='about'),  # مسیر صفحه درباره
    path('contact/', views.contact, name='contact'),  # مسیر صفحه تماس
    path('team/', views.team, name='team'),  # مسیر صفحه تیم
    path('faq/', views.faq, name='faq'),  # مسیر صفحه سوالات متداول
    path('login/', views.login, name='login'),  # مسیر صفحه ورود
]

