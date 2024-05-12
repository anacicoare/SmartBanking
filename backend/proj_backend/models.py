from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Card(models.Model):
    card_number = models.CharField(max_length=16)
    iban = models.CharField(max_length=24, unique=True)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=3)
    balance = models.FloatField(default=0)
    is_blocked = models.BooleanField(default=False)
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.card_number


class NormalUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")
    cards = models.ManyToManyField(Card)

    def __str__(self):
        return self.email


class ProducerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")
    cards = models.ManyToManyField(Card)

    def __str__(self):
        return self.email


class PartnerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")
    cards = models.ManyToManyField(Card)

    def __str__(self):
        return self.email
