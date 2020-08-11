from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    

    def serialize(self):
        return{
            "id": self.id,
            "username":self.username,
            "tweets": [{"id":tweets.id,"body": tweets.body, "time": tweets.timestamp} for tweets in self.tweets.all()],
            "following":[[user.id, user.created] for user in self.following.all()],
            "followers":[[user.id, user.created] for user in self.followers.all()]

        }

# The intermediary Model
class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)

    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    # You can even add info about when user started following
    created = models.DateTimeField(auto_now_add=True, db_index=True)

     
    class Meta:
        unique_together = (('user_id', 'following_user_id'),)
        ordering = ["-created"]

        # def __str__(self):
        #     f"{self.user_id} follows {self.following_user_id}"

        


        

class Tweet(models.Model):
    user = models.ForeignKey(User, related_name="tweets", on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

# listing is actually quite tricky
# https://stackoverflow.com/questions/26067369/how-to-pass-model-fields-to-a-jsonresponse-object
    def serialize(self):
        return {'id':self.id,'user_id':self.user.id, 'user_username':self.user.username,'body':self.body,'time':self.timestamp}

    



