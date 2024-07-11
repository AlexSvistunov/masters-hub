import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from user.models import ProfileMaster
from .models import WorkTime, Recording
from service.models import Service
from .serializers import ServicesRecordingSerializer, WorkTimeSerializer, RecordingSerializer
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin, ListModelMixin
from datetime import timedelta
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, permissions


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
        profile = ProfileMaster.objects.get(id=pk)
        services = Service.objects.filter(profile=profile).select_related('category').select_related('specialist')
        for i in services:
            if i.category not in queryset:
                queryset.append(i.category)
        serializer = ServicesRecordingSerializer(queryset, many=True, context={'services': services})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # {
        #     "profile": id профиля,
        #     "time": "08:00",
        #     "date": "2024-05-12",
        #     "service": id услуги,
        #     "name": name,
        #     "surname": surname,
        #     "phone": phone,
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
        recording.date = date
        recording.name = data.get('name')
        recording.surname = data.get('surname')
        recording.phone = data.get('phone')
        recording.time_start = str(time_start)
        recording.time_end = str(time_end)
        profile = service.profile
        recording.profile_master = profile
        if service.profile.specialization == 'studio':
            spec = service.specialist
            recording.specialist = spec
        recording.save()
        return Response(status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True, url_path='(?P<id_services>[^/.]+)')
    def recording(self, request, *args, **kwargs):
        pk_service = kwargs.get('id_services')
        pk_profile = kwargs.get('pk')
        service = Service.objects.get(id=pk_service)
        param = service.profile.specialization
        if param == 'master':
            try:
                profile_work_time = WorkTime.objects.get(profile__pk=pk_profile)
            except ObjectDoesNotExist:
                return Response({'detail': 'no masters work'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                profile_work_time = WorkTime.objects.get(specialist__pk=service.specialist.pk)
            except ObjectDoesNotExist:
                return Response({'detail': 'no masters work'}, status=status.HTTP_400_BAD_REQUEST)
            # services_time

        serializer = WorkTimeSerializer(profile_work_time,
                                        context={
                                            'request': request,
                                            'kwargs': kwargs,
                                            'service': service,
                                            'param': param
                                        })
        return Response(serializer.data)
