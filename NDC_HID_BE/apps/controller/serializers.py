from rest_framework import serializers
from .models import Controller, HIDReader,Card

class ControllerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Controller
        fields = "__all__"

class HIDReaderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = HIDReader
        fields = "__all__"
    
class CardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id","card_number","csn_number","allot_status"]