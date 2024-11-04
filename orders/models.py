from django.db import models

class Order(models.Model):
    options = models.TextField()  # ذخیره گزینه‌های انتخابی
    description = models.TextField()  # توضیحات سفارش
    name = models.CharField(max_length=100)  # نام مشتری
    phone = models.CharField(max_length=15)  # شماره تماس

    def __str__(self):
        return f"Order by {self.name}"

