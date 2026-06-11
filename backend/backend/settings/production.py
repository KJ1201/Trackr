from .base import *
from decouple import config
import dj_database_url

DEBUG = False

ALLOWED_HOSTS = [config('ALLOWED_HOSTS')]

DATABASES = {
    'default': {
        'default': dj_database_url.config(conn_max_age=600)
    }
}

CORS_ALLOWED_ORIGINS = [
    config('FRONTEND_URL')
]