from .base import *
from decouple import config

DEBUG = False

ALLOWED_HOSTS = [config('ALLOWED_HOSTS')]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('NAME'),
        'USER': config('USER'),
        'PASSWORD': config('PASSWORD'),
        'HOST': config('HOST'),
        "PORT": config('PORT')
    }
}

CORS_ALLOWED_ORIGINS = [
    config('FRONTEND_URL')
]