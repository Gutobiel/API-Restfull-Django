from django.urls import path, include
from rest_framework.routers import DefaultRouter

from crud.views import CrudViewSet

router = DefaultRouter()
router.register('crud', CrudViewSet)

urlpatterns = [
    path('', include(router.urls)),
   
]