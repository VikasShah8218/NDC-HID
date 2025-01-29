from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/' , include(('apps.accounts.urls'))),
    path('controller/' , include(('apps.controller.urls'))),
    path('employee/' , include(('apps.employee.urls'))),
    path('reports/' , include(('apps.reports.urls'))),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)