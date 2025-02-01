from rest_framework import serializers
from .models import Employee,EmployeeLog,Department
from django.utils.timezone import localtime

# Serializer for GET operations
class EmployeeListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    card_number = serializers.CharField(source="card.card_number", read_only=True)
    is_photo = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id", "card_number","card_id", "cpf_no", "name", "marks", "address",
            "mobile_no", "phone_landline", "phone_dept", "phone_ext", "blood_group",
            "dob", "level", "email", "date_of_joining", "department_name","department_id",
            "designation", "active", "created_on", "updated_on","is_photo"
            # "photo"
        ]
    def get_is_photo(self,obj):
        return True if obj.photo else False
    
class EmployeeEventListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    card_number = serializers.CharField(source="card.card_number", read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id", "card_number","card_id", "cpf_no", "name", "marks", "address",
            "mobile_no", "phone_landline", "phone_dept", "phone_ext", "blood_group",
            "dob", "level", "email", "date_of_joining", "department_name","department_id",
            "designation", "active", "created_on", "updated_on","photo",
        ]


# Serializer for CREATE and UPDATE operations
class EmployeeCreateSerializer(serializers.ModelSerializer):
    cpf_no = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    # department = serializers.CharField(required=True)
    class Meta:
        model = Employee
        fields = [
            "card", "cpf_no", "name", "marks", "address", "mobile_no",
            "phone_landline", "phone_dept", "phone_ext", "blood_group", "dob",
            "level", "email", "date_of_joining", "department", "designation", "photo"
        ]
class DepartmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"

class EmployeeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
        read_only_fields = ["id", "created_on"]

class EmployeeLogSerializer(serializers.ModelSerializer):
    employee = serializers.SerializerMethodField()
    card = serializers.SerializerMethodField()
    reader = serializers.SerializerMethodField()
    created_on = serializers.SerializerMethodField()

    class Meta:
        model = EmployeeLog
        fields = ["employee", "card", "reader", "created_on"]

    def get_employee(self, obj):
        return {"id": obj.employee.id, "name": obj.employee.name,"cpf_no":obj.employee.cpf_no,
                "department_name":obj.employee.department.name if obj.employee.department else None,"designation":obj.employee.designation,
                "photo":obj.employee.photo
                } if obj.employee else None

    def get_card(self, obj):
        return {"id": obj.card.id, "card_number": obj.card.card_number,"csn_number":obj.card.csn_number} if obj.card else None

    def get_reader(self, obj):
        return {"id": obj.reader.id, "name": obj.reader.name,"location":obj.reader.location} if obj.reader else None

    def get_created_on(self, obj):
        if obj.created_on: return localtime(obj.created_on).strftime("%Y-%m-%d %I:%M %p")
        return None
