from .models import Service
from user.models import Categories
from rest_framework import serializers
from user.models import ProfileMaster


class CategoriesSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.photo.url
    class Meta:
        model = Categories
        fields = ['id', 'title', 'photo']


class ProfileCatalogSerialize(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.photo.url

    def get_reviews(self, obj):
        queryset = [i.get_rating_star_display() for i in obj.reviews_profile.all()]
        len_queryset = len(queryset)
        if len_queryset == 0:
            average_rating = 'нет отзывов'
        else:
            average_rating = round(sum(queryset) / len_queryset, 2)
        data = {
            'average_rating': average_rating,
            'count': len_queryset
        }
        return data

    class Meta:
        model = ProfileMaster
        fields = ['id', 'name', 'photo', 'address', 'specialization', 'reviews']
