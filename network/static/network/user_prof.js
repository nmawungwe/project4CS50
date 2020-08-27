document.addEventListener('DOMContentLoaded', function() {

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
        document.querySelector('.edit').innerHTML =''
        document.querySelector('.edit_btn').addEventListener('click', ()=>{

        edited_tweet = document.querySelector('#tweet_edit').value;
        console.log(edited_tweet)
        edit_info = document.querySelector('.edit_btn')
        tweet_id=edit_info.dataset.tweet  
        user_id=edit_info.dataset.user

        fetch(`/tweet/${tweet_id}`, {
            method: 'PUT',
            body: JSON.stringify(edited_tweet)
            }).then(response => response.json()).then(response => {
                console.log(response)
                location.reload()    
            })        
        })
        })
    }})
})


function user_prof_view() {
    // Show compose view and hide other views
    document.querySelector('#poster_profile_view').style.display = 'block';
}