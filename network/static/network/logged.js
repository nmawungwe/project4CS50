document.addEventListener('DOMContentLoaded', function() {

document.querySelector('form').onsubmit = function() {

    const body = document.querySelector('#compose-body').value;
    let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    let request = new Request(
        '/tweets',
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'POST',
            body: JSON.stringify({
            body: body,
        })
          // Do not send CSRF token to another domain.
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
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        fetch(`/tweet/${tweet_id}`).then(response => response.json()).then(tweet => {
            if (tweet.user_likes_ids.includes(user_id)) {
                let request = new Request(
                 `/like/${tweet_id}`, 
                 {headers: {'X-CSRFToken': csrftoken}})
                 fetch(request, {
                    method: 'DELETE',
                    }).then(response => response.json()).then(result => {
                        // Print result
                        console.log(result);
                        all_tweets(location.reload())
                    })
            } else {
                let request = new Request(
                `/like/${tweet_id}`, 
                {headers: {'X-CSRFToken': csrftoken}}
                )
                fetch(request, {
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