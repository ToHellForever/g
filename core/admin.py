from django.contrib import admin
from .models import Project, ProjectPhoto

class ProjectPhotoInline(admin.StackedInline):
    model = ProjectPhoto
    extra = 4
    max_num = 4

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectPhotoInline]
    list_display = ('name', 'link')

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectPhoto)
