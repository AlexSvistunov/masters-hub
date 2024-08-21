from user.models import ProfileMaster, ProfileImages
from rest_framework import serializers


class ProfileAdminSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=False, required=False)

    class Meta:
        model = ProfileMaster
        fields = ['id',
                  'name',
                  'photo',
                  'address',
                  'phone',
                  'specialization',
                  'link_vk',
                  'link_tg',
                  'description',
                  'time_relax',
                  'date_creation'
                  ]


class ProfileImagesAdminSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=False)
    class Meta:
        model = ProfileImages
        fields = ['id', 'profile', 'specialist', 'image', 'date_creation']
