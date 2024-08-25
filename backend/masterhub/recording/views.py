import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from user.models import ProfileMaster
from .models import Recording, WorkTime
from service.models import Service
from .serializers import ServicesRecordingSerializer, RecordingSerializer, RecordinCreateSerializer, WorkTimeSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404


# Create your views here.

class SpecialistRecordingAPIView(GenericViewSet):
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
        date = request.GET.get('date', None)
        if date:
            date = datetime.datetime.strptime(date, '%Y-%m-%d')
            work_time = WorkTime.objects.filter(date=date)
        else:
            date = datetime.date.today()
            work_time = WorkTime.objects.filter(date__gte=date)
            if not work_time.exists():
                return Response({'detail': 'no working hours'}, status=status.HTTP_400_BAD_REQUEST)
        service = get_object_or_404(Service, id=kwargs.get('pk'))
        profile = service.profile
        if profile.specialization == 'master':
            recordings = Recording.objects.filter(profile_master=profile, date=date)
            work_time = work_time.filter(profile_master=profile)
        else:
            recordings = Recording.objects.filter(specialist=service.specialist, date=date)
            work_time = work_time.filter(specialist=service.specialist)
        if not work_time.exists():
            return Response({'detail': 'no working hours'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = WorkTimeSerializer(work_time[0],
                                        context={'profile': profile, 'recordings': recordings, 'service': service})
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='service/work-time')
    def work_time(self, request, *args, **kwargs):
        return Response({'awd': 'awd'})

    def create(self, request):
        data = request.data
        serializer = RecordinCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)
