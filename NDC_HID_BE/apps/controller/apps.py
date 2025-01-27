from django.apps import AppConfig
import os

class ControllerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.controller'

    def ready(self):
        if os.environ.get('RUN_MAIN', None) != 'true':
            print("-"*10,"HID is Initiated","-"*10)
            # from .hid import initialise_driver_
            # initialise_driver_() 