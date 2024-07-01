from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('admin-panel/profile', views.ProfileAdminViewSet, basename='admin_panel')

urlpatterns = [
    path('', include(router.urls)),

]
