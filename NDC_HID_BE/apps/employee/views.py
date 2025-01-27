from apps.controller.serializers import HIDReaderListSerializer , ControllerListSerializer
from .serializers import EmployeeListSerializer, EmployeeCreateSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Employee
from ws.utils import send_message
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from apps.controller.models import Card, HIDReader,Controller
import time
from django.utils.timezone import now


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

@api_view(["GET"])
@csrf_exempt
def test_message(request):
    if request.method == "GET":
        try:
            send_message({"EMP": EmployeeListSerializer(Employee.objects.get(id=10)).data})
            return Response({"status": "Message sent"})
        except Exception as e :
            print(str(e))
    return Response({"detail":"method not allowed"},status = 402)

def validate_event(scp_number:int,card_number:int,acr_number:int):
    try:
        card = Card.objects.get(card_number=card_number)
        data = {"EMP":{
            "controller":ControllerListSerializer(Controller.objects.get(scp_number=scp_number)).data ,
            "employee":EmployeeListSerializer(Employee.objects.get(active = True,card = card.id)).data, 
            "reader":HIDReaderListSerializer(HIDReader.objects.get(acr_number=acr_number)).data,
            "time":now().isoformat()
            }}
        print(data)
        send_message(data)
        return data
    except Card.DoesNotExist:
        error = {"error":"Card Not Exist"}
        print(error)
        send_message(error)
        return(error)
    except Employee.DoesNotExist:
        error = {"error":"Employee Not Exist"}
        print(error)
        send_message(error)
        return(error)
    except Controller.DoesNotExist:
        error = {"error":"Controller Not Exist"}
        print(error)
        send_message(error)
        return(error)
    except HIDReader.DoesNotExist:
        error = {"error":"Reader Not Exist"}
        print(error)
        send_message(error)
        return(error)
