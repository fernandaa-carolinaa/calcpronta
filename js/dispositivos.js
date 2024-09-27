document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dependenciaId = urlParams.get('dependenciaId');
    const unidadeConsumidoraId = urlParams.get('unidadeConsumidoraId');

    if (dependenciaId) {
        fetchDispositivos(dependenciaId);
        document.getElementById('dependenciaId').value = dependenciaId;
    }

    if (unidadeConsumidoraId) {
        document.getElementById('unidadeConsumidoraId').value = unidadeConsumidoraId;
    }

    fetchTipos();
    document.getElementById('dispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDispositivo();
    });
});

function fetchTipos() {
    fetch('http://localhost:8000/tipos-dispositivos')
        .then(response => response.json())
        .then(data => {
            const tipoSelect = document.getElementById('tipoId');
            tipoSelect.innerHTML = '<option value="">Selecione o Tipo</option>';
            data.tipos_dispositivos.forEach(tipo => {
                tipoSelect.innerHTML += `<option value="${tipo.id}">${tipo.nome}</option>`;
            });
        })
        .catch(error => console.error('Erro ao buscar os tipos:', error));
}

function fetchDispositivos(dependenciaId) {
    fetch(`http://localhost:8000/dispositivos/dependencias/${dependenciaId}`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('dispositivosList');
            list.innerHTML = '';
            data.dispositivos.forEach(dispositivo => {
                list.innerHTML += `
                    <tr>
                        <td>${dispositivo.id}</td>
                        <td>${dispositivo.nome}</td>
                        <td>${dispositivo.consumo}</td>
                        <td>${dispositivo.uso_diario}</td>
                        <td>
                            <button class="btn btn-warning" onclick="showEditForm(${dispositivo.id}, '${dispositivo.nome}', ${dispositivo.tipo_id}, ${dispositivo.consumo}, ${dispositivo.uso_diario})">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-danger" onclick="deleteDispositivo(${dispositivo.id})">
                                <i class="bi bi-trash"></i> Excluir
                            </button>
                        </td>
                    </tr>`;
            });
        })
        .catch(error => console.error('Erro ao buscar dispositivos:', error));
}

function showAddForm() {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('formTitle').innerText = 'Adicionar Dispositivo';
    document.getElementById('dispositivoFormElement').reset();
}

function showEditForm(id, nome, tipoId, consumo, usoDiario) {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('formTitle').innerText = 'Editar Dispositivo';
    document.getElementById('dispositivoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tipoId').value = tipoId;
    document.getElementById('consumo').value = consumo;
    document.getElementById('usoDiario').value = usoDiario;
}

function saveDispositivo() {
    const id = document.getElementById('dispositivoId').value;
    const nome = document.getElementById('nome').value.trim();
    const tipoId = document.getElementById('tipoId').value;
    const consumo = document.getElementById('consumo').value;
    const usoDiario = document.getElementById('usoDiario').value;
    const dependenciaId = document.getElementById('dependenciaId').value;
    const unidadeConsumidoraId = document.getElementById('unidadeConsumidoraId').value;

    const dispositivo = {
        nome,
        consumo,
        uso_diario: usoDiario,
        tipo_id: tipoId,
        dependencia_id: dependenciaId,
        unidade_consumidora_id: unidadeConsumidoraId
    };

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/dispositivos/${id}` : 'http://localhost:8000/dispositivos';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dispositivo)
    })
        .then(response => response.json())
        .then(() => {
            fetchDispositivos(dependenciaId);
            document.getElementById('dispositivoForm').classList.add('d-none');
        })
        .catch(error => console.error('Erro ao salvar dispositivo:', error));
}

function deleteDispositivo(id) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este dispositivo?');
    if (confirmDelete) {
        fetch(`http://localhost:8000/dispositivos/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetchDispositivos(document.getElementById('dependenciaId').value))
            .catch(error => console.error('Erro ao excluir dispositivo:', error));
    }
}