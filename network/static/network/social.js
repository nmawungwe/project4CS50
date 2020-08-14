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

        // console.log(user_prof.tweets)  

        var messages = user_prof.tweets.map(label).join(' ')
        document.querySelector('#user_profile_tweets').innerHTML = messages

        function label(tweet) {

                let time = new Date(tweet.time)
                // console.log(time.toDateString())
                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                  return `<button class="btn btn-light bd btn-block" data-id="${tweet.id}"><div class="tweet_body">${tweet.body}</div><div>${date}</div><a href="#" class="edit" data-tweet="${tweet.id}">Edit</a></button><br>`
            }
document.querySelectorAll('.edit').forEach(button=>{
    button.onclick = function() {

        tweet_id = this.dataset.tweet
        fetch(`/tweet/${tweet_id}`).then(response => response.json()).then(tweet => {
            console.log(tweet) 
        document.querySelector('.tweet_body').innerHTML = `<form id="edit-form">
        <textarea class="form-control" id="tweet_edit">${tweet.body}</textarea>
        <input type="submit" class="btn btn-primary edit_btn" data-tweet=${tweet.id} data-user=${tweet.user_id} value="Post"/>
        </form>`
document.querySelector('.edit').innerHTML ='' 
document.querySelector('.edit_btn').addEventListener('click', ()=>{
    let edit = document.querySelector('#tweet_edit').value;
    let el = document.querySelector('.edit_btn')
    tweet_id=el.dataset.tweet  
    user_id=el.dataset.user  
            // console.log("So!")
            fetch(`/tweet/${tweet_id}`, {
                method: 'PUT',
                body: JSON.stringify(edit)
                }).then(response => response.json()).then(response => {
                    // console.log(response)
                })
                user_profile(fetch(`/user_profile/${user_id}`).then(response => response.json()).then(user_prof => {
                    // Print email
                    // console.log(user_prof)
                    // console.log(user_prof.id)
                    const  followers = user_prof.followers.length
                    const  following = user_prof.following.length
            
                    document.querySelector('#box-heading').innerHTML = `<b>User profile: </b>${user_prof.username}`
                    document.querySelector('#followers').innerHTML = `<b>Followers: </b>${followers}`
                    document.querySelector('#followings').innerHTML = `<b>Following: </b>${following}`
            
                    // console.log(user_prof.tweets)  
            
                    var messages = user_prof.tweets.map(label).join(' ')
                    document.querySelector('#user_profile_tweets').innerHTML = messages
            
                    function label(tweet) {
            
                            let time = new Date(tweet.timestamp)
                            // console.log(time.toDateString())
                            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                              return `<button class="btn btn-light bd btn-block" data-id="${tweet.id}"><div class="tweet_body">${tweet.body}</div><div>${date}</div><a href="#" class="edit" data-tweet="${tweet.id}">Edit</a></button><br>`
                        }  
                              
                    }))            
        })
        })   
    }
    // console.log("So!")
})
}))
})

