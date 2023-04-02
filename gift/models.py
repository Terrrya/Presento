from django.db import models


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

    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.TextField()
    for_gender = models.CharField(max_length=10, choices=GenderChoices.choices)
    image = models.ImageField(width_field=100, height_field=100)
    for_age = models.CharField(max_length=10, choices=AgeChoices.choices)
