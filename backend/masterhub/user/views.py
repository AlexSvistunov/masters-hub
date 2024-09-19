from rest_framework.response import Response
from .pagination import CatalogPagination
from .serializers import CustomUserSerializer, ProfileMasterSerializer, FavoritesSerializer, FeedbackSerializer, \
    ReviewsSerializer, SpecialistDetailSerializer, ReviewsProfileSerializerr
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import GenericViewSet
from .models import CustomUser, ProfileMaster, Specialist
from service.models import Service
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, DestroyModelMixin
from .models import Favorites, Reviews
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from service.serializers import ProfileCatalogSerialize
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from rest_framework import status
from recording.serializers import ServicesSerializer


# Create your views here.
class UsersViewSet(GenericViewSet, RetrieveModelMixin):

    def create(self, request, *args, **kwargs):
        data = request.data
        # data.pop('specialization')
        # del data['specialization']
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({'auth_token': token.key, 'image': user.photo.url})

    def get_serializer_class(self):
        if self.action == 'create':
            return CustomUserSerializer
        return ProfileMasterSerializer

    def get_queryset(self):
        if self.action == 'create':
            return CustomUser.objects.all()
        return ProfileMaster.objects.all()


class FavoritesViewSet(GenericViewSet, ListModelMixin, DestroyModelMixin):
    serializer_class = ProfileCatalogSerialize
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = [i.profile for i in user.favorites_user.all()]
        return queryset

    def create(self, request, *args, **kwargs):
        profile_master_id = request.GET.get('id')
        if not profile_master_id:
            return Response({'error': 'wrong ID'}, status=status.HTTP_400_BAD_REQUEST)
        flag = Favorites.objects.filter(user=request.user, profile__id=profile_master_id)
        if flag.exists():
            return Response({'error': 'already signed'}, status=status.HTTP_400_BAD_REQUEST)
        data = {'user': request.user.id, 'profile': profile_master_id}
        serializer = FavoritesSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        profile = ProfileMaster.objects.get(id=profile_master_id)
        serializer_profile = ProfileMasterSerializer(profile, context={'request': request})
        return Response(serializer_profile.data)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        favorite = get_object_or_404(Favorites, user=request.user, profile_id=pk)
        favorite.delete()
        return self.list(request)


class FeedbackAPIView(GenericAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        profile = get_object_or_404(ProfileMaster, pk=pk)
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, profile=profile)
            serializer = ReviewsProfileSerializerr(profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'detail': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ServicesProfileAPIView(GenericAPIView, ListModelMixin):
    serializer_class = ServicesSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Service.objects.filter(profile__id=pk).select_related('specialist', 'category')
        return queryset

    def get(self, request, pk):
        return self.list(request)


class ReviewsProfileAPIView(GenericAPIView, ListModelMixin):
    serializer_class = ReviewsSerializer
    pagination_class = CatalogPagination

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Reviews.objects.filter(profile__pk=pk).select_related('user')
        return queryset

    def get(self, request, pk):
        return self.list(request)


class SpecialistAPIView(RetrieveAPIView):
    serializer_class = SpecialistDetailSerializer
    queryset = Specialist.objects.all()
