from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=100, help_text="Название проекта", default="Без названия")
    link = models.URLField(blank=True, null=True, help_text="Ссылка на проект", default="")

    def __str__(self):
        return self.name

class ProjectPhoto(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='project_photos/')
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Photo {self.id} for Project {self.project.name}"

    class Meta:
        ordering = ['order']

class AboutCarousel(models.Model):
    image = models.ImageField(upload_to='carousel_images/', help_text="Изображение для слайда", blank=True, null=True)

    class Meta:
        verbose_name_plural = "Слайды в карусели"

class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название услуги")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

class SubService(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='subservices', verbose_name="Услуга")
    name = models.CharField(max_length=200, verbose_name="Название подуслуги")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")

    def __str__(self):
        return f"{self.service.name} - {self.name}"

    class Meta:
        verbose_name = "Подуслуга"
        verbose_name_plural = "Подуслуги"
