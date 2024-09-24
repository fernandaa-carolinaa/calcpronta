from fastapi import APIRouter

from models.unidade_consumidora import UnidadeConsumidoraDB
from models.dependencia import DependenciaDB
from models.dispositivo import DispositivoDB
from models.bandeira import BandeiraDB
from models.tipo_consumidor import TipoConsumidorDB

router = APIRouter(prefix="/consumos", tags=["CONSUMO"])

@router.get(path="/consumos/unidade-consumidora")
def calcular_unidade_consumidora(unidade_consumidora_id: int, bandeira_id: int):
    unidade_consumidora = UnidadeConsumidoraDB.get_or_none(UnidadeConsumidoraDB.id == unidade_consumidora_id)
    dispositivos = DispositivoDB.select().where(DispositivoDB.unidade_consumidora == unidade_consumidora)

    bandeira = BandeiraDB.get_or_none(BandeiraDB.id == bandeira_id)
    tipo_consumidor = TipoConsumidorDB.get_or_none(TipoConsumidorDB.id == unidade_consumidora.tipo)

    tarifa = bandeira.tarifa
    valor_kwh = tipo_consumidor.valor_kwh

    consumo_diario, consumo_mensal, consumo_anual, custo_diario, custo_mensal, custo_anual = calcular_consumo(list(dispositivos), bandeira)

    return {
        'consumo_diario': consumo_diario,
        'consumo_mensal': consumo_mensal,
        'consumo_anual': consumo_anual,
        'custo_diario': custo_diario,
        'custo_mensal': custo_mensal,
        'custo_anual': custo_anual
    }


@router.get(path="/consumos/dependencia")
def calcular_dependencia(dependencia_id, bandeira_id: int):
    dependencia = DependenciaDB.get_or_none(DependenciaDB.id == dependencia_id)
    dispositivos = DispositivoDB.select().where(DispositivoDB.dependencia == dependencia)

    bandeira = BandeiraDB.get_or_none(BandeiraDB.id == bandeira_id)
    print(dependencia.unidade_consumidora)
    tipo_consumido = TipoConsumidorDB.get_or_none(TipoConsumidorDB.id == dependencia.unidade_consumidora)

    tarifa = bandeira.tarifa
    valor_kwh = tipo_consumido.valor_kwh

    return {
        'tarifa': tarifa,
        'valor_do_kwh': valor_kwh,
        'lista_dispositivos': list(dispositivos),
    }