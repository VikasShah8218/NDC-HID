from apps.accounts.serializers import (UserDetailsSerializer)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import  status
from rest_framework.views import APIView
from django.utils import timezone

class Test(APIView):
    def post(self, request):
        return Response({"detail":"this is working"})

class LoginUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            # Token.objects.filter(user=user).delete()    
            token, _ = Token.objects.get_or_create(user=user)
            user_data = UserDetailsSerializer(user).data
            user_data['token'] = token.key
            user.last_login = timezone.now()
            user.save()
            return Response(user_data, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "User logged out"}, status=200)
