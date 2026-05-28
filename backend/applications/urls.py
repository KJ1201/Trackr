from django.urls import path, include
from .views import ApplicationViewSet, DashboardStatsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ApplicationViewSet, basename='applications')

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view()),
    path('', include(router.urls)),
]
