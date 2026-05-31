from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import ApplicationSerializer, ApplicationStatusSerializer
from .models import Application
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from django.db.models.functions import ExtractYear, ExtractWeek

# Create your views here.
class ApplicationViewSet(ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Application.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'], url_path='update-status')
    def update_status(self, request, pk=None):
        application = self.get_object()
        serializer = ApplicationStatusSerializer(application, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(ApplicationSerializer (application).data)
    
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        applications = Application.objects.filter(user=self.request.user)
        by_status = applications.values('status').annotate(count=Count('id'))
        eight_weeks_ago = timezone.now().date() - timedelta(weeks=8)
        recent = applications.filter(applied_date__gte=eight_weeks_ago)
        by_week = (recent.values(week=ExtractWeek('applied_date'), year=ExtractYear('applied_date')).annotate(count=Count('id')).order_by('year', 'week'))

        return Response({
            'total': applications.count(), 
            'active': applications.exclude(status__in=['rejected', 'withdrawn']).count(),
            'offers': applications.filter(status='offer').count(),
            'by_status': list(by_status),
            'by_week': list(by_week)
        })    
    

    
    