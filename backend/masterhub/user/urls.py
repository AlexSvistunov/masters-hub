from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('users', views.UsersViewSet, basename='users')
router.register('favorites', views.FavoritesViewSet, basename='favorites')

urlpatterns = [
    # path('auth/token/login/', views.Test.as_view()),
    path('', include(router.urls)),
    path('services/<int:pk>/', views.ServicesProfileAPIView.as_view()),
    path('reviews/<int:pk>/', views.ReviewsProfileAPIView.as_view()),
    path('specialist/<int:pk>/', views.SpecialistAPIView.as_view()),
    path('feedback/<int:pk>/', views.FeedbackAPIView.as_view()),

]
