from django.db import models
from django.conf import settings

# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=200)
    document = models.FileField(upload_to='documents/%Y/%m/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.name
    