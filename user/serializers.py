from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext as _
from django.core.exceptions import ValidationError
from rest_framework.authentication import authenticate
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """User (customer) model."""

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_staff",
        )
        read_only_fields = (
            "id",
            "is_staff",
        )
        extra_kwargs = {"password": {"write_only": True, "min_length": 8}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, set the password correctly and return it"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

    # def partial_update(self, instance, validated_data):
    #     """Update a user, set the password correctly and return it"""
    #     password = validated_data.pop("password", None)
    #     user = super().update(instance, validated_data)
    #
    #     if password:
    #         user.set_password(password)
    #         user.save()
    #
    #     return user

    def validate(self, data):
        """
        Validate data with validating password using AUTH_PASSWORD_VALIDATORS
        """
        user = get_user_model()(**data)
        password = data.get("password")

        if password:
            errors = dict()
            try:
                validate_password(password=password, user=user)
            except ValidationError as e:
                errors["password"] = list(e.messages)
            if errors:
                raise serializers.ValidationError(errors)

        return super(UserSerializer, self).validate(data)


# Temporally added, should remove when frontend add JWT tokens


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"))
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs: dict) -> dict:
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"),
                email=email,
                password=password,
            )

            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _("Must include 'email' and 'password'.")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs