import os
from celery import Celery
from celery.signals import worker_init
from celery.result import AsyncResult
from celery import Celery
import psutil
import os
# import multiprocessing
# multiprocessing.set_start_method('spawn')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ndc.settings')
app = Celery('ndc')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.update(
    broker_connection_retry_on_startup=True
)
app.conf.worker_prefetch_multiplier = 10
app.conf.task_queues = {
    'high_priority': {
        'exchange': 'high_priority',
        'exchange_type': 'direct',
        'routing_key': 'high_priority',
    },
    'medium_priority': {
        'exchange': 'medium_priority',
        'exchange_type': 'direct',
        'routing_key': 'medium_priority',
    },
    'low_priority': {
        'exchange': 'low_priority',
        'exchange_type': 'direct',
        'routing_key': 'low_priority',
    },
}
# app.autodiscover_tasks(["apps.visitor_log.task"])

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
   print('Request: {0!r}'.format(self.request))


@app.task(bind=True)
def list_registered_tasks(self):
    print("celery.py run")
    return app.tasks.keys()


@worker_init.connect
def setup(sender=None, conf=None, **kwargs):
    # Preload heavy modules or setup database connections here
    print("Worker initialized and ready to process tasks!")




def get_task_status(task_id):
    # Get the AsyncResult object
    task = AsyncResult(task_id)

    # Get basic task status and info
    status = task.status  # The task's current state (PENDING, STARTED, etc.)
    result = task.result  # The result of the task once it's completed
    trace = task.traceback  # If the task failed, this will contain the traceback
    # started = task.started()  # Timestamp of when the task started (if available)

    # Check if the task is complete
    if task.state == 'SUCCESS':
        task_status = "Task completed successfully."
    elif task.state == 'FAILURE':
        task_status = f"Task failed with error: {trace}"
    elif task.state == 'STARTED':
        task_status = "Task is currently running."
    else:
        task_status = "Task is in an unknown state."

    # Get system resource usage (if available for this task)
    try:
        # Get the PID of the worker executing the task (requires monitoring the worker)
        pid = task.worker_pid if hasattr(task, 'worker_pid') else None
        if pid:
            process = psutil.Process(pid)
            cpu_usage = process.cpu_percent(interval=1)  # CPU usage over 1 second
            memory_usage = process.memory_info().rss  # Memory usage in bytes
        else:
            cpu_usage = "N/A"
            memory_usage = "N/A"
    except Exception as e:
        cpu_usage = memory_usage = "Error retrieving resource data"

    # Return the task status and resource usage
    task_details = {
        "status": status,
        "task_status": task_status,
        "result": result,
        "cpu_usage": cpu_usage,
        "memory_usage": memory_usage,
        # "started": started,
        "trace": trace if task.state == 'FAILURE' else None
    }

    return task_details


def stop_task(task_id):
    task = AsyncResult(task_id, app=app)
    if task.state == 'STARTED':
        task.revoke(terminate=True)
        return {"status": "Task terminated successfully"}
    else:
        return {"status": f"Task is in state {task.state}, cannot be terminated."}
    

