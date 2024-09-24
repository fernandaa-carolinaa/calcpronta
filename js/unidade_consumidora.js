document.addEventListener("DOMContentLoaded", function () {
    fetchUnidadesConsumidoras();

    document.getElementById('unidadeFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveUnidadeConsumidora();
    });
});

function fetchUnidadesConsumidoras() {
    fetch('http://localhost:8000/unidades-consumidoras')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar unidades consumidoras: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('unidadesList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            
            // Verificar se a resposta tem o formato esperado
            if (Array.isArray(data.unidades_consumidoras)) {
                data.unidades_consumidoras.forEach(unidade => {
                    list.innerHTML += `
                        <li class="list-group-item m-2 p-2 border-bottom">
                            <div class="row d-flex justify-content-between">
                                <div class="col"> <strong>${unidade.nome}</strong> - Tipo ID: ${unidade.tipo_id}</div>
                                <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${unidade.id}, '${unidade.nome}', ${unidade.tipo_id})">Editar</button></div>
                                <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteUnidadeConsumidora(${unidade.id})">Deletar</button></div>
                            </div>
                        </li>`;
                });
            } else {
                list.innerHTML += '<li class="list-group-item">Nenhuma unidade consumidora encontrada</li>';
            }

            list.innerHTML += '</ul>';
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar unidades consumidoras. Verifique o console para mais detalhes.');
        });
}

function showAddForm() {
    document.getElementById('unidadeForm').classList.remove('d-none');
    document.getElementById('unidadeId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('tipoId').value = ''; // Corrigido para 'tipoId'
    document.getElementById('formTitle').innerText = 'Adicionar Unidade Consumidora';
}

function showEditForm(id, nome, tipo_id) {
    document.getElementById('unidadeForm').classList.remove('d-none');
    document.getElementById('unidadeId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tipoId').value = tipo_id; // Corrigido para 'tipoId'
    document.getElementById('formTitle').innerText = 'Editar Unidade Consumidora';
}

function saveUnidadeConsumidora() {
    const id = document.getElementById('unidadeId').value;
    const nome = document.getElementById('nome').value;
    const tipo_id = parseInt(document.getElementById('tipoId').value);

    if (!nome) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/unidades-consumidoras/${id}` : 'http://localhost:8000/unidades-consumidoras';

    const requestData = { nome: nome, tipo_id: tipo_id };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar unidade consumidora: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Unidade consumidora salva com sucesso!');
            document.getElementById('unidadeForm').classList.add('d-none');
            fetchUnidadesConsumidoras();
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao salvar unidade consumidora. Verifique o console para mais detalhes.');
        });
}

function deleteUnidadeConsumidora(id) {
    if (confirm('Tem certeza de que deseja excluir esta unidade consumidora?')) {
        fetch(`http://localhost:8000/unidades-consumidoras/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir unidade consumidora: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                alert('Unidade consumidora excluída com sucesso!');
                fetchUnidadesConsumidoras();
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao excluir unidade consumidora. Verifique o console para mais detalhes.');
            });
        }}
