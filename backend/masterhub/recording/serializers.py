from rest_framework import serializers

from service.serializers import CategoriesSerializer
from user.models import Specialist
from service.models import Service
from user.models import ProfileMaster
from .models import Recording, WorkTime
from datetime import datetime, timedelta


class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileMaster
        fields = ['id', 'name']


class ServicesSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=False, required=False)

    def __init__(self, *args, **kwargs):
        super(ServicesSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.fields['category'] = CategoriesSerializer()

    specialist = serializers.SerializerMethodField()

    def get_specialist(self, obj):
        if obj.specialist:
            serializer = SpecialistSerializer(obj.specialist)
        else:
            serializer = ProfileSerializer(obj.profile)
        return serializer.data

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'price', 'photo', 'time', 'date_creation', 'category', 'specialist', ]


class ServicesRecordingSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        self.categories = []
        super(ServicesRecordingSerializer, self).__init__(*args, **kwargs)

    def to_representation(self, instance):
        cat_id = instance.id
        if cat_id not in self.categories:
            self.categories.append(cat_id)
            services_context = self.context.get('services')
            services = services_context.filter(category__id=cat_id)
            serializer = ServicesSerializer(services, many=True)
            return {instance.title: serializer.data}


class TimeSerializer(serializers.Serializer):
    def to_representation(self, instance: timedelta):
        hour = str(instance.seconds // 3600).rjust(2, '0')
        minute = str((instance.seconds - int(hour) * 3600) // 60).rjust(2, '0')
        return f'{hour}:{minute}'


class RecordingSerializer(serializers.ModelSerializer):
    profile_master = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()

    def get_profile_master(self, obj):
        serializer = ProfileSerializer(obj.profile_master)
        return serializer.data

    def get_service(self, obj):
        serializer = ServicesSerializer(obj.service)
        return serializer.data

    class Meta:
        model = Recording
        fields = ['id', 'profile_master', 'service', 'date', 'time_start', 'time_end']


class RecordinCreateSerializer(serializers.Serializer):
    time = serializers.TimeField(format='%H:%M')
    date = serializers.DateField(format='%Y-%m-%d')
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    name = serializers.CharField(max_length=30)
    surname = serializers.CharField(max_length=30)
    phone = serializers.CharField(max_length=12)


class WorkTimeSerializer(serializers.Serializer):
    time = serializers.SerializerMethodField()

    def get_time(self, obj: WorkTime):
        time_relax = self.context.get('profile').time_relax
        time = obj.time_work.split('-')
        time_start = timedelta(hours=int(time[0][:2]), minutes=int(time[0][-2:]))
        time_end = timedelta(hours=int(time[1][:2]), minutes=int(time[1][-2:]))
        time_relax = timedelta(hours=time_relax.hour, minutes=time_relax.minute)
        result = []
        while time_start<=time_end:
            result.append(str(time_start)[:-3])
            time_start+=time_relax
        return result
