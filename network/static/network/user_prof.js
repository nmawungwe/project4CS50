document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll('.edit').forEach(button=>{
    button.onclick = function() {

        tweet_id = this.dataset.tweet

        fetch(`/tweet/${tweet_id}`).then(response => response.json()).then(tweet => {
            console.log(tweet)

        document.querySelector('.edit-form').innerHTML = `<textarea class="form-control" id="tweet_edit">${tweet.body}</textarea>
        <input type="submit" class="btn btn-primary edit_btn" data-tweet=${tweet.id} data-user=${tweet.user_id} value="Post"/>`
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





like = document.querySelectorAll(".liked");
like.forEach((element) => {
    like_handeler(element);
    });



function like_handeler(element) {
    element.addEventListener("click", () => {
        id = element.getAttribute("data-id");
        is_liked = element.getAttribute("data-is_liked");
        icon = document.querySelector(`#tweet-like-${id}`);
        count = document.querySelector(`#tweet-count-${id}`);
        let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
        form = new FormData();
        form.append("is_liked", is_liked);
        
        
        
        let request = new Request(`/like/${id}`,
        {headers: {'X-CSRFToken': csrftoken}}
    );fetch(request,{
        method: "POST",
        body: form,
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 201) {
            if (res.is_liked === "yes") {
                icon.src = "https://img.icons8.com/plasticine/100/000000/like.png";
                element.setAttribute("data-is_liked", "yes");
            } else {
                icon.src =
                "https://img.icons8.com/carbon-copy/100/000000/like--v2.png";
                element.setAttribute("data-is_liked", "no");
            }
            count.textContent = res.like_count;
            }
        })
        .catch(function (res) {
            alert("Network Error. Please Check your connection.");
        });
    });
    }


})


function user_prof_view() {
    // Show compose view and hide other views
    document.querySelector('#poster_profile_view').style.display = 'block';
}