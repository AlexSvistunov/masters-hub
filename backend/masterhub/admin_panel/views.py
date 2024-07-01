from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet, ViewSetMixin
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import ProfileAdminSerializer
from rest_framework import permissions
from user.serializers import ProfileMasterSerializer
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin
from django.db.utils import IntegrityError
from user.models import ProfileMaster
from rest_framework import status
from django.shortcuts import get_object_or_404


class ProfileAdminViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = ProfileAdminSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ProfileMaster.objects.all()

    def list(self, request):
        user = request.user
        try:
            profile = user.user_profile
            serializer = ProfileAdminSerializer(profile, context={'request': request})
            return Response(serializer.data)
        except AttributeError:
            return Response({'detail': 'no profile'})

    def create(self, request, *args, **kwargs):
        serializer = ProfileAdminSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save(user=request.user)
                return Response(serializer.data)
            except IntegrityError:
                return Response({'detail': 'already have a profile'})
        return Response({'detail': 'error'})

    def partial_update(self, request, *args, **kwargs):
        profile = get_object_or_404(ProfileMaster, id=kwargs.get('pk'))
        if profile.user != request.user:
            return Response({'detail': 'not your profile'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ProfileAdminSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
