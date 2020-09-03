import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.core.paginator import Paginator

from .models import User, Tweet, UserFollowing, UserEncoder


def index(request):
    # https://docs.djangoproject.com/en/3.0/topics/auth/default/
    if request.user.is_authenticated:
        tweets = Tweet.objects.all()
        tweets = tweets.order_by("-timestamp").all()
        paginator = Paginator(tweets, 10)
        page_number = request.GET.get('page')
        tweets_obj = paginator.get_page(page_number)
        return render(request, 'network/logged.html', {'tweets_obj': tweets_obj}) 
    # Everyone else is prompted to sign in
    else:
        tweets = Tweet.objects.all()
        tweets = tweets.order_by("-timestamp").all()
        paginator = Paginator(tweets, 10)
        page_number = request.GET.get('page')
        tweets_obj = paginator.get_page(page_number)
        return render(request, 'network/index.html', {'tweets_obj': tweets_obj}) 


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



@login_required
def compose(request):

    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)

    # Get contents of post
    body = data.get("body", "")


    # Create tweet
    users = set()
    users.add(request.user)
    for user in users:
        tweet = Tweet(
            user=user,
            body=body
        )
        tweet.save()
    return JsonResponse({"message": "Tweet made successfully."}, status=201)






@login_required
def tweet(request, tweet_id):
    
    # Query for requested post
    try:
        tweet = Tweet.objects.get(pk=tweet_id)
    except Tweet.DoesNotExist:
        return JsonResponse({"error": "Tweet not found."}, status=404)

    # Return post contents
    if request.method == "GET":
        return JsonResponse(tweet.serialize(), safe=False)
    elif request.method == "PUT":
        data = json.loads(request.body)
         # Get contents of post
        tweet.body = data
        tweet.save()
        return JsonResponse({"success": "Tweet update was successful"}, status=201)
    else:
        return JsonResponse({"error": "GET, POST or PUT request was unsuccesful."}, status=201)

        


@login_required
def followingbox(request):
    if request.method == "GET":
        followed_people = UserFollowing.objects.filter(user_id=request.user).values('following_user_id')
        tweets = Tweet.objects.filter(user__in=followed_people)
        # Filter tweets returned based on tweetbox
        # https://stackoverflow.com/questions/53803106/django-query-how-to-find-all-posts-from-people-you-follow
        # user = request.user
        # tweets = Tweet.objects.filter(user__followers__user_id=user)
        # following_user_ids = UserFollowing.objects.filter(following_user_id__following = request.user.id).values_list('following_user_id__user_id', flat=True).distinct()
        # tweets = Tweet.objects.filter(following_id__in=following_user_ids)
        # tweets = Tweet.objects.all() 
        # tweets = Tweet.objects.filter(user=request.user)
        # find a way of filtering the tweets that are coming from the database maybe a boolean like archived of replied like in email json
            # Return emails in reverse chronologial order
        tweets = tweets.order_by("-timestamp").all()
        paginator = Paginator(tweets, 10)
        page_number = request.GET.get('page')
        tweets_obj = paginator.get_page(page_number)
        return render(request, 'network/followed_view.html', {'tweets_obj': tweets_obj}) 
    else:
        return JsonResponse({"error": "Invalid tweetbox."}, status=400)




    



@login_required
def user_profile(request, user_id):
    try:
        user_prof = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)
    # # Return post contents
    if request.method == "GET":
        tweets = Tweet.objects.filter(user=user_id) 
        tweets = tweets.order_by("-timestamp").all()
        # user_fols = UserFollowing.objects.all() 
        # https://pynative.com/make-python-class-json-serializable/
        # https://code-maven.com/serialize-datetime-object-as-json-in-python
        # def json_default(value):
        #     if isinstance(value, datetime.datetime):
        #         return value.__str__()
        #     else:
        #         return value.__dict__

        # user_prof=json.dumps(user_prof.serialize(), indent=4, cls=UserEncoder, ensure_ascii=False, default=json_default)
        # user_prof=json.loads(user_prof)
        paginator = Paginator(tweets, 10)
        page_number = request.GET.get('page')
        tweets_obj = paginator.get_page(page_number)
        context = {'user_prof': user_prof,
                    'tweets_obj': tweets_obj}
        return render(request, 'network/user_prof.html',  context)
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
        return JsonResponse({"message": "GET/POST/DELETE error"}, status=404)



@login_required
def poster_profile(request, poster_id):
    try:
        user_prof = User.objects.get(pk=poster_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)
    # # Return post contents
    if request.method == "GET":
        tweets = Tweet.objects.filter(user=poster_id) 
        tweets = tweets.order_by("-timestamp").all()
        paginator = Paginator(tweets, 10)
        page_number = request.GET.get('page')
        tweets_obj = paginator.get_page(page_number)
        context = {'user_prof': user_prof,
                    'tweets_obj': tweets_obj}
        return render(request, 'network/poster_prof.html',  context)


@login_required
def following(request, user_id):
    if request.method == "GET":
        user_prof = User.objects.get(pk=user_id)
        def json_default(value):
            if isinstance(value, datetime.datetime):
                return value.__str__()
            else:
                return value.__dict__
        user_prof=json.dumps(user_prof.serialize(), indent=4, cls=UserEncoder, ensure_ascii=False, default=json_default)
        user_prof=json.loads(user_prof)
        return JsonResponse(user_prof, safe=False)
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
        return JsonResponse({"message": "GET/POST/DELETE error"}, status=404)

        
@csrf_exempt
@login_required
def like(request, tweet_id):
    if request.method == "POST":
        is_liked = request.POST.get('is_liked')
        try:
            tweet = Tweet.objects.get(pk=tweet_id)
            if is_liked == 'no':
                tweet.like.add(request.user)
                is_liked = 'yes'
            elif is_liked == 'yes':
                tweet.like.remove(request.user)
                is_liked = 'no'
            tweet.save()
            return JsonResponse({'like_count': tweet.like.count(), 'is_liked': is_liked, "status": 201})
        except:
            return JsonResponse({'error': "Post not found", "status": 404})
    return JsonResponse({}, status=400)     