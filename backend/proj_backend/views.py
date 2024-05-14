from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from proj_backend.serializers import MyTokenObtainPairSerializer, UserSerializer


from proj_backend.models import PartnerUser, ProducerUser, NormalUser, Card, Transfer

class Test(APIView):
    def get(self, request):
        return Response(data={"test": "test"}, status=200)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# class Register(APIView):
#     queryset = NormalUser.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer
#     def post(self, request):
#         email = request.data.get('email')
#         name = request.data.get('name')
#         password = request.data.get('password')
#         user_type = request.data.get('user_type')
#
#         if user_type == 'normal':
#             user = NormalUser(email=email, name=name, password=password)
#         elif user_type == 'producer':
#             user = ProducerUser(email=email, name=name, password=password)
#         elif user_type == 'partner':
#             user = PartnerUser(email=email, name=name, password=password)
#         else:
#             return Response(status=400)
#
#         user.save()
#
#         return Response(data={"created user successfully"},status=200)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
