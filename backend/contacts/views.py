from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ContactViewSet(ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Contact.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    