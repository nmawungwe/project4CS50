
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),


    #API routes
    path("tweets", views.compose, name="compose"),
    path("tweets/<str:tweetbox>", views.tweetbox, name="tweetbox"),
    path("tweets/<int:tweet_id>", views.tweet, name="tweet"),
    path("user_profile/<int:user_id>", views.user_profile, name="user_profile"),


]
