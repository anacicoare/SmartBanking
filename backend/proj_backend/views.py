from rest_framework.views import APIView
from rest_framework.response import Response
from proj_backend.models import PartnerUser, ProducerUser, NormalUser, Card, Transfer

class Test(APIView):
    def get(self, request):
        return Response(data={"test": "test"}, status=200)


class Register(APIView):
    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name')
        password = request.data.get('password')
        user_type = request.data.get('user_type')

        if user_type == 'normal':
            user = NormalUser(email=email, name=name, password=password)
        elif user_type == 'producer':
            user = ProducerUser(email=email, name=name, password=password)
        elif user_type == 'partner':
            user = PartnerUser(email=email, name=name, password=password)
        else:
            return Response(status=400)

        user.save()

        return Response(data={"created user successfully"}, status=200)


class Login(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user_type = request.data.get('user_type')

        if user_type == 'normal':
            user = NormalUser.objects.filter(email=email, password=password)
        elif user_type == 'producer':
            user = ProducerUser.objects.filter(email=email, password=password)
        elif user_type == 'partner':
            user = PartnerUser.objects.filter(email=email, password=password)
        else:
            return Response(status=400)

        if user.exists():
            return Response(data={
                "email": user[0].email,
                "name": user[0].name,
                "user_type": user_type
            }, status=200)
        else:
            return Response(data={"this user does not exist"}, status=400)


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


class CardView(APIView):
    def get(self, request):
        cards = Card.objects.all()
        return Response(data=[{
            "iban": card.iban,
            "balance": card.balance,
            "is_blocked": card.is_blocked,
            "type": card.type
        } for card in cards], status=200)
    def post(self, request):
        iban = request.data.get('iban')
        balance = request.data.get('balance')
        is_blocked = request.data.get('is_blocked')
        type = request.data.get('type')
        card = Card(iban=iban, balance=balance, is_blocked=is_blocked, type=type)
        card.save()
        return Response(data={"created card successfully"}, status=200)

