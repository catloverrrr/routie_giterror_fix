from django.db import models
from django.contrib.auth.models import User
#from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

from datetime import date

class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField(max_length=50, blank=True, null=True)  # 수정된 필드
    username = models.CharField(max_length=20, blank=False) #unique=True
    phonenumber = models.CharField(max_length=15, unique=True, blank=False) #unique=True
    birthday = models.DateField(blank=False, null=True, default=date(2000,1,1))
    password = models.CharField(max_length=300, blank=True, null=True)  # 수정된 필드
    password2 = models.CharField(max_length=300, blank=False)
    image=models.ImageField(upload_to='profile/', default='default.png')


    #def __str__(self):
    #    return self.user.username
    #class Meta:
    #    db_table = 'users'
        
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        

