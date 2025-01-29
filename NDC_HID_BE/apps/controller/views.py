from .serializers import CardListSerializer
from ndc.celery import get_task_status, stop_task
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Card
from .tasks import test


class Test(APIView):
    def post(self, request):
        return Response({"detail":"this is working"})

class CeleryTest(APIView):
    def get(self,request):
        a = test.delay("test","test")
        return Response({"data":str(a)})
    
class CeleryStatus(APIView):
    def get(self,request,task_id):
        data = get_task_status(task_id)
        return Response({"data":data},status = 200)
    
class CeleryStop(APIView):
    def get(self,request,task_id):
        data = stop_task(task_id)
        return Response({"data":data},status = 200)
    
class Cards(ModelViewSet):
    queryset = Card.objects.all().order_by("card_number")
    pagination_class = None 
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return CardListSerializer
        # return EmployeeCreateSerializer
