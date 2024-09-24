from fastapi import APIRouter
from models.dependencia import DependenciaDB, UnidadeConsumidoraDB
from schemas.dependencia import (
    DependenciaCreate,
    DependenciaReadList,
    DependenciaReadOne,
    DependenciaUpdate,
)

router = APIRouter(prefix='/dependencias', tags=['DEPENDÊNCIAS'])

@router.post(path='', response_model=DependenciaReadOne)
def criar_dependencia(novo_dependencia: DependenciaCreate):
    dependencia = DependenciaDB.create(**novo_dependencia.dict())
    return dependencia

@router.get(
    path='/unidade-consumidora/{unidade_consumidora_id}',
    response_model=DependenciaReadList,
)
def listar_dependencia_da_unidade_de_consumo(unidade_consumidora_id: int):
    dependencias = DependenciaDB.select().where(
        DependenciaDB.unidade_consumidora_id == unidade_consumidora_id
    )
    dependencias_list = [dependencia for dependencia in dependencias]
    return {'dependencias': dependencias_list}

@router.get(path='/{dependencia_id}', response_model=DependenciaReadOne)
def listar_dependencia(dependencia_id: int):
    dependencia = DependenciaDB.get_or_none(DependenciaDB.id == dependencia_id)
    return dependencia

@router.patch(path='/{dependencia_id}', response_model=DependenciaReadOne)
def atualizar_dependencia(
    dependencia_id: int, novo_dependencia: DependenciaUpdate
):
    dependencia = DependenciaDB.get_or_none(DependenciaDB.id == dependencia_id)
    dependencia.nome = novo_dependencia.nome
    dependencia.save()
    return dependencia

@router.delete(path='/{dependencia_id}', response_model=DependenciaReadOne)
def excluir_dependenicas(dependencia_id: int):
    dependencia = DependenciaDB.get_or_none(DependenciaDB.id == dependencia_id)
    dependencia.delete_instance()
    return dependencia
