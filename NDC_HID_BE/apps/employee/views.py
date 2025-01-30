from apps.controller.serializers import HIDReaderListSerializer , ControllerListSerializer
from .serializers import EmployeeListSerializer, EmployeeCreateSerializer,EmployeeEventListSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Employee
from ws.utils import send_message
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from apps.controller.models import Card, HIDReader,Controller
from django.utils.timezone import now
from apps.employee.models import EmployeeLog



from django.http import FileResponse, HttpResponse
import base64
import io


class Test(APIView):
    def post(self, request):
        return Response({"detail":"this is working"})

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all().order_by("-id")
    pagination_class = None 
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return EmployeeListSerializer
        return EmployeeCreateSerializer
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

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


def image_pic(request, id):
    try:
        emp = Employee.objects.get(id=id)
        if not emp.photo:
            return HttpResponse("No image available", status=404)
        image_data = base64.b64decode(emp.photo)
        image_io = io.BytesIO(image_data)
        response = FileResponse(image_io, content_type="image/png")
        response["Content-Disposition"] = f'inline; filename="employee_{id}.png"'
        # response["Cache-Control"] = "public, max-age=86400"
        # response["Expires"] = "Tue, 01 Jan 2030 00:00:00 GMT"
        if "Cache-Control" in request.headers and "no-cache" in request.headers["Cache-Control"]:
            response["Cache-Control"] = "no-store, must-revalidate"
        else:
            response["Cache-Control"] = "public, max-age=86400, must-revalidate"
        return response


    except Employee.DoesNotExist:
        return HttpResponse("Employee not found", status=404)
    except Exception as e:
        return HttpResponse(f"Error: {str(e)}", status=500)

def validate_event(scp_number:int,card_number:int,acr_number:int):
    try:
        card = Card.objects.get(card_number=card_number)
        emp  = Employee.objects.get(active = True,card = card.id)
        rea = HIDReader.objects.get(acr_number=acr_number)
        data = {"EMP":{
            "controller":ControllerListSerializer(Controller.objects.get(scp_number=scp_number)).data ,
            "employee":EmployeeEventListSerializer(emp).data, 
            "reader":HIDReaderListSerializer(rea).data,
            "time":now().isoformat()
            }}
        EmployeeLog.objects.create(employee = emp, card = card,reader=rea)
        
        # print(data)
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
