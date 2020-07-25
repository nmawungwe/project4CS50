from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.TextField(blank=True)


    def serialize(self):
        return{
            "id":self.id,
            "poster":self.user.username,
            "body":self.body,
            "timestamp":self.timestamp,
            "likes":self.likes 
        }

    



