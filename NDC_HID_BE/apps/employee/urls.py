from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *

router = DefaultRouter()
router.register('view', EmployeeViewSet, basename='employee')
router.register('department-view', DepartmentViewSet, basename='department')

urlpatterns = [
    path('test/', Test.as_view()),
    path('test-message/', test_message),
    path('department/', test_message),
    path('emp-img/<int:id>', image_pic),
    *router.urls,
] 