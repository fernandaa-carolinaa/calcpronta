from models.dispositivo import DispositivoDB
from models.bandeira import BandeiraDB

def calcular_consumo(eletrodomesticos: list[DispositivoDB], bandeira: BandeiraDB):
    consumo_diario = sum(
        eletrodomestico.consumo * eletrodomestico.uso_diario
        for eletrodomestico in eletrodomesticos
    )
    consumo_mensal = consumo_diario * 30
    consumo_anual = consumo_diario * 365

    # Aplicando a tarifa da bandeira
    tarifa = bandeira.tarifa
    custo_diario = consumo_diario * tarifa
    custo_mensal = consumo_mensal * tarifa
    custo_anual = consumo_anual * tarifa

    return consumo_diario, consumo_mensal, consumo_anual, custo_diario, custo_mensal, custo_anual
