from rest_framework import serializers
from crud.models import Employee

class CrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'