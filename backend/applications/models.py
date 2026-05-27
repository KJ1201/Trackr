from django.db import models
from django.conf import settings

# Create your models here.
class Application(models.Model):
    class Status(models.TextChoices):
        APPLIED = 'applied', 'Applied'
        PENDING = 'pending', 'Pending'
        INTERVIEW = 'interview', 'Interview'
        OFFER = 'offer', 'Offer'
        REJECTED = 'rejected', 'Rejected'
        WITHDRAWN = 'withdrawn', 'Withdrawn'
    
    class Priority(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'

    name = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    desc = models.TextField(blank=True)
    applied_date = models.DateField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.APPLIED)
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.MEDIUM)
    url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.name} at {self.company}"
    
    VALID_TRANSITIONS = {
        Status.APPLIED: [Status.PENDING, Status.INTERVIEW, Status.REJECTED, Status.WITHDRAWN],
        Status.PENDING: [Status.INTERVIEW, Status.REJECTED, Status.WITHDRAWN],
        Status.INTERVIEW: [Status.OFFER, Status.REJECTED, Status.WITHDRAWN],
        Status.OFFER: [Status.WITHDRAWN],
        Status.REJECTED: [],
        Status.WITHDRAWN: [],
    }

    def can_transition_to(self, new_status):
        return new_status in self.VALID_TRANSITIONS.get(self.status, [])