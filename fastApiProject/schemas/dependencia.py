from pydantic import BaseModel
from schemas.dispositivos import DispositivoReadMany  # Certifique-se de que DispositivoReadMany está definido

class DependenciaCreate(BaseModel):
    nome: str
    unidade_consumidora_id: int

class DependenciaUpdate(BaseModel):
    nome: str

class DependenciaReadOne(BaseModel):
    id: int
    nome: str
    unidade_consumidora_id: int
    dispositivos: list[DispositivoReadMany] = []  # Inicializa como lista vazia para evitar problemas

class DependenciaReadMany(BaseModel):
    id: int
    nome: str

class DependenciaReadManyWithDispositivos(BaseModel):
    id: int
    nome: str
    dispositivos: list[DispositivoReadMany]  # Certifique-se de que DispositivoReadMany está definido

class DependenciaReadList(BaseModel):
    dependencias: list[DependenciaReadManyWithDispositivos]
