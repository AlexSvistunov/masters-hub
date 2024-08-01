from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from . import serializers
from user.models import ProfileMaster


# Create your views here.


class ProfileAPIView(GenericViewSet, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProfileAminSerializer

    def get_queryset(self):
        return ProfileMaster.objects.filter(user=self.request.user)

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset())
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
