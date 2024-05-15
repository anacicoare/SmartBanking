import random
from datetime import datetime, timedelta

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from proj_backend.serializers import MyTokenObtainPairSerializer, UserSerializer, CardSerializer

from proj_backend.models import Card, Transfer, UserData


class Test(APIView):
    def get(self, request):
        return Response(data={"test": "test"}, status=200)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TransferView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        details = request.data.get('details')
        sender = request.data.get('sender')

        receiver = request.data.get('receiver')
        iban = request.data.get('iban')
        iban_sender = request.data.get('iban_sender')

        # check if sender has enough money
        sender_card = Card.objects.get(iban=iban_sender)
        if sender_card.balance < amount:
            return Response(data={"insufficient balance"}, status=403)

        # transfer money
        sender_card.balance -= amount
        sender_card.save()

        # update receiver balance
        receiver_card = Card.objects.get(iban=iban)
        receiver_card.balance += amount
        receiver_card.save()

        # save transfer
        transfer = Transfer(amount=amount, details=details, sender=sender, receiver=receiver, iban=iban, iban_sender=iban_sender)
        transfer.save()

        return Response(data={"transfered successfully"}, status=200)


class AddCard(APIView):
    def post(self, request):
        country_code = 'RO'
        check_digits = ''.join(random.choices('0123456789', k=2))
        bban = ''.join(random.choices('0123456789', k=14))
        iban = country_code + check_digits + bban

        # Perform modulus 97 operation to get the checksum
        iban = iban[4:] + iban[:4]
        iban = ''.join(str(int(c, 36)) if c.isalpha() else c for c in iban)
        checksum = int(iban) % 97

        # Format IBAN with checksum
        checksum_digits = '{:02d}'.format(98 - checksum)
        iban = country_code + checksum_digits + bban

        # Format IBAN with spaces for better readability
        iban = ' '.join(iban[i:i+4] for i in range(0, len(iban), 4))

        name = request.data.get('name')
        # Generate the first digit (Issuer Identification Number, IIN)
        iin = '4'  # For Visa cards, starts with 4
        # Generate the next 15 digits (Account Identifier)
        account_number = ''.join(random.choices('0123456789', k=15))
        # Concatenate the IIN and the account number
        card_number = iin + account_number
        # Add spaces for readability
        formatted_card_number = ' '.join(card_number[i:i + 4] for i in range(0, len(card_number), 4))
        card_number = formatted_card_number


        current_date = datetime.now()
        five_years_later = current_date + timedelta(days=365 * 5)
        expiration_date = five_years_later

        cvv = ''.join(random.choices('0123456789', k=3))

        balance = 0

        is_blocked = False

        type = request.data.get('type')

        card = Card(name=name, card_number=card_number, iban=iban, expiration_date=expiration_date, cvv=cvv, balance=balance, is_blocked=is_blocked, type=type)
        card.save()

        sender_email = request.data.get('email')
        crt_user = UserData.objects.get(email=sender_email)
        crt_user.cards.add(card)
        crt_user.save()

        cards = [CardSerializer(card).data for card in crt_user.cards.all()]

        return Response(data={"cards": cards}, status=200)


class MyCards(APIView):
    def get(self, request):
        # Retrieve email query parameter from request.GET
        email = request.GET.get('email')
        if email:
            try:
                # Retrieve user data based on the provided email
                user = UserData.objects.get(email=email)
                cards = [CardSerializer(card).data for card in user.cards.all()]
                return Response(data={"cards": cards}, status=200)
            except UserData.DoesNotExist:
                return Response(data={"error": "User not found"}, status=404)
        else:
            return Response(data={"error": "Email parameter is missing"}, status=400)
