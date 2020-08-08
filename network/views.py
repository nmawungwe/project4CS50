import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Tweet, UserFollowing


def index(request):

    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
@login_required
def compose(request):

    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)

    # Get contents of post
    body = data.get("body", "")
    likes = data.get("likes", "")

    # Create tweet
    users = set()
    users.add(request.user)
    for user in users:
        tweet = Tweet(
            user=user,
            body=body,
            likes=likes
        )
        tweet.save()
    return JsonResponse({"message": "Tweet made successfully."}, status=201)





@csrf_exempt
@login_required
def tweet(request, tweet_id):
    
    # Query for requested post
    try:
        tweet = Tweet.objects.get(user=request.user, pk=tweet_id)
    except Tweet.DoesNotExist:
        return JsonResponse({"error": "Tweet not found."}, status=404)

    # Return post contents
    if request.method == "GET":
        return JsonResponse(tweet.serialize())


# @login_required
def tweetbox(request, tweetbox):
    # Filter tweets returned based on tweetbox
    if tweetbox == "all":
        tweets = Tweet.objects.all()    
    elif tweetbox == "following":
        # https://stackoverflow.com/questions/53803106/django-query-how-to-find-all-posts-from-people-you-follow
        user = request.user
        tweets = Tweet.objects.filter(user__followers__user_id=user)
        # following_user_ids = UserFollowing.objects.filter(following_user_id__following = request.user.id).values_list('following_user_id__user_id', flat=True).distinct()
        # tweets = Tweet.objects.filter(following_id__in=following_user_ids)
        # tweets = Tweet.objects.all() 
        # tweets = Tweet.objects.filter(user=request.user)
        # find a way of filtering the tweets that are coming from the database maybe a boolean like archived of replied like in email json
    else:
        return JsonResponse({"error": "Invalid tweetbox."}, status=400)
    # Return emails in reverse chronologial order
    tweets = tweets.order_by("-timestamp").all()
    return JsonResponse([tweet.serialize() for tweet in tweets], safe=False)


    


@csrf_exempt
@login_required
def user_profile(request, user_id):
        try:
            user_prof = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
        # # Return post contents
        if request.method == "GET":
            return JsonResponse(user_prof.serialize())
        elif request.method == "POST":
            user_id = User.objects.get(pk=user_id)
            following = UserFollowing(user_id=request.user, following_user_id=user_id)
            following.save()
            return JsonResponse({"message": "Following made successfully."}, status=201)
        elif request.method == "DELETE":
            user_id = User.objects.get(pk=user_id)
            unfollow = UserFollowing.objects.get(user_id=request.user,following_user_id=user_id)
            unfollow.delete()
            return JsonResponse({"message": "Unfollowing succesful"}, status=201)
        else:
            return JsonResponse({"message": "Error"}, status=404)
        
            