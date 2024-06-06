from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('users', views.UsersViewSet, basename='users')
router.register('favorites', views.FavoritesViewSet, basename='favorites')

urlpatterns = [
    # path('auth/token/login/', views.Test.as_view()),
    path('', include(router.urls))
]