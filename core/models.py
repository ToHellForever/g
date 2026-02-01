from django.db import models

class Project(models.Model):
    def __str__(self):
        return f"Project {self.id}"

class ProjectPhoto(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='project_photos/')
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Photo {self.id} for Project {self.project.id}"

    class Meta:
        ordering = ['order']
