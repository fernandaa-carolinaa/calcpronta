from fastapi import APIRouter
from models.bandeira import BandeiraDB
from schemas.bandeira import (
    BandeiraCreate,
    BandeiraRead,
    BandeiraReadList,
    BandeiraUpdate,
)

router = APIRouter(prefix='/bandeiras', tags=['BANDEIRAS'])

@router.post(path='', response_model=BandeiraRead)
def criar_bandeira(nova_bandeira: BandeiraCreate):
    bandeira = BandeiraDB.create(**nova_bandeira.dict())
    return bandeira

@router.get(path='', response_model=BandeiraReadList)
def listar_bandeira():
    bandeiras = BandeiraDB.select()
    return {'bandeiras': bandeiras}

@router.get(path='/{bandeira_id}', response_model=BandeiraRead)
def listar_bandeira(bandeira_id: int):
    bandeira = BandeiraDB.get_or_none(BandeiraDB.id == bandeira_id)
    return bandeira

@router.patch(path='/{bandeira_id}', response_model=BandeiraRead)
def atualizar_bandeira(bandeira_id: int, comodo_atualizado: BandeiraUpdate):
    bandeira = BandeiraDB.get_or_none(BandeiraDB.id == bandeira_id)
    bandeira.tarifa = comodo_atualizado.tarifa
    bandeira.nome = comodo_atualizado.nome
    bandeira.save()
    return bandeira

@router.delete(path='/{bandeira_id}', response_model=BandeiraRead)
def excluir_bandeira(bandeira_id: int):
    bandeira = BandeiraDB.get_or_none(BandeiraDB.id == bandeira_id)
    bandeira.delete_instance()
    return bandeira
