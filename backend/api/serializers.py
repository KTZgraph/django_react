from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from rest_framework import serializers
from .models import Movie, Rating


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password') # trzeba apodac tez pole password
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        """
        Nadpisanie wbudowanej metody
        """
        user = User.objects.create_user(**validated_data) #wypakowywanie danych
        Token.objects.create(user=user) #tworzenie Tokena, bo django nie robi tego z automatu
        return user


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'no_of_ratings', 'avg_rating')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'stars', 'user', 'movie')
