from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, DjangoModelPermissions

from crud.models import Employee
from crud.serializers import CrudSerializer

from django.shortcuts import render

class CrudViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = CrudSerializer
    permission_classes = [IsAdminUser, DjangoModelPermissions]
    




def home(request):
    return render(request, "home.html")