import datetime

from django.shortcuts import render
from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from user.models import ProfileMaster, Specialist
from .models import WorkTime, Recording
from user.serializers import SpecialistSerializer
from service.models import Service, Categories
from .serializers import ServicesSerializer, ServicesRecordingSerializer, WorkTimeSerializer
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin
from datetime import timedelta, date


# Create your views here.

class SpecialistRecordingAPIView(GenericViewSet, RetrieveModelMixin, CreateModelMixin):
    # permission_classes = [IsAuthenticated]

    queryset = []

    def retrieve(self, request, *args, **kwargs):
        # pk профиля
        pk = kwargs.get('pk')
        queryset = []
        profile = ProfileMaster.objects.get(id=pk)
        # if profile.specialization == 'master':
        #     services = Service.objects.filter(profile=profile)
        # else:
        #     services = Service.objects.none()
        #     specialists = profile.profile_specialist.all()
        #     for i in specialists:
        #         services = services.union(i.specialist_services.all())
        services = Service.objects.filter(profile=profile).select_related('category').select_related('specialist')
        for i in services:
            if i.category not in queryset:
                queryset.append(i.category)
        # serializer = ServicesSerializer(services, many=True)
        serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # data {
        # 'profile' : id профиля,
        # 'service' : id услуги,
        # 'time':'',
        # }
        data = request.data
        service = Service.objects.get(id=data['service'])
        time_start_request = data['time'].split(':')
        time_start = timedelta(
            hours=int(time_start_request[0]),
            minutes=int(time_start_request[1])
        )
        service_time = timedelta(hours=service.time.hour, minutes=service.time.minute)
        time_end = time_start + service_time
        date = datetime.datetime.strptime(data['date'], '%Y-%m-%d')
        recording = Recording()
        recording.user = request.user
        recording.service = service
        recording.date = timezone.now()
        recording.time_start = str(time_start)
        recording.time_end = str(time_end)
        if request.GET.get('master'):
            profile = ProfileMaster.objects.get(id=data['id'])
            recording.profile_master = profile
        else:
            spec = Specialist.objects.get(id=data['id'])
            recording.specialist = spec
        recording.save()
        return Response({'a': 'wdwdwd'})

    # @action(methods=['get'], detail=True, url_path='(?P<id_specialist>[^/.]+)')
    # def recording(self, request, *args, **kwargs):
    #     '''если профиль мастера то передать параметром specialization'''
    #     pk = kwargs.get('id_specialist')
    #     param = request.GET.get('specialization', None)
    #     if param:
    #         profile_work_time = WorkTime.objects.get(profile__pk=pk)
    #     else:
    #         profile_work_time = WorkTime.objects.get(specialist__pk=pk)
    #     # services_time
    #
    #     serializer = WorkTimeSerializer(profile_work_time, context={'request': request, 'kwargs': kwargs})
    #     return Response(serializer.data)
    @action(methods=['get'], detail=True, url_path='(?P<id_services>[^/.]+)')
    def recording(self, request, *args, **kwargs):
        '''если профиль мастера то передать параметром specialization'''
        pk_service = kwargs.get('id_services')
        pk_profile = kwargs.get('pk')
        service = Service.objects.get(id=pk_service).select_related('specialist')
        param = service.profile.specialization
        if param == 'master':
            profile_work_time = WorkTime.objects.get(profile__pk=pk_profile)
        else:
            profile_work_time = WorkTime.objects.get(specialist__pk=service.specialist.pk)
        # services_time

        serializer = WorkTimeSerializer(profile_work_time,
                                        context={
                                            'request': request,
                                            'kwargs': kwargs,
                                            'service': service,
                                            'param': param
                                        })
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
