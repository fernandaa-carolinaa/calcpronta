from pydantic import BaseModel

class ConsumoRead(BaseModel):
    consumo_diario: float
    consumo_mensal: float
    consumo_anual: float
    custo_diario: float  # Novo campo para custo diário
    custo_mensal: float  # Novo campo para custo mensal
    custo_anual: float   # Novo campo para custo anual
