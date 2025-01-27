from .serializers import EmployeeListSerializer, EmployeeCreateSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Employee


class Test(APIView):
    def post(self, request):
        return Response({"detail":"this is working"})


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()

    def get_serializer_class(self):
        """
        Returns the appropriate serializer depending on the action.
        """
        if self.action in ["list", "retrieve"]:
            return EmployeeListSerializer
        return EmployeeCreateSerializer