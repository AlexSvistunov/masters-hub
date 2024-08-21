from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated

from service.serializers import CategoriesSerializer
from . import serializers
from user.models import ProfileMaster, Categories, ProfileImages
from user.serializers import SpecialistSerializer, SpecialistDetailSerializer, ProfileImagesSerializer
from service.models import Service
from user.serializers import ServiceSerializer
from .serializers import ProfileImagesAdminSerializer


# Create your views here.


class ProfileAPIViewSet(GenericViewSet, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProfileAdminSerializer

    def get_queryset(self):
        return get_object_or_404(ProfileMaster, user=self.request.user)

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset())
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        instance = get_object_or_404(ProfileMaster, user=request.user, id=kwargs.get('pk'))
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class SpecialistAPIViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SpecialistDetailSerializer
        return SpecialistSerializer

    def get_queryset(self):
        return self.request.user.user_profile.profile_specialist.all()

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.user_profile)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class ServiceAPIViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return self.request.user.user_profile.profile_services.all()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.user_profile)


class CategoriesAPIViewSet(GenericViewSet, ListModelMixin):
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()


class WorkImagesAPIViewSet(GenericViewSet, ListModelMixin):
    serializer_class = ProfileImagesAdminSerializer
    queryset = ProfileImages.objects.all()
