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
}})



function all_tweets() {
    // Show compose view and hide other views
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#all_tweets_view').style.display = 'block';

      // clear tweeting space
    document.querySelector('#compose-body').value = '';

}