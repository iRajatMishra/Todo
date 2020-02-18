	var strikethrough = [];    
	var enqueue = function() {
        var todo = document.getElementById("todo").value;
		if(todo.trim().length===0)
			return false;
        var todos = get();
	if(todos.indexOf(todo)>=0)
		return false;
	else{
        	todos.push(todo);
        	localStorage.setItem("todos", JSON.stringify(todos));
        	display();
	    }
	document.getElementById("todo").value = "";
        return false;
    };

    var get = function() {
        var todos = new Array;
        var todosStr = localStorage.getItem("todos");
        if (todosStr !== null) {
            todos = JSON.parse(todosStr); 
        }
        return todos;
    };
      
    var dequeue = function() {
        var id = this.getAttribute("id");
        var todos = get();
		if(strikethrough.indexOf(id)>=0)
			return false;
		strikethrough.push(id);
		todos[id] = todos[id].strike();
        localStorage.setItem("todos", JSON.stringify(todos));
        display();
        return false;
    };
     
    var display = function() {
        var todos = get();   
        var html = '<table style="width:100%">';
        for(var i=0; i<todos.length; i++) {
            html += '<tr><td>' + todos[i] + '<button class="remove" id="' + i  + '">L</button></tr>';
        };
        html += '</table>';
        document.getElementById("todos").innerHTML = html;
        var buttons = document.getElementsByClassName("remove");
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", dequeue);
        };
    };
    
	var forEnter = document.getElementById("todo");
	forEnter.addEventListener("keyup", function(event){
		if(event.keyCode == 13)
			enqueue();
	});

	var clearCompleted = function(){
		var todos = get();
		strikethrough.sort(function(a, b){return a-b});
		for(i=0; i<strikethrough.length; i++){
			todos.splice(strikethrough[i]-i, 1);
		}
		strikethrough = [];
		localStorage.setItem("todos", JSON.stringify(todos));
		display();
	};

	var clearAll = function(){
		var todos = [];
		localStorage.setItem("todos", JSON.stringify(todos));
		strikethrough = [];
		display();
	};

	document.getElementById("clearAll").addEventListener("click", clearAll);
	document.getElementById("clearCompleted").addEventListener("click", clearCompleted);
    document.getElementById("add").addEventListener("click", enqueue);
    display();
