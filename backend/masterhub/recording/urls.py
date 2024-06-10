from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('recording', views.SpecialistRecordingAPIView, basename='recording')

urlpatterns = [
    path('', include(router.urls))

]
