from django.shortcuts import render, redirect
from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = "landing.html"
    def get(self, request):
        return render(request, self.template_name, {})
            