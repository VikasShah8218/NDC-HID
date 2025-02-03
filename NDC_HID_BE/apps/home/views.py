from django.shortcuts import render

def index(request, resource=None):
    print("TEsting 01")
    return render(request, 'index.html')