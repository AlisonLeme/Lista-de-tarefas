const Main = {

    tasks: [],

    init: function() {
        this.cacheSelectors();
        this.bindEvents();
        this.getStoraged();
        this.buildTasks();
    },

    // função para selecionar os elementos html e armazena-los em uma váriavel.
    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check');
        this.$inputTask = document.querySelector('.input-task');
        this.$toDoList = document.querySelector('.to-do-list');
        this.$deleteButtons = document.querySelectorAll('.btn-delete');
    },

    // função para adiconar eventos
    bindEvents: function() {
        const self = this;
        
        this.$checkButtons.forEach(function(button) {
            button.addEventListener('click', self.Events.checkButton_click.bind(self));
        });

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);

        this.$deleteButtons.forEach(function(button) {
            button.onclick = self.Events.deleteButton_click.bind(self);
        })
    },

    // função responsalvel por fazer o get das tarefas
    getStoraged: function() {
        const tasks = localStorage.getItem('tasks');

        if(tasks)
        {
            this.tasks = JSON.parse(tasks);
        }
        else
        {
            localStorage.setItem('tasks', JSON.stringify([]));
        }
    },

    //função para retornar o HTML montado com a tarefa do usuario
    getTaskHtml: function(task, done) {
        return `
            <li class="task">
                <div class="check" data-done="${done}"></div>
                <span>${task}</span>
                <button class="btn-delete" data-task="${task}"></button>
            </li>
        `;
    },

    // função para pegar as tarefas e montar na tela.
    buildTasks: function() {
        let html = '';
        this.tasks.forEach(task => {
            html += this.getTaskHtml(task.task, task.done);
        });

        this.$toDoList.innerHTML = html;

        this.cacheSelectors();
        this.bindEvents();
    },

    Events: {
        checkButton_click: function(element) {
            const done = element.target.parentElement
            const taskSpan = done.querySelector('span').innerHTML
            let isDone = element.target.getAttribute('data-done');

            if(isDone === 'false')
            {
                isDone = true
                this.tasks.forEach(task => {
                    if(task.task === taskSpan)
                    {
                        task.done = true;
                        element.target.setAttribute('data-done', 'true');
                    }
                });

                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
            else
            {
                isDone = false;
                this.tasks.forEach(task => {
                    if(task.task === taskSpan)
                    {
                        task.done = false;
                        element.target.setAttribute('data-done', 'false');
                    }
                });
    
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },

        inputTask_keypress: function(event) {
            const key = event.key;
            const value = event.target.value;

            if(key === 'Enter' && value !== '')
            {
                this.$toDoList.innerHTML += this.getTaskHtml(value, false);

                event.target.value = '';

                this.cacheSelectors();
                this.bindEvents();

                const savedTasks = localStorage.getItem('tasks');
                const savedTasksObj = JSON.parse(savedTasks);
                const obj = [
                    ...savedTasksObj, // spread operator = jogar todas as tarefas que já estão salvas
                    {task: value, done: false},
                ];

                this.tasks = obj;
                localStorage.setItem('tasks', JSON.stringify(obj));

            }
        },

        deleteButton_click: function(element) {
            const li = element.target.parentElement;
            const value = element.target.dataset['task'];

            const newTasksState = this.tasks.filter(task => task.task !== value);

            localStorage.setItem('tasks', JSON.stringify(newTasksState));
            this.tasks = newTasksState;

            li.classList.add('removed');

            setTimeout(function() {
                li.classList.add('hidden');
            }, 300)
        }
    }
}

Main.init();