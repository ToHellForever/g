from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project, AboutCarousel, Service, Application
import json

class LandingView(TemplateView):
    template_name = "landing.html"
    def get(self, request):
        projects = Project.objects.prefetch_related('photos').all()
        carousel_slides = AboutCarousel.objects.all()
        services = Service.objects.prefetch_related('subservices').all()
        return render(request, self.template_name, {
            'projects': projects,
            'carousel_slides': carousel_slides,
            'services': services
        })

@csrf_exempt
def submit_application(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            application = Application.objects.create(
                name=data.get('name', ''),
                email=data.get('email', ''),
                phone=data.get('phone', ''),
                message=data.get('message', '')
            )
            return JsonResponse({'status': 'success', 'id': application.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

