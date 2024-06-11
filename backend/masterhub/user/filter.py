import django_filters
from .models import ProfileMaster


class ProfileFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='categories', lookup_expr='id__in')

    class Meta:
        model = ProfileMaster
        fields = ['name', 'category']
