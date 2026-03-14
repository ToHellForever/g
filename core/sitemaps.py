from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class PostSitemap(Sitemap):
    # Частота изменения страницы: "weekly" (еженедельно), "daily" (ежедневно) и т.д.
    changefreq = "weekly"
    # Приоритет страницы относительно других страниц на сайте (от 0.0 до 1.0)
    priority = 0.9

    def items(self):
        # Метод возвращает QuerySet объектов, для которых будут сгенерированы URL
        # В данном случае, это опубликованные посты блога
        return Post.objects.filter(is_published=True)

    def lastmod(self, obj):
        # Метод возвращает дату последнего изменения объекта.
        # Используется для информирования поисковиков об актуальности контента.
        return obj.updated_at

    def location(self, obj):
        # Метод возвращает абсолютный URL для каждого объекта.
        # Здесь мы вручную строим URL, чтобы избежать зависимости от метода get_absolute_url
        # и обеспечить точную структуру URL для sitemap.
        return f"/blog/{obj.slug}/"


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
