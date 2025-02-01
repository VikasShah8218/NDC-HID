from rest_framework.response import Response
from rest_framework.views import APIView
from apps.employee.models import EmployeeLog,Employee
from apps.controller.models import HIDReader,Controller,Card
from apps.employee.serializers import EmployeeLogSerializer
from .utilities import generate_pdf_from_html
from django.http import HttpResponse

class Test(APIView):
    def post(self, request):
        return Response({"detail":"Reports is working"})

class EventReport(APIView):
    def get(self,request):
        try:
            start_date, end_date = request.GET["start_date"] , request.GET["end_date"]
            try : download = True if (request.GET["download"]).lower() == "true" else False
            except: download = False
            try:
                search_field,search_value = request.GET["field"], request.GET["value"]
                field_array = ["name","phone","cpf_no"]
                if search_field in field_array:
                    is_field = True
                else:
                    is_field = False
                    return Response({"detail":f"choose write field {field_array}"})
            except:
                is_field = False
        except:
            return Response({"detail":"Provide required fields: start_date end_date and optional field: field value"})
        
        if is_field:
            filter_args = {search_field: search_value}
            try:
                emp_log = EmployeeLog.objects.filter(**filter_args,created_on__gte = (start_date +" 00:00:00"),created_on__lt= (end_date)+" 23:59:59")
            except:
                return Response({"detail":"Unprocessable Data"})
        else:
            try:
                emp_log = EmployeeLog.objects.filter(created_on__gte = (start_date +" 00:00:00"),created_on__lt= (end_date)+" 23:59:59")
            except:
                return Response({"detail":"Unprocessable Data"})
        serializer = EmployeeLogSerializer(emp_log,many = True)
        if download:
            perms = {
            "name":request.user.username,
            "type":"Event Report",
            "start_date":start_date,
            "end_date":end_date,
            }

            output = generate_pdf_from_html(request,serializer.data,perms,"event")
            try:  
                response = HttpResponse(output, content_type='application/pdf')
                response['Content-Disposition'] = 'attachment; filename="Appointment_Report.pdf"'
            except IOError:
                response = Response({"detail":"File not exist"})
            return response
        else:
            return Response(serializer.data,status=200)
      