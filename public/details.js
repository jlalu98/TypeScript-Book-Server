const delBtn=document.querySelector("#del-button");
delBtn.addEventListener('click',(e)=>{
    const endpoint= `/books/${delBtn.dataset.doc}`;
    console.log(endpoint);
    fetch(endpoint,{
        method:"DELETE",
    })
    .then((response)=>response.json())
    .then((data)=>window.location.href = data.redirect)
    .catch((err)=>console.log("MY ERROR:",err));
})