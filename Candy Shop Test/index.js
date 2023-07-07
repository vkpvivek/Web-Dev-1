
const myForm=document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const describeInput = document.querySelector('#describe');
const categoryInput=document.querySelector('#category');
//const msg = document.querySelector('.msg');


myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(amountInput==''||describeInput==''||categoryInput==''){
        //msg.innerHTML = 'Please enter all fields';
    }else{

        let myObj={
            amount:amountInput.value,
            describe:describeInput.value,
            category:categoryInput.value
        };
        
        axios.post("https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/NEWDATA",myObj)
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            })
        //console.log(myObj);
        // localStorage.setItem(myObj.describe,JSON.stringify(myObj));
        // console.log(localStorage.getItem(myObj));
        showUser(myObj);
    }
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/NEWDATA")
        .then((response)=>{
            console.log(response);
            for( var i=0;i<response.data.length;i++){
                showUser(response.data[i])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    //console.log("reloaded")
})



function showUser(obj){
    const parElem=document.getElementById('expanseDetail');
    const childElem=document.createElement('li');
    childElem.className='list-group-item';

    childElem.textContent="₹"+obj.amount +" -- "+obj.describe +" -- "+obj.category; 

    //create Delete Button to add in li
    var deleteBtn = document.createElement('button');
    deleteBtn.className ='delete';
    deleteBtn.style='float:right';
    deleteBtn.appendChild(document.createTextNode('delete'));

    deleteBtn.onclick=()=>{
        //localStorage.removeItem(obj.describe);

        axios.delete(`https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/NEWDATA/${obj._id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj._id}`);
            })
            .catch(error => {
                console.error(error);
            });
            
        parElem.removeChild(childElem);
    }
    childElem.appendChild(deleteBtn);    //add delete button Li

        
    //create Edit button to add in li
        
    var editBtn=document.createElement('button');
    editBtn.className='edit';
    editBtn.style='float:right';
    
    editBtn.appendChild(document.createTextNode('edit'));
    
    editBtn.onclick =()=>{
        //delete old details
        //localStorage.removeItem(obj.describe);

        axios.delete(`https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/NEWDATA/${obj._id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj._id}`);
            })
            .catch(error => {
                console.error(error);
            });
        parElem.removeChild(childElem);


        //add new details in input to edit
        document.getElementById("amount").value = obj.amount;
        document.getElementById("describe").value = obj.describe;
        document.getElementById("category").value = obj.category;
    }

    childElem.appendChild(editBtn);     //add edit button to child
    parElem.appendChild(childElem);
}

