document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#user_prof').addEventListener('click',()=>{
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
    const el = document.querySelector('#user_prof')
        // console.log('clicking')
    user_id = el.dataset.user
        // console.log(user_id) 
    user_profile(fetch(`/user_profile/${user_id}`).then(response => response.json()).then(user_prof => {
        // Print email
        // console.log(user_prof)
        // console.log(user_prof.id)
        const  followers = user_prof.followers.length
        const  following = user_prof.following.length

        document.querySelector('#box-heading').innerHTML = `<b>User profile: </b>${user_prof.username}`
        document.querySelector('#followers').innerHTML = `<b>Followers: </b>${followers}`
        document.querySelector('#followings').innerHTML = `<b>Following: </b>${following}`

        console.log(user_prof.tweets)  

        var messages = user_prof.tweets.map(label).join(' ')
        document.querySelector('#user_profile_tweets').innerHTML = messages

        function label(tweet) {

                let time = new Date(tweet.timestamp)
                // console.log(time.toDateString())
                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                  return `<button data-id="${tweet.id}">${tweet.body}<div>${date}</div></button><br>`
            }
    }))
})

document.querySelector('#all_posts').addEventListener('click', ()=>{

    const el = document.querySelector('#all_posts')
    // console.log(el.dataset.post)

    all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
            // Print email
            // console.log(tweets)
            console.log(tweets[0])

            var messages = tweets.map(label).join(' ')
            document.querySelector('#all_tweets_list').innerHTML = messages

            function label(tweet) {

                let time = new Date(tweet[3])
                // console.log(time.toDateString())
                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                  return `<button data-id="${tweet[0]}">${tweet[1]} ${tweet[2]}<div>${date}</div></button><br>`
            }




        }))
})


// working sort of 
document.querySelector('#btn').addEventListener('click',()=>{



fetch('/user_profile/5', {
    method: 'POST'
    }).then(response => response.json()).then(result => {
        // Print result
        console.log(result);
    })    

})

document.querySelector('form').onsubmit = function() {

    const body = document.querySelector('#compose-body').value;
    const likes = document.querySelector('#likes').value;

    fetch('/tweets', {
        method: 'POST',
        body: JSON.stringify({
            body: body,
            likes: likes
        })
      }).then(response => response.json()).then(result => {
          // Print result
          console.log(result);
          all_tweets()
      })
      return false;
}




document.querySelector('#following').addEventListener('click',()=>{
    following_tweets(fetch(`/tweets/following`).then(response => response.json()).then(tweets => {
        // Print email
        // console.log(tweets)
        console.log(tweets[0])

        var messages = tweets.map(label).join(' ')
        document.querySelector('#following_tweets_list').innerHTML = messages

        function label(tweet) {

            let time = new Date(tweet[3])
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
              return `<button data-id="${tweet[0]}">${tweet[1]} ${tweet[2]}<div>${date}</div></button><br>`
        }





    })
)})


all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
    // Print email
    // console.log(tweets)
    const el = document.querySelector('#all_posts')
    // console.log(el.dataset.post)

    all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
            // Print email
            // console.log(tweets)
            console.log(tweets[0])

            var messages = tweets.map(label).join(' ')
            document.querySelector('#all_tweets_list').innerHTML = messages

            function label(tweet) {

                let time = new Date(tweet[3])
                // console.log(time.toDateString())
                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                  return `<button data-id="${tweet[0]}">${tweet[1]} ${tweet[2]}<div>${date}</div></button><br>`
            }




        }))





}))
})


function compose_tweet() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_posts_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    // clear tweeting space
    document.querySelector('#compose-body').value = '';
    document.querySelector('#likes').value = '';


}

function all_tweets() {
    // Show compose view and hide other views
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'block';
    document.querySelector('#following_tweets_view').style.display = 'none';

        // clear tweeting space
        document.querySelector('#compose-body').value = '';
        document.querySelector('#likes').value = '';
}

function following_tweets() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'block';

        // clear tweeting space
        document.querySelector('#compose-body').value = '';
        document.querySelector('#likes').value = '';

}

function user_profile() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'block';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';

}