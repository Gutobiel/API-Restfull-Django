from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, DjangoModelPermissions, IsAuthenticated
from crud.filters import EmployeeFilterClass

from crud.models import Employee
from crud.serializers import CrudSerializer

from django.shortcuts import render

class CrudViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = CrudSerializer
    permission_classes = [ IsAuthenticated, DjangoModelPermissions]
    rql_filter_class = EmployeeFilterClass

    #""" IsAdminUser """ 