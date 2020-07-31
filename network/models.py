from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    

    def serialize(self):
        return{
            "id": self.id,
            "username":self.username,
            "following":[user.id for user in self.following.all()],
            "followers":[user.id for user in self.followers.all()]

        }

# The intermediary Model
class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)

    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    # You can even add info about when user started following
    created = models.DateTimeField(auto_now_add=True, db_index=True)

     
    class Meta:
        unique_together = ("user_id", "following_user_id",)
        ordering = ["-created"]

        # def __str__(self):
        #     f"{self.user_id} follows {self.following_user_id}"

        


        

class Tweet(models.Model):
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

    



