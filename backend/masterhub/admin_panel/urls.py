from rest_framework.urls import path
from . import views
from django.urls import include

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('profile', views.ProfileAPIViewSet, basename='admin-panel_profile')
router.register('specialist', views.SpecialistAPIViewSet, basename='admin-panel_specialist')
router.register('service', views.ServiceAPIViewSet, basename='admin-panel_service')
router.register('categories', views.CategoriesAPIViewSet, basename='admin-panel_categories')
router.register('images', views.WorkImagesAPIViewSet, basename='admin-panel_work-images')
router.register('recording', views.RecordingAPIViewSet, basename='admin-panel_recording')
router.register('work-time', views.WorkTimeAPIViewSet, basename='admin-panel_work-time')
router.register('reviews', views.ReviewsAPIViewSet, basename='admin-panel_review')

urlpatterns = [
    path('', include(router.urls)),

]
