from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index),
    path('list', views.index),
    path('report', views.index),
    path('event', views.index),
    path('controller', views.index),
    # path('<path:resource>', views.index, name='index')
]