### 3.3.4 Processo 1 – Compra de Material

O nome do processo é "Empréstimo de Ferramenta", esse modelo AS-IS evidencia as fragilidades do processo tradicional, como a ausência de notificações, rastreamento digital e controle em tempo real. Essas lacunas justificam a proposta de melhoria apresentada no processo TO-BE.
 
![Imagem do WhatsApp de 2025-04-07 à(s) 14 00 53_757b960f](https://github.com/user-attachments/assets/363e9584-b8cc-4b1f-af2b-f0aa48cf064a)

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


**Retirada de Ferramenta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome do Funcionário   | Caixa de Texto    |       Máximo 50 caracteres         |                   |
|    Dia da retirada  | Data   | 	Deve ser a data do dia da retirada |  |
|    Ferramenta    | Seleção única   |  Escolher item do estoque        |                   |
|    Quantidade    | Número    | Deve ser ≥ 1          |        1           |

| **Comandos**         |  **Destino**             | **Tipo**            |
|    ---               |  ---                     |    ---              | 
| Registrar | Registra manualmente a retirada em planilha ou caderno  | (default) |
| Cancelar | Cancela a operação e retorna ao estoque| (default) |

**Uso da Ferramenta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Descrição do uso    | Área de Texto	    |        |                   |
|    Responsável  | Caixa de Texto   | 	Obrigatório |  |
|    Local de uso    | Caixa de Texto    |       Opcional         |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Continuar  |O funcionário segue utilizando a ferramenta  | (default) |
| Encerrar uso  |  Direciona à devolução da ferramenta | (default) |

**Devolver Ferramenta 3**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome do Funcionário   | Caixa de Texto    |       Máximo 50 caracteres         |                   |
|    Data da retirada  | Data   | 	 |    Data Atual |
|    Ferramenta Devolvida?    | Seleção única   |  Sim/Não        |                   |
|    Condição do Item    | Seleção única    | Nova / Boa / Danificada          |                   |
| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Sim | Marca a devolução como concluída  |  |
| Não | Direciona para registro de perda (feito de forma informal ou verbal) | seleção única |
| Cancelar | Volta para a decisão de continuar ou não usando a ferramenta  | (default) |


**Relatar Perda de Ferramenta 5**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome | Caixa de texto  |    50 caracteres           |                   |
| Descrição da ferramenta    |      Área de texto     |                |  |
| Data da perda    |    Data  |                |  |
| Último local vista    |    Área de texo  |                |  |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar | Fim do processo | (default) |
| Cancelar | Volta para a decisão de Continuar usando ferramenta? | (default) |

