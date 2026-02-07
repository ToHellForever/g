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
