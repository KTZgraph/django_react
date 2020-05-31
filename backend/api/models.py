from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def avg_rating(self):
        ratings = Rating.objects.filter(movie=self)
        if len(ratings) > 0:
            return sum([r.stars for r in ratings])/len(ratings)
        else:
            return 0

class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) # jak usune film to usunę opinie
    user = models.ForeignKey(User, on_delete=models.CASCADE) # jak usune użytkownika to usunę opinie
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
