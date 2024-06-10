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


# Create your views here.


class SpecialistRecordingAPIView(GenericViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=True)
    def specialist(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        specialists = Specialist.objects.filter(profile__id=pk)
        serializer = SpecialistSerializer(specialists, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def services(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        queryset = []
        services = Service.objects.filter(specialist__id=pk)
        for i in services:
            if i.category not in queryset:
                queryset.append(i.category)
        # serializer = ServicesSerializer(services, many=True)
        serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
        return Response(serializer.data)
