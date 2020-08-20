from django.contrib.auth.models import AbstractUser
from django.db import models
import json
from json import JSONEncoder


class User(AbstractUser):
    

    def serialize(self):
        return{
            "id": self.id,
            "username":self.username,
            "tweets": [{"id":tweets.id,"body": tweets.body, "time": tweets.timestamp} for tweets in self.tweets.order_by("-timestamp").all()],
            "following":[user.following_user_id.id for user in self.following.all()],
            "followers":[user.user_id.id for user in self.followers.all()]

        }

# The intermediary Model
class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)

    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)



     


    def serialize(self):
        return{
            "user": self.user_id,
            "following": self.following_user_id
        }
       

        


        

class Tweet(models.Model):
    user = models.ForeignKey(User, related_name="tweets", on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    

 
# listing is actually quite tricky
# https://stackoverflow.com/questions/26067369/how-to-pass-model-fields-to-a-jsonresponse-object
# https://stackoverflow.com/questions/48008184/method-object-is-not-json-serializable
    def serialize(self):
        return {'id':self.id,'user_id':self.user.id, 'user_username':self.user.username,'body':self.body,'time':self.timestamp, 'likes':self.likes.count(), 'user_likes_ids':[like.user_id.id for like in self.likes.all()]}

class Like(models.Model):
    tweet = models.ForeignKey(Tweet, related_name="likes", on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)

    def serialize(self):
        return{'id':self.id, 'tweet_id':self.tweet.id}


# https://pynative.com/make-python-class-json-serializable/
# subclass JSONEncoder
class UserEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__

        # def json_default(value):
        #     if isinstance(value, datetime.date):
        #         return dict(year=value.year, month=value.month, day=value.day)
        #     else:
        #         return value.__dict__

