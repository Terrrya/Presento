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
        UNDER_18 = "0-16"
        BETWEEN_18_25 = "17-25"
        BETWEEN_26_35 = "26-45"
        OVER_45 = "46-100"

    class OccasionChoices(models.Choices):
        BIRTHDAY = "Birthday"
        WEDDING = "Wedding"
        NEW_YEAR = "New Year"
        VALENTINES_DAY = "Valentines Day"
        GRADUATION = "Graduation"

    class LikesChoices(models.Choices):
        IT = "IT"
        BEAUTY = "Beauty"
        SPORT = "Sport"
        CARS = "Cars"
        FASHION = "Fashion"
        MUSIC = "Music"

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
