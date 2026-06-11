from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Contact

class ContactSerializer(ModelSerializer):
    application_name = SerializerMethodField()
    class Meta:
        model = Contact
        fields = ['id', 'name', 'role', 'user', 'created_at', 'email', 'linkedin_url', 'note', 'application', 'application_name']
        read_only_fields = ('id', 'user', 'created_at')

    def get_application_name(self, obj):
        if obj.application:
            return f"{obj.application.name} at {obj.application.company}"
        return None