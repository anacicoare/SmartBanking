from rest_framework.views import APIView
from rest_framework.response import Response
from proj_backend.models import PartnerUser, ProducerUser, NormalUser


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

        return Response(data={"created user successfully"},status=200)


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
            },status=200)
        else:
            return Response(data={"this user does not exist"}, status=400)

        