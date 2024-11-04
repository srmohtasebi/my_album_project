from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order
from .serializers import OrderSerializer

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Order saved successfully!"}, status=201)
    return Response(serializer.errors, status=400)

