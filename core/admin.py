from django.contrib import admin
from .models import Project, ProjectPhoto, AboutCarousel

class ProjectPhotoInline(admin.StackedInline):
    model = ProjectPhoto
    extra = 4
    max_num = 4

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectPhotoInline]
    list_display = ('name', 'link')

class AboutCarouselAdmin(admin.ModelAdmin):
    list_display = ('image',)

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectPhoto)
admin.site.register(AboutCarousel, AboutCarouselAdmin)
