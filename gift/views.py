from django.db.models import Q
from django.shortcuts import render
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from gift.models import Gift
from gift.serializers import GiftSerializer
from decimal import Decimal


class GiftViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = GiftSerializer
    queryset = Gift.objects.all()
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def _params_to_limits(qs):
        """Converts a list of string IDs to a list of integers"""
        qs = qs.split(",")
        return [
            sorted([Decimal(str_value) for str_value in str_budget.split("-")])
            for str_budget in qs
        ]

    def get_queryset(self):
        gender = self.request.query_params.get("gender")
        age = self.request.query_params.get("age")
        occasion = self.request.query_params.get("occasion")
        likes = self.request.query_params.get("likes")
        budgets = self.request.query_params.get("budgets")

        queryset = self.queryset

        if budgets:
            budgets = self._params_to_limits(budgets)
            query = ""
            for budget in budgets:
                if query == "":
                    query = Q(price__range=budget)
                else:
                    query = query | Q(price__range=budget)
            queryset = self.queryset.filter(query)

        if gender and gender != "Both":
            queryset = queryset.filter(Q(gender=gender) | Q(gender="Both"))

        if age:
            queryset = queryset.filter(age=age)

        if occasion:
            queryset = queryset.filter(occasion=occasion)

        if likes:
            likes = likes.split(",")
            queryset = queryset.filter(likes__in=likes)

        return queryset.all()

    @extend_schema(
        parameters=[
            OpenApiParameter(
                "budgets",
                type={"type": "list", "items": {"type": "string"}},
                description=(
                    "Filter by price limits (ex. ?budget=0-100,500-1000)."
                ),
            ),
            OpenApiParameter(
                "gender",
                type=OpenApiTypes.STR,
                description="Filter by gender (ex. ?gender=Male). "
                "Can be: Male, Female, Both.",
            ),
            OpenApiParameter(
                "age",
                type=OpenApiTypes.STR,
                description="Filter by age (ex. ?age=26-45). "
                "Can be: 0-16, 17-25, 26-45, 46-100.",
            ),
            OpenApiParameter(
                "occasion",
                type=OpenApiTypes.STR,
                description="Filter by occasion (ex. ?occasion=Birthday). "
                "Can be: Birthday, Wedding, New Year, Valentines Day, "
                "Graduation.",
            ),
            OpenApiParameter(
                "likes",
                type={"type": "list", "items": {"type": "string"}},
                description="Filter by likes (ex. ?likes=Gadget,Sport). "
                "Can be: Beauty, Sport, Cars, IT, Fashion, Music",
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
