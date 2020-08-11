document.addEventListener('DOMContentLoaded', function() {


    // console.log('Wadii')

    all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
        // Print email
        console.log(tweets)
        // console.log(tweets[3])

        var messages = tweets.map(label).join(' ')
        document.querySelector('#all_tweets_list').innerHTML = messages

        function label(tweet) {

            let time = new Date(tweet.time)
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                return `<button class="tweet btn btn-light bd btn-block"><a><b>${tweet.user_username}</b></a><br>${tweet.body}<br><div>${date}<br></div></button><br>`
        }}))

})


function all_tweets() {
 
    // Show compose view and hide other views
    document.querySelector('#all_tweets_view').style.display = 'block';
}