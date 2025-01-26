from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Django 3.2 이상에서는 추가
    name = 'users'

    def ready(self):
        import users.signals  # signals.py 파일을 로드
