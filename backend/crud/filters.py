from dj_rql.filter_cls import AutoRQLFilterClass
from crud.models import Employee

class EmployeeFilterClass(AutoRQLFilterClass):
    MODEL = Employee
