from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer, ProfileMasterSerializer, FavoritesSerializer
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from .models import CustomUser, ProfileMaster, ProfileImages
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, DestroyModelMixin
from rest_framework.views import APIView
from .models import Favorites
from rest_framework.generics import GenericAPIView
from service.serializers import ProfileCatalogSerialize
from rest_framework import permissions
from django.shortcuts import get_object_or_404


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
            return Response({'a': 'wd'})
        flag = Favorites.objects.filter(user=request.user, profile__id=profile_master_id)
        if flag.exists():
            return Response({'error': 'podpisan'})
        data = {'user': request.user.id, 'profile': profile_master_id}
        serializer = FavoritesSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return self.list(request)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        favorite = get_object_or_404(Favorites, pk=pk)
        favorite.delete()
        return Response({'detail': 'removed from favorites'})

# class Test(APIView):
#     def post(self, request):
#         data = request.data
#         return Response({'a':'wad'})
