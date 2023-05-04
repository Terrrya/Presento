from django.urls import include, path
from rest_framework import routers

from gift.views import GiftViewSet

app_name = "gift"

router = routers.DefaultRouter()
router.register("", GiftViewSet)

urlpatterns = [path("", include(router.urls))]
