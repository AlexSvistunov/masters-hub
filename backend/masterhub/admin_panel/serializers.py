from user.models import ProfileMaster
from rest_framework import serializers


class ProfileAdminSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    def get_photo(self, obj):
        return obj.photo.url

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
        ]
    
    def save(self, **kwargs):
        return super(ProfileAdminSerializer, self).save(**kwargs)
