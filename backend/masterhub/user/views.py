from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer, ProfileMasterSerializer, FavoritesSerializer, FeedbackSerializer, \
    ReviewsSerializer, ServiceSerializer
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from .models import CustomUser, ProfileMaster, ProfileImages
from service.models import Service
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, RetrieveModelMixin, ListModelMixin, \
    DestroyModelMixin
from rest_framework.views import APIView
from .models import Favorites
from rest_framework.generics import GenericAPIView
from service.serializers import ProfileCatalogSerialize
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from rest_framework import status
from recording.serializers import ServicesSerializer


# Create your views here.


class UsersViewSet(GenericViewSet, RetrieveModelMixin):

    def create(self, request, *args, **kwargs):
        data = request.data
        del data['specialization']
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({'auth_token': token.key})

    # def retrieve(self, request, pk):
    #     return Response({'a': 'wd'})
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
        return self.list(request)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        favorite = get_object_or_404(Favorites, user=request.user, profile_id=pk)
        favorite.delete()
        return self.list(request)


class FeedbackAPIView(GenericAPIView):
    serializer_class = FeedbackSerializer

    def post(self, request, pk):
        profile = get_object_or_404(ProfileMaster, pk=pk)
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, profile=profile)
            return Response({'detail': 'comment created'}, status=status.HTTP_201_CREATED)
        return Response({'detail': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class ServicesProfileAPIView(GenericAPIView, ListModelMixin):
    serializer_class = ServicesSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Service.objects.all()

    def get(self, request, pk):
        return  self.list(request)


# class Test(APIView):
#     def post(self, request):
#         data = request.data
#         return Response({'a':'wad'})
