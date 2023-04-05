from django.db.models import Q
from django.shortcuts import render
from rest_framework import generics, viewsets, mixins

from gift.models import Gift
from gift.serializers import GiftSerializer
from decimal import Decimal


class GiftViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = GiftSerializer
    queryset = Gift.objects.all()

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
        budget = self.request.query_params.get("budget")

        queryset = self.queryset

        if budget:
            budgets = self._params_to_limits(budget)
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
