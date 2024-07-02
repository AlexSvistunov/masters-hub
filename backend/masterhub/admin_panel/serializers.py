from user.models import ProfileMaster
from rest_framework import serializers
from user.models import Favorites, Categories, Specialist
from django.core.exceptions import ObjectDoesNotExist


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'title']


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
