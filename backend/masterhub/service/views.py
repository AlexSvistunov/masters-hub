from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from .serializers import CategoriesSerializer, ProfileCatalogSerialize
from .models import Service, Categories
from rest_framework.mixins import ListModelMixin
from user.models import ProfileMaster


# Create your views here.


class CategoriesAPIView(GenericAPIView, ListModelMixin):
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()

    def get(self, request):
        return self.list(request)


class CatalogAPIView(GenericAPIView, ListModelMixin):
    serializer_class = ProfileCatalogSerialize
    queryset = ProfileMaster.objects.all()

    def get(self, request):
        return self.list(request)
