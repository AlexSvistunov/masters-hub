from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from user.models import ProfileMaster, Specialist
from user.serializers import SpecialistSerializer
from service.models import Service, Categories
from .serializers import ServicesSerializer, ServicesRecordingSerializer
from rest_framework.mixins import RetrieveModelMixin


# Create your views here.

class SpecialistRecordingAPIView(GenericViewSet, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        queryset = []
        profile = ProfileMaster.objects.get(id=pk)
        if profile.specialization == 'master':
            services = Service.objects.filter(profile=profile)
        else:
            services = Service.objects.none()
            specialists = profile.profile_specialist.all()
            for i in specialists:
                services = services.union(i.specialist_services.all())
        for i in services:
            if i.category not in queryset:
                queryset.append(i.category)
        # serializer = ServicesSerializer(services, many=True)
        serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='(?P<id_services>[^/.]+)')
    def recording(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        pk_services = kwargs.get('id_services')
        services = Service.objects.get(id=pk_services)
        qs = []
        specialists = Specialist.objects.filter(profile__id=pk)
        for i in specialists:
            if i.specialist_services.all().filter(title=services.title):
                qs.append(i)
        serializer = SpecialistSerializer(qs, many=True)
        return Response(serializer.data)

    # @action(methods=['get'], detail=True)
    # def services(self, request, *args, **kwargs):
    #     pk = kwargs.get('pk')
    #     queryset = []
    #     profile = ProfileMaster.objects.get(id=pk)
    #     if profile.specialization == 'master':
    #         services = Service.objects.filter(profile=profile)
    #     else:
    #         services = Service.objects.none()
    #         specialists = profile.profile_specialist.all()
    #         for i in specialists:
    #             services = services.union(i.specialist_services.all())
    #     for i in services:
    #         if i.category not in queryset:
    #             queryset.append(i.category)
    #     # serializer = ServicesSerializer(services, many=True)
    #     serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
    #     return Response(serializer.data)
