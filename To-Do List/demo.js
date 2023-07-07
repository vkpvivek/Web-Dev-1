const myForm=document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const describeInput = document.querySelector('#describe');


myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();

    let myObj={
        amount:amountInput.value,
        describe:describeInput.value,
        isChecked:true,
    };
    
    axios.post("https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/ToDoList",myObj)
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })

    display(myObj);
}


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/ToDoList")
        .then((response)=>{
            console.log(response);
            for( var i=0;i<response.data.length;i++){

                if(response.data[i].isChecked==false){
                    display(response.data[i]);
                }else{
                    //CompltedDisplay(response.data[i]);
                }

            }
        })
        .catch((err)=>{
            console.log(err);
        })
    //console.log("reloaded")
})


function display(obj){
    const In_parElem=document.getElementById('incomplete-tasks');
    const In_childElem=document.createElement('li');
    In_childElem.className='list-group-item';

    In_childElem.textContent= obj.amount +" -- "+obj.describe;

    var checkb=document.createElement('input');
    checkb.type="checkbox";
    In_childElem.append(checkb);


    var deleteBtn = document.createElement('button');
    deleteBtn.className ='delete';
    deleteBtn.style='float:right';
    deleteBtn.appendChild(document.createTextNode('delete'));

    deleteBtn.onclick=()=>{

        axios.delete(`https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/ToDoList/${obj._id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj._id}`);
            })
            .catch(error => {
                console.error(error);
            });
            
        In_parElem.removeChild(In_childElem);
    }
    In_childElem.appendChild(deleteBtn);    //add delete button Li

    In_parElem.appendChild(In_childElem);
}


function CompltedDisplay(obj){
    const C_parElem=document.getElementById('complted-tasks');
    const C_childElem=document.createElement('li');
    C_childElem.className='list-group-item';

    C_childElem.textContent= obj.amount +" -- "+obj.describe;


    var deleteBtn = document.createElement('button');
    deleteBtn.className ='delete';
    deleteBtn.style='float:right';
    deleteBtn.appendChild(document.createTextNode('delete'));

    deleteBtn.onclick=()=>{

        axios.delete(`https://crudcrud.com/api/d3a002933b464a9c97c67083979e1e1f/ToDoList/${obj._id}`)
            .then(response => {
                console.log(`Deleted post with ID ${obj._id}`);
            })
            .catch(error => {
                console.error(error);
            });
            
        C_parElem.removeChild(C_childElem);
    }
    C_childElem.appendChild(deleteBtn);    //add delete button Li

    C_parElem.appendChild(C_childElem);
}




