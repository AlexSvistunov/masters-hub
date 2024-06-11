from django.core.paginator import InvalidPage, Paginator
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CatalogPagination(PageNumberPagination):
    page_size = 1

    def get_paginated_response(self, data):
        return super(CatalogPagination, self).get_paginated_response(data)

    def paginate_queryset(self, queryset, request, view=None):
        self.request = request
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = self.get_page_number(request, paginator)
        try:
            self.page = paginator.page(page_number)
            self.page_res = queryset[:int(page_number) * self.page_size]
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=str(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            self.display_page_controls = True
        return list(self.page_res)
