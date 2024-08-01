from rest_framework.urls import path
from . import views
from django.urls import include

from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('profile', views.ProfileAPIView, basename='admin-panel_profile')

urlpatterns = [
    path('', include(router.urls)),

]