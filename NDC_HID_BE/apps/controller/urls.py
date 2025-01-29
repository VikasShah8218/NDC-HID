from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *

router = DefaultRouter()
router.register(r'cards', Cards, basename='cards')

urlpatterns = [
    path('test/', Test.as_view()),
    path('celery-test/', CeleryTest.as_view()),
    path('celery-status/<str:task_id>', CeleryStatus.as_view()),
    path('celery-stop/<str:task_id>', CeleryStop.as_view()),
    *router.urls,
] 