const stringToHTML= (str)=>{
    const parser=new DOMParser()
    const doc=parser.parseFromString(str, 'text/html')
    return doc.body.firstChild
}


const renderItem= (item) => {
    const elemento=stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)

    elemento.addEventListener('click',()=>{
        const mealsList= document.getElementById('meals-list')
        Array.from(mealsList.children).forEach(identity=>identity.classList.remove('selected'))
        elemento.classList.add('selected')
        const mealsIdInput= document.getElementById('meals-id')
        mealsIdInput.value=item._id
    })

    return elemento
}

window.onload=()=> {
    const orderForm=document.getElementById('order')
    orderForm.onsubmit=(event)=>{
        event.preventDefault()
        const mealId=document.getElementById('meals-id')
        const mealIdValue=mealId.value
        if(!mealIdValue){
            alert('debe seleccionar un plato')
            return
        }
        const order={
            meal_id:mealIdValue,
            use_id: 'usuario X',
        }
        fetch('http://localhost:3000/api/orders',{
            method:'post',
            headers: {
                'Cointent-Type':'application/json',
            },
            body: JSON.stringify(order)
        }).then(x=>console.log(x))
    }


    fetch('http://localhost:3000/api/meals')
    /*,{
        method:'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 
            'Content.Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({user: 'lala',password: 'yomerengues'})
    })*/
    .then(response=>response.json())
    .then(data=>{
        const mealsList= document.getElementById('meals-list')
        const submit= document.getElementById('submit')
        const listItems=data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element=>mealsList.appendChild(element))
        submit.removeAttribute('disabled')
    })
}