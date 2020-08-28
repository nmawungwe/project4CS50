document.addEventListener('DOMContentLoaded', function() {

document.querySelector('form').onsubmit = function() {

    const body = document.querySelector('#compose-body').value;


    fetch('/tweets', {
        method: 'POST',
        body: JSON.stringify({
            body: body,
        })
        }).then(response => response.json()).then(result => {
            // Print result
            console.log(result)
            all_tweets(location.reload())
        })
        return false;
}

document.querySelectorAll('.like').forEach(button=>{
    button.onclick = function() {
        tweet_id = this.dataset.id
        const user_id = JSON.parse(document.getElementById('user_id').textContent);
        // console.log(tweet_id)

        fetch(`/tweet/${tweet_id}`).then(response => response.json()).then(tweet => {
            // console.log(tweet)
            if (tweet.user_likes_ids.includes(user_id)) {
                console.log("you shouldn't like")
                fetch(`/like/${tweet_id}`, 
                {
                    method: 'DELETE',
                    }).then(response => response.json()).then(result => {
                        // Print result
                        console.log(result);
                        all_tweets(location.reload())

                    })
            } else {
                fetch(`/like/${tweet_id}`, 
                    {
                        method: 'POST'
                        }).then(response => response.json()).then(result => {
                            // Print result
                            console.log(result)
                            all_tweets(location.reload())
                        })
                        return false;  
            }
        })
    }})
})



function all_tweets() {
    // Show compose view and hide other views
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#all_tweets_view').style.display = 'block';

      // clear tweeting space
    document.querySelector('#compose-body').value = '';

}