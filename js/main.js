const Main = {
    init: function() {
        this.cacheSelectors();
        this.bindEvents();
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
            button.addEventListener('click', self.Events.checkButton_click);
        });

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);

        this.$deleteButtons.forEach(function(button) {
            button.onclick = self.Events.deleteButton_click;
        })
    },

    Events: {
        checkButton_click: function(element) {
            const check = element.target;
            const isDone = check.classList.contains('done');

            if(!isDone)
            {
                return check.classList.add('done');
            }

            check.classList.remove('done');
        },

        inputTask_keypress: function(event) {
            const key = event.key;
            const value = event.target.value;

            if(key === 'Enter' && value !== '')
            {
                this.$toDoList.innerHTML += `
                    <li class="task">
                        <div class="check"></div>
                        <span>${value}</span>
                        <button class="btn-delete"></button>
                    </li>
                `;

                event.target.value = '';

                this.cacheSelectors();
                this.bindEvents();
            }
        },

        deleteButton_click: function(element) {
            const li = element.target.parentElement;

            li.classList.add('removed');

            setTimeout(function() {
                li.classList.add('hidden');
            }, 300)
        }
    }
}

Main.init();