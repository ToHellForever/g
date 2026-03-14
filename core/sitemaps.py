from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class PostSitemap(Sitemap):
    # Частота изменения страницы: "weekly" (еженедельно), "daily" (ежедневно) и т.д.
    changefreq = "weekly"
    # Приоритет страницы относительно других страниц на сайте (от 0.0 до 1.0)
    priority = 0.9


class StaticViewSitemap(Sitemap):
    # Приоритет для статичных страниц, обычно ниже, чем у динамического контента
    priority = 0.8
    # Частота изменения для статичных страниц
    changefreq = "weekly"

    def items(self):
        # Метод возвращает список имен URL-адресов для статичных страниц
        return ["landing", "privacy_policy"]

    def location(self, item):
        # Для статичных страниц используем функцию reverse для получения URL
        return reverse(item)
