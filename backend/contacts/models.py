from django.db import models
from django.conf import settings
from applications.models import Application

# Create your models here.
class Contact(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='contact')
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='contact')
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    email = models.EmailField(blank=True)
    linkedin_url = models.URLField(blank=True)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role}"
    