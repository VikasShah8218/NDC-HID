from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

prefix = "api"

urlpatterns = [
    path(f'{prefix}/admin/', admin.site.urls),
    path(f'{prefix}/accounts/' , include(('apps.accounts.urls'))),
    path(f'{prefix}/controller/' , include(('apps.controller.urls'))),
    path(f'{prefix}/employee/' , include(('apps.employee.urls'))),
    path(f'{prefix}/reports/' , include(('apps.reports.urls'))),
    path('',include(('apps.home.urls'))),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)