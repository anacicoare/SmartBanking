from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


# Create your models here.


class Card(models.Model):
    card_number = models.CharField(max_length=16)
    iban = models.CharField(max_length=34, unique=True)
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


class Transfer(models.Model):
    amount = models.FloatField()
    details = models.CharField(max_length=255)
    sender = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    iban_sender = models.CharField(max_length=34, validators=[RegexValidator(
        regex=r'^[A-Z]{2}\d{2}[A-Z\d]{1,30}$',
        message='IBAN must be in valid format.',
        code='invalid_iban'
    )
    ])
    iban = models.CharField(max_length=34, validators=[RegexValidator(
        regex=r'^[A-Z]{2}\d{2}[A-Z\d]{1,30}$',
        message='IBAN must be in valid format.',
        code='invalid_iban'
    )
    ])
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} -> {self.receiver} : {self.amount}'
