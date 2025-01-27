from celery import shared_task
import time

@shared_task(name='entry',queue='high_priority')
def test():
    while True:
        try:
            print("Test")
        except Exception as e:
            print(str(e))
        time.sleep(0.1)
