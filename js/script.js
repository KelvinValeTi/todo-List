//seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


//select filtrar
const filterSelect = document.getElementById("filter-select");
//search toobar
let input = document.getElementById('search-input');
const eraseButton = document.getElementById('erase-button');



let oldInputValue;


//funções
const saveTodo=(text)=>{

    //criando uma div com h3 e botões dinamicamente
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML='<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML='<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = ""; //limpa campo input
    todoInput.focus(); //foca o campo input
}


const toggleForms = ()=>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo=(text)=>{

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }

    });
}

function pesquisaPalavra(){
    input = document.getElementById('search-input').value
    input = input.toLowerCase();

    let todo = document.querySelectorAll(".todo");
      
    for (i = 0; i < todo.length; i++) { 
        if (!todo[i].innerHTML.toLowerCase().includes(input)) {
            todo[i].classList.add("hide");
        }else {
            //exibir apenas item(s) encontrados
            todo[i].classList.remove("hide");              
        }
    }
}

//eventos
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault(); //evita que a pagina seja recarregada, pois previne o atributo default do button -> submit

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e)=>{

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }


    //confirmar se está finalizada a tarefa
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    //editar
    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }


    //remover
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

});

cancelEditBtn.addEventListener("click", (e)=>{
    
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if(editInputValue){
        //atualizar
        updateTodo(editInputValue);
    }

    toggleForms();

});

//campo select - filtrar
filterSelect.addEventListener("click", ()=>{

    let todo = document.querySelectorAll(".todo");

    if(filterSelect.value == "all"){
      
      if(todo.length>0){
        for(let i=0; i<todo.length;i++){
            todo[i].classList.remove("hide");
        }
      }
      
    }else if(filterSelect.value == "done"){
        
        if(todo.length>0){
            for(let i=0; i<todo.length;i++){
                if(todo[i].classList.contains("done")){
                    todo[i].classList.remove("hide");
                }else{
                    todo[i].classList.add("hide");
                }
            }
        }
    }else if(filterSelect.value == "todo"){
        
        if(todo.length>0){
            for(let i=0; i<todo.length;i++){
                if(!todo[i].classList.contains("done")){
                    todo[i].classList.remove("hide");
                }else{
                    todo[i].classList.add("hide");
                }
            }
        }
    }
});


//pesquisar toolbar
input.addEventListener("keyup",()=>{
    pesquisaPalavra();
});

//botão de apagar input - barra de pesquisa
eraseButton.addEventListener("click", ()=>{
    document.getElementById('search-input').value = "";
    pesquisaPalavra();
});

