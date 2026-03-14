from django.contrib import admin
from django.urls import path, include
import debug_toolbar
from django.conf import settings
from django.conf.urls.static import static
from core.views import LandingView, submit_application

from django.contrib.sitemaps.views import sitemap
from core.sitemaps import PostSitemap, StaticViewSitemap

sitemaps = {
    "posts": PostSitemap,
    "static": StaticViewSitemap,
}

urlpatterns = [
    path("secure-control-panel-9374/", admin.site.urls),
    path("", LandingView.as_view(), name="landing"),
    path(
        "privacy-policy/",
        LandingView.as_view(template_name="privacy_policy.html"),
        name="privacy_policy",
    ),
    path("submit-application/", submit_application, name="submit_application"),
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]
