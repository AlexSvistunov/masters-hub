from django.contrib.auth.password_validation import validate_password
from djoser.conf import settings

from .models import CustomUser, ProfileMaster, ProfileImages, Specialist, Reviews, Favorites
from rest_framework import serializers
from service.models import Service
from recording.serializers import ServicesSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def validate_password(self, data):
        validate_password(data)
        return data

    def save(self):
        return CustomUser.objects.create_user(**self.initial_data)


class ReviewsProfileSerializerr(serializers.Serializer):
    reviews = serializers.SerializerMethodField()

    def get_reviews(self, obj):
        queryset = obj.reviews_profile.all().select_related('user')
        len_queryset = len(queryset)
        data = {
            'count': len_queryset,
        }
        if len_queryset == 0:
            average_rating = 'нет отзывов'
        else:
            rating_star_all = [i.get_rating_star_display() for i in queryset]
            rating_detail = {f'rating_{i}': rating_star_all.count(i) * 100 // len_queryset for i in range(1, 6)}
            data.update(rating_detail)
            average_rating = round(sum(rating_star_all) / len_queryset, 2)
        serializer = ReviewsSerializer(queryset[:5], many=True)
        data['average_rating'] = average_rating
        data['detail'] = serializer.data
        return data


class ProfileImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImages
        fields = ['image']


class ServiceSerializer(serializers.ModelSerializer):


    class Meta:
        model = Service
        fields = ['id', 'title', 'description','category', 'price', 'photo', 'time']
        # write_only_fields = ['category']
        extra_kwargs = {'category':{'write_only':True}}

class SpecialistSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=False, required=False)

    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job', 'description', 'photo']


class ReviewsSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user.id')
    user_name = serializers.CharField(source='user.username')
    data_create = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    photo = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.user.photo.url

    class Meta:
        model = Reviews
        fields = ['id', 'user_id', 'user_name', 'rating_star', 'data_create', 'description', 'photo']


class ProfileMasterSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.services_count = 0
        super(ProfileMasterSerializer, self).__init__(*args, **kwargs)

    images_work = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    specialists = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()
    services_count = serializers.SerializerMethodField()

    def get_is_favorite(self, ob):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        return user.favorites_user.filter(profile=ob).exists()

    def get_images_work(self, obj):
        specialization = obj.specialization
        if specialization == 'master':
            queryset = obj.profile_images.all()
        else:
            queryset = ProfileImages.objects.none()
            for specialist in obj.profile_specialist.all():
                query = specialist.profile_services.all()
                queryset = queryset.union(query)
        serializer = ProfileImagesSerializer(queryset, many=True)
        return serializer.data

    def get_services(self, obj):
        specialization = obj.specialization
        if specialization == 'master':
            queryset = obj.profile_services.all()
        else:
            queryset = Service.objects.none()
            for specialist in obj.profile_specialist.all()[:5]:
                services = specialist.specialist_services.all().select_related('category')
                queryset = queryset.union(services)
        self.services_count = queryset.count()
        serializer = ServicesSerializer(queryset[:5], many=True)
        return serializer.data

    def get_specialists(self, obj):
        queryset = obj.profile_specialist.all().select_related('profile')
        serializer = SpecialistSerializer(queryset, many=True)
        return serializer.data

    def get_reviews(self, obj):
        queryset = obj.reviews_profile.all().select_related('user')
        len_queryset = len(queryset)
        data = {
            'count': len_queryset,
        }
        if len_queryset == 0:
            average_rating = 'нет отзывов'
        else:
            rating_star_all = [i.get_rating_star_display() for i in queryset]
            rating_detail = {f'rating_{i}': rating_star_all.count(i) * 100 // len_queryset for i in range(1, 6)}
            data.update(rating_detail)
            average_rating = round(sum(rating_star_all) / len_queryset, 2)
        serializer = ReviewsSerializer(queryset[:5], many=True)
        data['average_rating'] = average_rating
        data['detail'] = serializer.data
        return data

    def get_photo(self, obj):
        return obj.photo.url

    def get_services_count(self, obj):
        return self.services_count

    class Meta:
        model = ProfileMaster
        fields = [
            'id',
            'user',
            'name',
            'photo',
            'specialization',
            'address',
            'phone',
            'link_vk',
            'link_tg',
            'description',
            'is_favorite',
            'specialists',
            'images_work',
            'services',
            'services_count',
            'reviews'
        ]


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ['id', 'user', 'profile', 'date_create']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ['rating_star', 'user', 'description']
        # read_only_fields =['user']
        extra_kwargs = {
            'rating_star': {'required': True},
            'user': {'required': False}
        }


class SpecialistDetailSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    images_work = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.photo.url

    def get_services(self, obj):
        services = obj.specialist_services.all()
        serializer = ServiceSerializer(services, many=True)
        return serializer.data

    def get_images_work(self, obj):
        queryset = obj.profile_services.all()
        serializer = ProfileImagesSerializer(queryset, many=True)
        return serializer.data

    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job', 'description', 'photo', 'services', 'images_work']


class TokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source="key")
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.user.photo.url

    class Meta:
        model = settings.TOKEN_MODEL
        fields = ("auth_token", "image")
