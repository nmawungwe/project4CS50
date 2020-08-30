document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll('.edit').forEach(button=>{
    button.onclick = function() {

        tweet_id = this.dataset.tweet



        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;




        fetch(`/tweet/${tweet_id}`).then(response => response.json()).then(tweet => {
            console.log(tweet)

        document.querySelector('.edit-form').innerHTML = `<textarea class="form-control" id="tweet_edit">${tweet.body}</textarea>
        <input type="submit" class="btn btn-primary edit_btn" data-tweet=${tweet.id} data-user=${tweet.user_id} value="Post"/>`
        document.querySelector('.edit').innerHTML =''
        document.querySelector('.edit').innerHTML =''
        document.querySelector('.tweet_body').innerHTML =''
        document.querySelector('.edit_btn').addEventListener('click', ()=>{

        edited_tweet = document.querySelector('#tweet_edit').value;
        console.log(edited_tweet)
        edit_info = document.querySelector('.edit_btn')
        tweet_id=edit_info.dataset.tweet  
        user_id=edit_info.dataset.user
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value

        let request = new Request(
        `/tweet/${tweet_id}`, 
        {headers: {'X-CSRFToken': csrftoken}})
        fetch(request, {
            method: 'PUT',
            body: JSON.stringify(edited_tweet)
            }).then(response => response.json()).then(result => {
                // Print result
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