document.querySelector('#all_posts').addEventListener('click', ()=>{

// let el = document.querySelector('#all_posts')
// console.log(el.dataset.post)

all_tweets(fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
        // Print email
        // console.log(tweets)
        // console.log(tweets[3])

        var messages = tweets.map(label).join(' ')
        document.querySelector('#all_tweets_list').innerHTML = messages

        function label(tweet) {

            let time = new Date(tweet.time)
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                return `<button class="tweet btn btn-light bd btn-block" data-id="${tweet.user_id}"><a><b>${tweet.user_username}</b></a><br>${tweet.body}<br><div>${date}<br><form class="like_form">
                <a href="#" type="submit" class="like" data-id="${tweet.id}" data-likes="${tweet.likes}"/><span class="glyphicon glyphicon-heart"></span></a>${tweet.likes}</form></div></button><br>`

                
        }


        document.querySelectorAll('.like').forEach(button=>{
            button.onclick = function() {

                tweet_id = this.dataset.id
                likes = this.dataset.likes
    
                likes = likes++
                console.log(tweet_id)
                fetch(`/tweet/${tweet_id}`, 
                {
                    method: 'POST',
                    body: likes
                    }).then(response => response.json()).then(result => {
                        // Print result
                        console.log(result);
                        all_tweets((fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
                            // Print email
                            // console.log(tweets)
                            console.log(tweets[3])
                    
                            var messages = tweets.map(label).join(' ')
                            document.querySelector('#all_tweets_list').innerHTML = messages
                    
                            function label(tweet) {
                    
                                let time = new Date(tweet.time)
                                // console.log(time.toDateString())
                                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                                    return `<button class="tweet btn btn-light bd btn-block" data-id="${tweet.user_id}"><a><b>${tweet.user_username}</b></a><br>${tweet.body}<br><div>${date}<br><form class="like_form">
                                    <input type="submit" class="btn btn-primary like" value="like" data-id="${tweet.id}" data-likes="${tweet.likes}"/>${tweet.likes}</form></div></button><br>`
                            }}))
    
    
                        )
                    })    
                    return false
            }})






 


document.querySelectorAll('.tweet').forEach(button=>{
    button.onclick = function() {
        
    
    poster_id = this.dataset.id
    // console.log(poster_id)


    poster_profile(fetch(`/user_profile/${poster_id}`).then(response => response.json()).then(user_prof => {
        // Print email
        console.log(user_prof.tweets)
        // console.log(user_prof.id)
        const  followers = user_prof.followers.length
        const  following = user_prof.following.length

        document.querySelector('#poster-box-heading').innerHTML = `<b>User profile: </b>${user_prof.username}`
        document.querySelector('#poster-followers').innerHTML = `<b>Followers: </b>${followers}`
        document.querySelector('#poster-followings').innerHTML = `<b>Following: </b>${following}`
        document.querySelector('#poster-following-btn').innerHTML = `<button class="following btn btn-primary btn-sm" data-id=${user_prof.id}>Follow</button><br>`
        document.querySelector('#poster-unfollowing-btn').innerHTML = `<button class="unfollowing btn btn-primary btn-sm" data-id=${user_prof.id}>Unfollow</button>`



        var messages = user_prof.tweets.map(label).join(' ')
        document.querySelector('#poster_profile_tweets').innerHTML = messages

        function label(tweet) {

            let time = new Date(tweet.time)
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
            return `<button class="tweet btn btn-light bd btn-block"><a><b>${user_prof.username}</b></a><br>${tweet.body}<br><div>${date}<br></div></button><br>`
        }
    }))
    }})

document.querySelector('#poster-following-btn').addEventListener('click', ()=>{
    
    // console.log("Ehe wadii??")
    let following = document.querySelector('.following')
    following_id = following.dataset.id
    // console.log(following_id)


    fetch(`/user_profile/${following_id}`, {
    method: 'POST'
    }).then(response => response.json()).then(result => {
        // Print result
        console.log(result);
    }) 
    // all_tweets()
})

document.querySelector('#poster-unfollowing-btn').addEventListener('click', ()=>{
    
    // console.log("Ehe wadii??")
    let unfollowing = document.querySelector('.unfollowing')
    unfollowing_id = unfollowing.dataset.id
    console.log(unfollowing_id)


    fetch(`/user_profile/${unfollowing_id}`, {
    method: 'DELETE'
    }).then(response => response.json()).then(result => {
        // Print result
        console.log(result);
    }) 
    // all_tweets()
})
}))
})


// working sort of 
// document.querySelector('#liking').addEventListener('click',()=>{



// fetch('/tweet/10', {
//     method: 'POST',
//     body: 2
//     }).then(response => response.json()).then(result => {
//         // Print result
//         console.log(result);
//         all_tweets()
//     })    
//     return false;
// })

