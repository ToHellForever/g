from django.contrib import admin
from .models import Project, ProjectPhoto, AboutCarousel, Service, SubService, Application

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

class SubServiceInline(admin.TabularInline):
    model = SubService
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [SubServiceInline]
    list_display = ('name',)
    search_fields = ('name',)

class SubServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'service', 'price')
    list_filter = ('service',)
    search_fields = ('name', 'service__name')

admin.site.register(Service, ServiceAdmin)
admin.site.register(SubService, SubServiceAdmin)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('created_at',)
