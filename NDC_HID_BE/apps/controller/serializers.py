from rest_framework import serializers
from .models import Controller, HIDReader

class ControllerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Controller
        fields = "__all__"

class HIDReaderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = HIDReader
        fields = "__all__"