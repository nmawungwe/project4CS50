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



    function poster_prof_view() {
        // Show compose view and hide other views
        document.querySelector('#poster_profile_view').style.display = 'block';
    }







