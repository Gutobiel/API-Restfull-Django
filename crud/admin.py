from django.contrib import admin

from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'cpf', 'position', 'wage', 'created_at', 'updated_at', 'exit_time')
    search_fields = ('name', 'cpf', 'position')
    list_filter = ('position', 'created_at')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 20