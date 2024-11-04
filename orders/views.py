from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render  # برای نمایش قالب‌های HTML
from .models import Order
from .serializers import OrderSerializer

# API برای ایجاد سفارش
@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Order saved successfully!"}, status=201)
    return Response(serializer.errors, status=400)

# Viewهای صفحات فرانت‌اند
def home(request):
    return render(request, 'templates/frontend/index.html')

def about(request):
    return render(request, 'templates/frontend/about.html')

def contact(request):
    return render(request, 'templates/frontend/contact.html')

def team(request):
    return render(request, 'templates/frontend/team.html')

def faq(request):
    return render(request, 'templates/frontend/faq.html')

def login(request):
    return render(request, 'templates/frontend/login.html')
