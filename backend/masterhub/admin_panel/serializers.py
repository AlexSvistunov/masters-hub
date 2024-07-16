from recording.serializers import ProfileSerializer, ServicesSerializer
from user.serializers import SpecialistSerializer
from user.models import ProfileMaster, Reviews
from rest_framework import serializers
from user.models import Favorites, Categories, Specialist
from django.core.exceptions import ObjectDoesNotExist
from service.models import Service
from service.serializers import CategoriesSerializer
from recording.models import WorkTime
from rest_framework.exceptions import ValidationError
from datetime import datetime
from recording.models import Recording


class ProfileAdminSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    in_favorites = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    def get_categories(self, ob):
        serializer = CategoriesSerializer(ob.categories, many=True)
        return serializer.data

    def get_photo(self, obj):
        return obj.photo.url

    def get_rating(self, ob):
        reviews = ob.reviews_profile.all()
        if not reviews:
            return 0.0
        count = 0
        score = 0
        for review in reviews:
            count += 1
            score += int(review.rating_star)
        return round(score / count, 2)

    def get_in_favorites(self, obj):
        favorites = obj.favorites_profile.count()
        return favorites

    class Meta:
        model = ProfileMaster
        fields = [
            'id',
            'name',
            'photo',
            'address',
            'phone',
            'specialization',
            'link_vk',
            'link_tg',
            'description',
            'specialization',
            'date_creation',
            'categories',
            'rating',
            'in_favorites',

        ]

    def save(self, **kwargs):
        return super(ProfileAdminSerializer, self).save(**kwargs)

    def partial_save(self, **kwargs):
        instance = self.instance
        categories = self.initial_data.get('categories', None)
        if categories:
            instance.categories.clear()
            for category in categories:
                try:
                    category = Categories.objects.get(id=category)
                except ObjectDoesNotExist:
                    raise serializers.ValidationError({'categories': 'object not found'})
                instance.categories.add(category)
        return self.save(**kwargs)


class SpecialistAdminSerializer(serializers.ModelSerializer):
    # photo = serializers.SerializerMethodField()
    #
    # def get_photo(self, obj):
    #     return obj.photo.url

    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job', 'description', 'photo']


class ServiceSpecAdminSerializer(serializers.Serializer):
    def to_representation(self, value):
        if not hasattr(value, 'job'):
            services = value.profile_services.all()
        else:
            services = value.specialist_services.all()
        serializer = ServicesSerializer(services, many=True)
        return {value.name: serializer.data}


class WorkTimeAdminSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        val = list(attrs.values())[0].split('-')
        if len(val) != 2:
            raise ValidationError({'error': 'Не верный формат времени'})
        for i in val:
            try:
                datetime.strptime(i, '%H:%M')
            except:
                raise ValidationError({'error': 'Не верный формат времени'})
        return attrs

    class Meta:
        model = WorkTime
        fields = ['id', 'monday', 'tuesday', 'wednesday', 'thursday', 'thursday', 'saturday', 'sunday']


class ReviewsAdminSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user.id')
    user_name = serializers.CharField(source='user.username')
    data_create = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    photo = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.user.photo.url

    class Meta:
        model = Reviews
        fields = ['id', 'user_id', 'user_name', 'rating_star', 'data_create', 'description', 'photo', 'active']


class RecordingAdminSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(RecordingAdminSerializer, self).__init__(*args, **kwargs)
        if self.context.get('list'):
            del self.fields['']

    class Meta:
        model = Recording
        fields = ['id', 'date', 'time_start', 'time_start', 'specialist', 'service', 'name', 'surname', 'surname',
                  'phone']
