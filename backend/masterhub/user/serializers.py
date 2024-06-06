from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, ProfileMaster, ProfileImages, Specialist, Reviews, Favorites
from rest_framework import serializers
from service.models import Service


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def validate_password(self, data):
        validate_password(data)
        return data

    def save(self):
        return CustomUser.objects.create_user(**self.initial_data)


class ProfileImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImages
        fields = ['image']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['title', 'description', 'price', 'photo']


class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = ['id', 'name', 'job', 'description']


class ReviewsSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user.id')
    user_name = serializers.CharField(source='user.username')

    class Meta:
        model = Reviews
        fields = ['id', 'user_id', 'user_name', 'rating_star', 'data_create', 'description']


class ProfileMasterSerializer(serializers.ModelSerializer):
    images_work = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    specialists = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()

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
            for specialist in obj.profile_specialist.all():
                services = specialist.specialist_services.all()
                queryset = queryset.union(services)
        serializer = ServiceSerializer(queryset[:5], many=True)
        return serializer.data

    def get_specialists(self, obj):
        queryset = obj.profile_specialist.all()
        serializer = SpecialistSerializer(queryset, many=True)
        return serializer.data

    def get_reviews(self, obj):
        queryset = obj.reviews_profile.all()
        rating_star_all = [i.get_rating_star_display() for i in queryset]
        len_queryset = len(queryset)
        serializer = ReviewsSerializer(queryset[:5], many=True)
        rating_detail = {f'rating_{i}': rating_star_all.count(i) * 100 // len_queryset for i in range(1, 6)}
        data = {
            'count': len_queryset,
            'average_rating': round(sum(rating_star_all) / len_queryset, 2)
        }
        data.update(rating_detail)
        data['detail'] = serializer.data
        return data

    class Meta:
        model = ProfileMaster
        fields = [
            'id',
            'user',
            'name',
            'specialization',
            'address', 'phone',
            'link_vk', 'link_tg',
            'description',
            'specialists',
            'images_work',
            'services',
            'reviews'
        ]


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ['id', 'user', 'profile', 'date_create']