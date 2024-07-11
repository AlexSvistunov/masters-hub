from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoriesAPIView.as_view()),
    path('catalog/', views.CatalogAPIView.as_view()),
    path('popular/', views.PopularAPIView.as_view()),
]
