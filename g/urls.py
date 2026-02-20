from django.contrib import admin
from django.urls import path, include
import debug_toolbar
from django.conf import settings
from django.conf.urls.static import static
from core.views import LandingView, submit_application

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", LandingView.as_view(), name="landing"),
    path('submit-application/', submit_application, name='submit_application'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]