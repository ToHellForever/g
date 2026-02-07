from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from .models import Project, AboutCarousel

class LandingView(TemplateView):
    template_name = "landing.html"
    def get(self, request):
        projects = Project.objects.prefetch_related('photos').all()
        carousel_slides = AboutCarousel.objects.all()
        return render(request, self.template_name, {'projects': projects, 'carousel_slides': carousel_slides})
