from django.shortcuts import render
from rest_framework import generics, viewsets

from gift.models import Gift
from gift.serializers import GiftSerializer


class GiftViewSet(viewsets.ModelViewSet):
    serializer_class = GiftSerializer
    queryset = Gift.objects.all()
