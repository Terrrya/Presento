from rest_framework import serializers

from gift.models import Gift


class GiftSerializer(serializers.ModelSerializer):
    """Gift serializer"""

    class Meta:
        model = Gift
        fields = ("id", "title", "price", "description")
