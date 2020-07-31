document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#btn').addEventListener('click',()=>{
    fetch(`/tweets/2`).then(response => response.json()).then(tweet => {
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

document.querySelector('#all').addEventListener('click',()=>{
    fetch(`/tweets/all`).then(response => response.json()).then(tweets => {
        // Print email
        console.log(tweets)
    })
})


document.querySelector('#following').addEventListener('click',()=>{
    fetch(`/tweets/following`).then(response => response.json()).then(tweets => {
        // Print email
        console.log(tweets)
    })
})

document.querySelector('#user_profile').addEventListener('click',()=>{
    fetch(`/user_profile/3`).then(response => response.json()).then(user_prof => {
        // Print email
        console.log(user_prof)
    })
})



})