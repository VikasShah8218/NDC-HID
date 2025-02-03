from django.shortcuts import render

def index(request, resource=None):
    print("\n"*3,"TEsting 01","\n"*3)
    return render(request, 'index.html')