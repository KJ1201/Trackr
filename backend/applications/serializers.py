from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'company', 'desc', 'applied_date', 'status', 'priority', 'url', 'created_at', 'updated_at', 'user']
        read_only_fields = ('id', 'user', 'created_at', 'updated_at', 'status')

class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']

    def validate_status(self, new_status):
        if not self.instance.can_transition_to(new_status):
            raise serializers.ValidationError(f"Cannot transition from {self.instance.status} to {new_status}")
        
        return new_status
    