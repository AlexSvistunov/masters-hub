import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from user.models import ProfileMaster
from .models import Recording, WorkTime
from service.models import Service
from .serializers import ServicesRecordingSerializer, RecordingSerializer, RecordinCreateSerializer, WorkTimeSerializer
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin, ListModelMixin
from datetime import timedelta
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404


# Create your views here.

class SpecialistRecordingAPIView(GenericViewSet, RetrieveModelMixin, CreateModelMixin, ListModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ServicesRecordingSerializer

    def get_queryset(self):
        if self.action == 'list':
            return self.request.user.user_recordings.all()
        return []

    def list(self, request, *args, **kwargs):
        data = request.user.user_recordings.all()
        serializer = RecordingSerializer(data, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # pk профиля
        pk = kwargs.get('pk')
        queryset = []
        profile = get_object_or_404(ProfileMaster, id=pk)
        services = Service.objects.filter(profile=profile).select_related('category', 'specialist')
        for i in services:
            if i.category not in queryset:
                queryset.append(i.category)
        serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='service')
    def recording(self, request, *args, **kwargs):
        service = get_object_or_404(Service, id=kwargs.get('pk'))
        profile = service.profile
        work_time = WorkTime.objects.get(id=1)
        serializer = WorkTimeSerializer(work_time, context={'profile': profile})
        return Response(serializer.data)
