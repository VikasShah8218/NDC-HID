from rest_framework import serializers
from .models import Employee

# Serializer for GET operations
class EmployeeListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    card_number = serializers.CharField(source="card.card_number", read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id", "card_number", "cpf_no", "name", "marks", "address",
            "mobile_no", "phone_landline", "phone_dept", "phone_ext", "blood_group",
            "dob", "level", "email", "date_of_joining", "department_name",
            "designation", "photo", "active", "created_on", "updated_on"
        ]


# Serializer for CREATE and UPDATE operations
class EmployeeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "card", "cpf_no", "name", "marks", "address", "mobile_no",
            "phone_landline", "phone_dept", "phone_ext", "blood_group", "dob",
            "level", "email", "date_of_joining", "department", "designation", "photo", "active"
        ]
