from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet, ViewSetMixin, ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from recording.serializers import ServicesSerializer
from .serializers import ProfileAdminSerializer, SpecialistAdminSerializer, \
    ServiceSpecAdminSerializer

from user.serializers import SpecialistDetailSerializer
from rest_framework import permissions
from user.serializers import ProfileMasterSerializer
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin
from django.db.utils import IntegrityError
from user.models import ProfileMaster, Specialist
from rest_framework import status
from django.shortcuts import get_object_or_404
from service.models import Service
from service.serializers import CategoriesSerializer


class ProfileAdminViewSet(GenericViewSet):
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
        serializer.partial_save()
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def add_image(self, request):
        return Response({'a': 'a'})

    @action(methods=['get'], detail=False)
    def categories(self, request):
        profile = request.user.user_profile
        serializer = CategoriesSerializer(profile.categories, many=True)
        return Response(serializer.data)


class SpecialistsAdminViewSet(GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = SpecialistAdminSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(profile=request.user.user_profile)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        profile = request.user.user_profile
        serializer = SpecialistAdminSerializer(profile.profile_specialist.all(), many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        specialist = Specialist.objects.get(id=pk)
        serializer = SpecialistDetailSerializer(specialist)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        specialist = Specialist.objects.get(id=kwargs.get('pk'))
        serializer = SpecialistDetailSerializer(specialist, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ServicesAdminViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = self.request.user.user_profile
        if profile.specialization == 'master':
            return [profile]
        specialist = profile.profile_specialist.all()
        return specialist

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceSpecAdminSerializer
        return ServicesSerializer

    def get_serializer_context(self):
        context = super(ServicesAdminViewSet, self).get_serializer_context()
        profile = self.request.user.user_profile
        if profile.specialization == 'master':
            context['profile'] = 'master'
        return context

    def list(self, request, *args, **kwargs):
        return super(ServicesAdminViewSet, self).list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        service = Service.objects.get(pk=pk)
        serializer = ServicesSerializer(service)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        service = Service.objects.get(id=pk)
        serializer = ServicesSerializer(instance=service, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = request.user.user_profile
        if profile.specialization == 'master':
            serializer.save(profile=profile)
        else:
            specialist_id = request.data.get('specialist')
            if specialist_id:
                serializer.save(specialist_id=specialist_id)
            else:
                return Response({'detail': 'ID specialist has not '}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
