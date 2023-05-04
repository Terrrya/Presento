from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse, NoReverseMatch
from rest_framework import status
from rest_framework.test import APIClient

from gift.models import Gift
from gift.serializers import GiftSerializer

GIFT_URL = reverse("gift:gift-list")


def sample_gift(**params) -> Gift:
    default = {
        "title": "Test Gift",
        "price": 125,
        "description": "Test gift for testing",
    }
    default.update(params)
    return Gift.objects.create(**default)


class UnauthenticatedGiftApiTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

    def test_auth_required(self) -> None:
        response = self.client.get(GIFT_URL)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthenticatedGiftApiTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="test@test.com",
            first_name="Test",
            last_name="User",
            password="test12345",
        )
        self.client.force_authenticate(self.user)

    def test_list_gift(self) -> None:
        sample_gift()
        gifts = Gift.objects.all()

        response = self.client.get(GIFT_URL)
        serializer = GiftSerializer(gifts, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_filter_gifts_by_age(self) -> None:
        gift1 = sample_gift(title="Test1", age=Gift.AgeChoices.UNDER_16)
        gift2 = sample_gift(title="Test2", age=Gift.AgeChoices.BETWEEN_17_25)
        gift3 = sample_gift(title="Test3", age=Gift.AgeChoices.BETWEEN_26_45)

        serializer1 = GiftSerializer(gift1)
        serializer2 = GiftSerializer(gift2)
        serializer3 = GiftSerializer(gift3)

        response = self.client.get(GIFT_URL, {"age": f"17-25"})

        self.assertNotIn(serializer1.data, response.data)
        self.assertIn(serializer2.data, response.data)
        self.assertNotIn(serializer3.data, response.data)

    def test_filter_gifts_by_budgets(self) -> None:
        gift1 = sample_gift(title="Test1", price=25)
        gift2 = sample_gift(title="Test2", price=125)
        gift3 = sample_gift(title="Test3", price=525)

        serializer1 = GiftSerializer(gift1)
        serializer2 = GiftSerializer(gift2)
        serializer3 = GiftSerializer(gift3)

        response = self.client.get(GIFT_URL, {"budgets": "0-100,500-1000"})

        self.assertIn(serializer1.data, response.data)
        self.assertNotIn(serializer2.data, response.data)
        self.assertIn(serializer3.data, response.data)

    def test_filter_gifts_by_gender(self) -> None:
        gift1 = sample_gift(title="Test1", gender=Gift.GenderChoices.MALE)
        gift2 = sample_gift(title="Test2", gender=Gift.GenderChoices.FEMALE)
        gift3 = sample_gift(title="Test3", gender=Gift.GenderChoices.BOTH)

        serializer1 = GiftSerializer(gift1)
        serializer2 = GiftSerializer(gift2)
        serializer3 = GiftSerializer(gift3)

        response = self.client.get(GIFT_URL, {"gender": "Male"})

        self.assertIn(serializer1.data, response.data)
        self.assertNotIn(serializer2.data, response.data)
        self.assertIn(serializer3.data, response.data)

    def test_filter_gifts_by_occasion(self) -> None:
        gift1 = sample_gift(
            title="Test1", occasion=Gift.OccasionChoices.BIRTHDAY
        )
        gift2 = sample_gift(
            title="Test2", occasion=Gift.OccasionChoices.GRADUATION
        )
        gift3 = sample_gift(
            title="Test3", occasion=Gift.OccasionChoices.NEW_YEAR
        )

        serializer1 = GiftSerializer(gift1)
        serializer2 = GiftSerializer(gift2)
        serializer3 = GiftSerializer(gift3)

        response = self.client.get(GIFT_URL, {"occasion": "Birthday"})

        self.assertIn(serializer1.data, response.data)
        self.assertNotIn(serializer2.data, response.data)
        self.assertNotIn(serializer3.data, response.data)

    def test_filter_gifts_by_likes(self) -> None:
        gift1 = sample_gift(title="Test1", likes=Gift.LikesChoices.MUSIC)
        gift2 = sample_gift(title="Test2", likes=Gift.LikesChoices.IT)
        gift3 = sample_gift(title="Test3", likes=Gift.LikesChoices.FASHION)

        serializer1 = GiftSerializer(gift1)
        serializer2 = GiftSerializer(gift2)
        serializer3 = GiftSerializer(gift3)

        response = self.client.get(GIFT_URL, {"likes": "Music,Fashion"})

        self.assertIn(serializer1.data, response.data)
        self.assertNotIn(serializer2.data, response.data)
        self.assertIn(serializer3.data, response.data)

    def test_detail_gift_not_allowed(self) -> None:
        gift = sample_gift()
        self.assertRaises(
            NoReverseMatch, reverse, "gift:gift-detail", kwargs={"pk": gift.id}
        )


class AdminGiftTests(AuthenticatedGiftApiTests):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="admin@admin.com",
            first_name="Admin",
            last_name="Admin",
            password="admin12345",
            is_staff=True,
        )
        self.client.force_authenticate(self.user)
