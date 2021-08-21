// console.log(firebase)


firebase.database().ref('todos').on('child_added',function(data){

var main = document.getElementById('main');

var list = document.createElement('div');

var text = document.createElement('li');

text.setAttribute("class","list-group-item")

list.setAttribute('class',"card");

var textVal = document.createTextNode(data.val().value);

text.appendChild(textVal);


///////////////.......BUTTONS.......////////////////////////////


// -------------------------create DEL button-------------------------------------------


    var btn = document.createElement("button")

    var btnText = document.createTextNode("Delete")

    btn.setAttribute('id',data.val().key)

    btn.setAttribute("onclick","todoDel(this)")

    btn.setAttribute("class","btn btn-outline-dark")

    btn.appendChild(btnText)

    text.appendChild(btn);
// -------------------------create edit button-------------------------------------------
    var editBtn = document.createElement('button')
    var editText = document.createTextNode("Edit")
    
    editBtn.appendChild(editText)
    
    editBtn.setAttribute('id',data.val().key)
    
    editBtn.setAttribute("onclick","todoEdit(this)")
    
    
    editBtn.setAttribute("class","btn btn-outline-info")
    text.appendChild(editBtn);

    //..........................//////////////.../////////////........//

    list.appendChild(text); //list of To-Do

    main.appendChild(list); //main is the parent of all these elemets which is located in html file (ul)

})

 

function add() {
    var input = document.getElementById('inpValue');
    if(input.value==""){
        alert('Please enter Something') 
    }//if value is empty then stop user from adding it
    
    
    else{ //if value is not empty then do this
    }     
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value: input.value,
        key: key
    }
    database.child(key).set(todo)






}

function delAll() {
    var del = document.getElementById('main')
    firebase.database().ref('todos').remove()
    del.innerHTML = ""
}

function todoDel(btn) {
firebase.database().ref('todos').child(btn.id).remove()
    var btn = event.target.parentNode
    btn.parentNode.remove()

}

function todoEdit(e) {
    var val = prompt("Enter Updated Value", e.parentNode.firstChild.nodeValue)
    
    var editTodo = {
        value : val,
        key : e.id
    }
   
    firebase.database().ref('todos').child(e.id).set(editTodo)
 e.parentNode.firstChild.nodeValue = val;
}