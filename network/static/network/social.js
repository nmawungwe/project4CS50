document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#btn').addEventListener('click',()=>{
    fetch(`/posts/2`).then(response => response.json()).then(post => {
        // Print email
        console.log(post)
        console.log('eita')
    })
})

document.querySelector('#post').addEventListener('click',()=>{

    fetch('/posts', {
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


})