from rest_framework.serializers import ModelSerializer
from .models import Document

class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'document', 'user', 'uploaded_at']
        read_only_fields = ('id', 'user', 'uploaded_at')