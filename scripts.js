document.addEventListener('DOMContentLoaded', function() {
    const listacompleta = document.querySelector('.list-task');
    const inputTarefa = document.querySelector('.input-task');
    const botaoAdicionar = document.querySelector('.btn-task');

    botaoAdicionar.addEventListener('click', function() {
        adicionarTarefa(inputTarefa.value);
    });

    function adicionarTarefa(texto, concluida = false) {
        if (texto.trim() !== '') {
            const novaTarefa = document.createElement('li');
            novaTarefa.classList.add('task');
            if (concluida) {
                novaTarefa.classList.add('concluida');
                novaTarefa.style.color = 'rgb(0, 255, 80)';
            }
            novaTarefa.innerHTML = `
                <img src="./img/checked.png" class="check-tarefa" alt="check-na-tarefa">
                <p>${texto}</p>
                <img src="./img/5028066.png" class="lixeira-tarefa" alt="lixeira-na-tarefa">
            `;
            listacompleta.appendChild(novaTarefa);
            inputTarefa.value = '';

            const checkTarefa = novaTarefa.querySelector('.check-tarefa');
            const lixeiraTarefa = novaTarefa.querySelector('.lixeira-tarefa');

            checkTarefa.addEventListener('click', function() {
                novaTarefa.classList.toggle('concluida');
                if (novaTarefa.classList.contains('concluida')) {
                    novaTarefa.style.color = 'rgb(0, 255, 80)';
                } else {
                    novaTarefa.style.color = 'black';
                }
                salvarTarefas();
            });

            lixeiraTarefa.addEventListener('click', function() {
                novaTarefa.remove();
                salvarTarefas();
            });

            salvarTarefas(); // Save all tasks when adding a new one
        } else {
            alert('Por favor, digite uma tarefa válida.');
        }
    }

    async function salvarTarefas() {
        let tarefas = [];
        document.querySelectorAll('.task').forEach(tarefa => {
            tarefas.push({
                texto: tarefa.querySelector('p').textContent,
                concluida: tarefa.classList.contains('concluida')
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    async function carregarTarefasSalvas() {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.forEach(tarefa => {
            adicionarTarefa(tarefa.texto, tarefa.concluida);
        });
    }

    // Load saved tasks when the page loads
    carregarTarefasSalvas();
});
