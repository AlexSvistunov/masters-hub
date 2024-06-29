from rest_framework.generics import GenericAPIView
from .serializers import CategoriesSerializer, ProfileCatalogSerialize
from .models import Categories
from rest_framework.mixins import ListModelMixin
from user.models import ProfileMaster
from django_filters.rest_framework import DjangoFilterBackend
from user.pagination import CatalogPagination
from rest_framework import permissions


# Create your views here.


class CategoriesAPIView(GenericAPIView, ListModelMixin):
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()

    def get(self, request):
        return self.list(request)




class CatalogAPIView(GenericAPIView, ListModelMixin):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileCatalogSerialize
    queryset = ProfileMaster.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categories', 'specialization']
    pagination_class = CatalogPagination

    def get(self, request):
        return self.list(request)

