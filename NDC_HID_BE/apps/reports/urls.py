from django.urls import path
from .views import *

urlpatterns = [
    path('test/', Test.as_view()),
    path('event-report',EventReport.as_view()),
] 