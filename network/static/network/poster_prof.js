document.addEventListener('DOMContentLoaded', function() {

    const user_id = JSON.parse(document.getElementById('user_id').textContent);
    const poster_id = JSON.parse(document.getElementById('poster_id').textContent);

    fetch(`/following/${poster_id}`).then(response => response.json()).then(user_prof => {
        // console.log(user_prof)

    following_list= user_prof.followers  
    console.log(following_list)  

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



    if (fol === "unfollow") {
        fetch(`/following/${poster_id}`, {
            method: 'DELETE'
            }).then(response => response.json()).then(result => {
                // Print result
                document.querySelector('.following').innerHTML='follow'
                console.log(result);       
        })
    } else {
        fetch(`/following/${poster_id}`, {
            method: 'POST'
            }).then(response => response.json()).then(result => {
                // Print result
                console.log(result);
                document.querySelector('.following').innerHTML='unfollow'
            }) 
    }
    })
    })

