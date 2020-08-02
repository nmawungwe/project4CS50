document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#user_prof').addEventListener('click',()=>{
    const el = document.querySelector('#user_prof')
        // console.log('clicking')

        user_id = el.dataset.user
        console.log(user_id) 

    
    
    user_profile(fetch(`/user_profile/${user_id}`).then(response => response.json()).then(user_prof => {
        // Print email
        console.log(user_prof)
    }))
    


})

document.querySelector('#all_posts').addEventListener('click', ()=>{

    const el = document.querySelector('#all_posts')
    console.log(el.dataset.post)

    all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
            // Print email
            console.log(tweets)
        }))
})


// working sort of 
document.querySelector('#btn').addEventListener('click',()=>{

    id = 1
    fetch(`/tweet/${id}`).then(response => response.json()).then(tweet => {
        // Print email
        console.log(tweet)
    })
})

document.querySelector('#post').addEventListener('click',()=>{

    fetch('/tweets', {
        method: 'POST',
        body: JSON.stringify({
            body: 'Wadii',
            likes: '1'
        })
      }).then(response => response.json()).then(result => {
          // Print result
          console.log(result);
      })

})




document.querySelector('#following').addEventListener('click',()=>{
    following_tweets(fetch(`/tweets/following`).then(response => response.json()).then(tweets => {
        // Print email
        console.log(tweets)
    })
)})


all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
    // Print email
    console.log(tweets)
}))
})


function compose_tweet() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_posts_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

}

function all_tweets() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'block';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

}

function following_tweets() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';

}

function user_profile() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'block';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';

   

}