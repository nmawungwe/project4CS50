document.addEventListener('DOMContentLoaded', function() {

    const user_id = JSON.parse(document.getElementById('user_id').textContent);
    const poster_id = JSON.parse(document.getElementById('poster_id').textContent);


    fetch(`/following/${poster_id}`).then(response => response.json()).then(user_prof => {


    following_list= user_prof.followers  
    // console.log(following_list)  

    if (user_id===user_prof.id) {
        document.querySelector('#poster-following-btn').innerHTML = ``
    } else if (following_list.includes(user_id)) {
        document.querySelector('#poster-following-btn').innerHTML = `<button class="following btn btn-primary btn-sm" data-id=${user_prof.id}>unfollow</button><br>`
    } else{
        document.querySelector('#poster-following-btn').innerHTML = `<button class="following btn btn-primary btn-sm" data-id=${user_prof.id}>follow</button><br>` 
    }
    })

    document.querySelector('#poster-following-btn').addEventListener('click', ()=>{

    fol_class = document.querySelector('.following')
    fol = fol_class.innerHTML
    let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;


    if (fol === "unfollow") {
    let request = new Request(
        `/following/${poster_id}`, 
            {headers: {'X-CSRFToken': csrftoken}})
    fetch(request, {
        method: 'DELETE'
        }).then(response => response.json()).then(result => {
            // Print result
            document.querySelector('.following').innerHTML='follow'
            // console.log(result);       
        })
    } else {
        let request = new Request(
            `/following/${poster_id}`, 
                {headers: {'X-CSRFToken': csrftoken}})
        fetch(request, {
            method: 'POST'
            }).then(response => response.json()).then(result => {
                // Print result
                // console.log(result);
                document.querySelector('.following').innerHTML='unfollow'
            }) 
    }
    })

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
                        // console.log(result);
                        poster_prof_view(location.reload())
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
                            // console.log(result)
                            poster_prof_view(location.reload())
                        })
                        return false;  
            }
        })
    }})

})



    function poster_prof_view() {
        // Show compose view and hide other views
        document.querySelector('#poster_profile_view').style.display = 'block';
    }







