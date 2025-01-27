from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *

router = DefaultRouter()
router.register(r'', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('test/', Test.as_view()),
    path('test-message/', test_message),
    *router.urls,
] 