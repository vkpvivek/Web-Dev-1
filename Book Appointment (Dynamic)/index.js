
//_____  ____  Task 2
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');


var ItemList=document.getElementById('userDetail');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '') {
      msg.innerHTML = 'Please enter all fields';

    } else {

        let myObj={
            name:nameInput.value,
            email:emailInput.value
        };
        
        axios.post("https://crudcrud.com/api/f20747262a5a4658bd5599c46434c94f/NEWDATA",myObj)
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            })
        //localStorage.setItem(myObj.email,JSON.stringify(myObj));
        showUser(myObj);
       
    }  

};

// function Display() {
//     for (var i = 0; i < localStorage.length; i++) {
//         // set iteration key name
//         var key = localStorage.key(i);
//         // use key name to retrieve the corresponding value
//         var value = localStorage.getItem(key);
      
//         var object=JSON.parse(value);
//         showUser(object);
//     }
// }

// Display();

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/f20747262a5a4658bd5599c46434c94f/NEWDATA")
        .then((response)=>{
            console.log(response);
            for( var i=0;i<response.data.length;i++){
                showUser(response.data[i])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})



function showUser(obj){
    const parElem=document.getElementById('userDetail');
    const childElem=document.createElement('li');
    childElem.className='item';

    childElem.textContent=obj.name +" "+obj.email;  //add text to Li

    //create Delete Button to add in li
    var deleteBtn = document.createElement('button');
    deleteBtn.className ='delete';
    deleteBtn.style='float:right';
    deleteBtn.appendChild(document.createTextNode('delete'));

    deleteBtn.onclick=()=>{
        localStorage.removeItem(obj.email);
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
        localStorage.removeItem(obj.email);
        parElem.removeChild(childElem);

        //add new details in input to edit
        document.getElementById("name").value = obj.name;
        document.getElementById("email").value = obj.email;
    }
    childElem.appendChild(editBtn);     //add edit button to child


    parElem.appendChild(childElem);

    console.log(parElem);
    console.log(ItemList.childElementCount);
}