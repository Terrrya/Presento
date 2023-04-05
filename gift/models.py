from __future__ import annotations

import os
import uuid

from django.db import models
from django.utils.text import slugify


def gift_image_file_path(instance: Gift, filename: str) -> str:
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.title)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/gifts/", filename)


class Gift(models.Model):
    class GenderChoices(models.Choices):
        MALE = "Male"
        FEMALE = "Female"
        BOTH = "Both"

    class AgeChoices(models.Choices):
        UNDER_18 = "Under 18"
        BETWEEN_18_25 = "18-25"
        BETWEEN_26_35 = "26-35"
        BETWEEN_36_45 = "36-45"
        BETWEEN_46_55 = "46-55"
        BETWEEN_56_65 = "56-65"
        OVER_65 = "Over 65"

    class OccasionChoices(models.Choices):
        BIRTHDAY = "Birthday"
        WEDDING = "Wedding"
        NEW_YEAR = "New year"

    class LikesChoices(models.Choices):
        COMPUTER = "Computer"
        DANCE = "Dance"
        SPORT = "Sport"
        GADGET = "Gadget"
        CLOTHES = "Clothes"

    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.TextField()
    gender = models.CharField(
        max_length=10, choices=GenderChoices.choices, blank=True
    )
    image = models.ImageField(
        null=True, upload_to=gift_image_file_path, blank=True
    )
    age = models.CharField(
        max_length=10, choices=AgeChoices.choices, blank=True
    )
    occasion = models.CharField(
        max_length=15, choices=OccasionChoices.choices, blank=True
    )
    likes = models.CharField(
        max_length=15, choices=LikesChoices.choices, blank=True
    )
