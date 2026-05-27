from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class DocumentViewSet(ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    