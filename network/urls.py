
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),


    #API routes
    path("tweets", views.compose, name="compose"),
    path("followingbox", views.followingbox, name="followingbox"),
    # path("tweets_following/<str:tweetbox>", views.tweetbox_following, name="tweetbox_following"),
    path("tweet/<int:tweet_id>", views.tweet, name="tweet"),
    path("user_profile/<int:user_id>", views.user_profile, name="user_profile"),
    path("poster_profile/<int:poster_id>", views.poster_profile, name="poster_profile"),
    path("following/<int:user_id>", views.following, name="following"),
    path("like/<int:tweet_id>", views.like, name="like")

]
