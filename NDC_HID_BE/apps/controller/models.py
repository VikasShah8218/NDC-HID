from django.db import models

class Controller(models.Model):
    class Meta:
        db_table = 'HID_controller'  
    ip = models.CharField(max_length=255, unique=True)
    scp_number = models.IntegerField(unique=True)
    channel_number = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Card(models.Model):
    class Meta:
        db_table = 'HID_Card'
        unique_together = ('card_number', 'facility_code')  
    card_number = models.IntegerField(db_index=True)
    facility_code = models.IntegerField(db_index=True,null=True,blank=True)
    unique_id = models.IntegerField(db_index=True,null=True,blank=True)
    issue_code = models.IntegerField(db_index=True,null=True,blank=True)
    card_holder_name = models.CharField(max_length=255, db_index=True,null=True,blank=True)
    card_holder_phone_no = models.CharField(max_length=255,db_index=True,null=True,blank=True)
    csn_number = models.IntegerField(db_index=True,null=True,blank=True)
    alvl = models.CharField(max_length=255, db_index=True,null=True,blank=True)
    allot_status = models.BooleanField(default=False,null=True,blank=True)

    def __str__(self):
        return f"Card {self.card_id} - {self.card_holder_name}"

class HIDReader(models.Model):
    class Meta:
        db_table = 'HID_Reader'
    name = models.CharField(max_length=255)
    acr_number = models.IntegerField(unique=True)