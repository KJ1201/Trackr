from rest_framework.serializers import ModelSerializer
from .models import Contact

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'role', 'user', 'created_at', 'email', 'linkedin_url', 'note', 'application']
        read_only_fields = ('id', 'user', 'created_at')