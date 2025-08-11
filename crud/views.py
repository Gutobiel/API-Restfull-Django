from rest_framework import viewsets

from crud.models import Employee
from crud.serializers import CrudSerializer

from django.shortcuts import render

class CrudViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = CrudSerializer



def home(request):
    return render(request, "home.html")