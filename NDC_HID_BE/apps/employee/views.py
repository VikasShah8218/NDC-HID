from apps.controller.serializers import HIDReaderListSerializer , ControllerListSerializer
from .serializers import EmployeeListSerializer, EmployeeCreateSerializer,EmployeeEventListSerializer,EmployeeUpdateSerializer,DepartmentListSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Employee,Department,EmployeeLog
from ws.utils import send_message
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from apps.controller.models import Card, HIDReader,Controller
from django.http import FileResponse, HttpResponse
from django.utils.timezone import make_aware
from django.utils.timezone import now
from datetime import datetime
import base64
import pytz
import io


class Test(APIView):
    def post(self, request):
        return Response({"detail":"this is working"})

    
class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all().order_by("name")
    pagination_class = None 
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return DepartmentListSerializer

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.filter(active = True).order_by("-id")
    pagination_class = None 
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return EmployeeListSerializer
        return EmployeeCreateSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            data =  request.data
            serializer = EmployeeCreateSerializer(data = data)
            serializer.is_valid(raise_exception=True)
            card = Card.objects.get(id = data["card_id"])
            if card: data["card"] = card.id
            data["department"] = data.get("department_id",None)
            if card.allot_status:
                emp = Employee.objects.get(card = card, active= True)
                return  Response({"detail":f"This Card is already assigned to {emp.name}"},status=409)
            serializer.save()
            card.allot_status = True
            card.save()
            return Response({"detail":serializer.data}, status=200)
        except Card.DoesNotExist :
            return Response({"detail": "Selected Card not Found"}, status=404)
        except Exception as e:
            return Response({"detail":str(e)},status=500)
        
    def update(self, request, *args, **kwargs):
        try:
            emp = self.get_object()
            data =  request.data
            card_id = data.get("card_id",None)
            if card_id: 
                Employee.objects.filter(card_id = card_id, active = True).update(card_id = None)
                data["card"] = card_id
            if emp.card:
                emp.card.allot_status = False
                emp.card.save()

            department_id = data.get("department_id",None)
            if department_id: data["department"] = department_id

            serializer = EmployeeUpdateSerializer(emp , data = data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response({"detail":"Updated"},status=200)
        except Exception as e:
            return Response({"detail":str(e)},status=500)
        

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

def validate_event(scp_number:int,card_number:int,acr_number:int,acc_time:int):
    print("-"*100)
    print(acc_time)
    print("-"*100)
    try:
        card = Card.objects.get(card_number=card_number)
        emp  = Employee.objects.get(active = True,card = card.id)
        rea = HIDReader.objects.get(acr_number=acr_number)
        data = {"EMP":{
            "controller":ControllerListSerializer(Controller.objects.get(scp_number=scp_number)).data ,
            "employee":EmployeeEventListSerializer(emp).data, 
            "reader":HIDReaderListSerializer(rea).data,
            "time":now().astimezone(pytz.timezone("Asia/Kolkata")).strftime("%d-%m-%Y %I:%M %p")
            }}
        EmployeeLog.objects.create(employee = emp, card = card,reader=rea, created_on = make_aware(datetime.fromtimestamp(int(acc_time))))
        
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



