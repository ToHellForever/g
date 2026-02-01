from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from .models import Project

class LandingView(TemplateView):
    template_name = "landing.html"
    def get(self, request):
        projects = Project.objects.prefetch_related('photos').all()
        return render(request, self.template_name, {'projects': projects})