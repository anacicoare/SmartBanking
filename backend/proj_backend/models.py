from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class NormalUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.email


class ProducerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.email


class PartnerUser(models.Model):
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.email