document.querySelector('form').onsubmit = function() {

    const body = document.querySelector('#compose-body').value;


    fetch('/tweets', {
        method: 'POST',
        body: JSON.stringify({
            body: body,
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
        // console.log(tweets[0])

        var messages = tweets.map(label).join(' ')
        document.querySelector('#following_tweets_list').innerHTML = messages
        function label(tweet) {

            let time = new Date(tweet.time)
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
            return `<button class="tweet btn btn-light bd btn-block" data-id="${tweet.id}"><a><b>${tweet.user_username}</b></a><br>${tweet.body}<br><div>${date}<br></div></button><br>`
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
            // console.log(tweets[0])

            var messages = tweets.map(label).join(' ')
            document.querySelector('#all_tweets_list').innerHTML = messages

            function label(tweet) {

                let time = new Date(tweet.time)
                // console.log(time.toDateString())
                let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
                return `<button class="tweet btn btn-light bd btn-block" data-id="${tweet.user_id}"><a><b>${tweet.user_username}</b></a><br>${tweet.body}<br><div>${date}<br></div></button><br>`
            }

document.querySelectorAll('.tweet').forEach(button=>{
    button.onclick = function() {
        
    
    poster_id = this.dataset.id
    // console.log(poster_id)


    poster_profile(fetch(`/user_profile/${poster_id}`).then(response => response.json()).then(user_prof => {
        // Print email
        // console.log(user_prof)
        // console.log(user_prof.id)
        const  followers = user_prof.followers.length
        const  following = user_prof.following.length

        document.querySelector('#poster-box-heading').innerHTML = `<b>User profile: </b>${user_prof.username}`
        document.querySelector('#poster-followers').innerHTML = `<b>Followers: </b>${followers}`
        document.querySelector('#poster-followings').innerHTML = `<b>Following: </b>${following}`
        document.querySelector('#poster-following-btn').innerHTML = `<button class="following btn btn-primary btn-sm" data-id=${user_prof.id}>Follow</button><br>`
        document.querySelector('#poster-unfollowing-btn').innerHTML = `<button class="unfollowing btn btn-primary btn-sm" data-id=${user_prof.id}>Unfollow</button>`


        var messages = user_prof.tweets.map(label).join(' ')
        document.querySelector('#poster_profile_tweets').innerHTML = messages

        function label(tweet) {

            let time = new Date(tweet.time)
            // console.log(time.toDateString())
            let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
            return `<button class="tweet btn btn-light bd btn-block"><a><b>${user_prof.username}</b></a><br>${tweet.body}<br><div>${date}<br></div></button><br>`
        }
    }))
    }})

document.querySelector('#poster-following-btn').addEventListener('click', ()=>{

    // console.log("Ehe wadii??")
    let following = document.querySelector('.following')
    following_id = following.dataset.id
    console.log(following_id)


    fetch(`/user_profile/${following_id}`, {
    method: 'POST'
    }).then(response => response.json()).then(result => {
        // Print result
        console.log(result);
    }) 
    // all_tweets()
})

document.querySelector('#poster-unfollowing-btn').addEventListener('click', ()=>{
    
    // console.log("Ehe wadii??")
    let unfollowing = document.querySelector('.unfollowing')
    unfollowing_id = unfollowing.dataset.id
    console.log(unfollowing_id)


    fetch(`/user_profile/${unfollowing_id}`, {
    method: 'DELETE'
    }).then(response => response.json()).then(result => {
        // Print result
        console.log(result);
    }) 
    // all_tweets()
})
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



}

function all_tweets() {
    // Show compose view and hide other views
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'block';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#poster_profile_view').style.display = 'none';

        // clear tweeting space
        document.querySelector('#compose-body').value = '';

}

function following_tweets() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#poster_profile_view').style.display = 'none'

        // clear tweeting space
        document.querySelector('#compose-body').value = '';


}

function user_profile() {
    // Show compose view and hide other views

    document.querySelector('#user_profile_view').style.display = 'block';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#poster_profile_view').style.display = 'none'

}

function poster_profile() {
    // Show compose view and hide other views
    document.querySelector('#user_profile_view').style.display = 'none';
    document.querySelector('#all_tweets_view').style.display = 'none';
    document.querySelector('#following_tweets_view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#poster_profile_view').style.display = 'block'

}