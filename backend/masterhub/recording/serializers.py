from rest_framework import serializers
from user.models import ProfileMaster, Specialist
from service.models import Service
from user.models import ProfileMaster
from .models import WorkTime
from datetime import datetime, time


class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileMaster
        fields = ['id', 'name']


class ServicesSerializer(serializers.ModelSerializer):
    specialist = serializers.SerializerMethodField()

    def get_specialist(self, obj):
        if obj.specialist:
            serializer = SpecialistSerializer(obj.specialist)
        else:
            serializer = ProfileSerializer(obj.profile)
        return serializer.data

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'price', 'photo', 'category', 'specialist']


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


class WorkTimeSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()

    def get_time(self, obj):
        request = self.context.get('request')
        result = []
        services_time = time(hour=1, minute=30)
        # time_service = request.GET.get('time-service')
        date_now = datetime.now()
        date_day = date_now.strftime('%A').lower()
        work_time_day = getattr(obj, date_day).split('-')
        work_start = datetime.strptime(work_time_day[0], '%H:%M').time()
        work_end = datetime.strptime(work_time_day[1], '%H:%M').time()
        pass

    class Meta:
        model = WorkTime
        fields = ['time']
