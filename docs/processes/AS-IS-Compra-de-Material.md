### 3.3.4 Processo 1 – Compra de Material

O processo "Empréstimo de Ferramenta", em sua versão AS-IS, evidencia diversas fragilidades típicas de métodos tradicionais. Entre os principais pontos de atenção estão a ausência de notificações automáticas, a falta de rastreamento digital das ferramentas e a inexistência de um controle em tempo real das movimentações. Essas lacunas comprometem a eficiência, a organização e a segurança no uso dos materiais. Diante disso, justifica-se a proposta de melhoria apresentada no modelo TO-BE, que visa modernizar e tornar o processo mais confiável e transparente.
 
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


**Gerar Requisição**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome do Funcionário   | Caixa de Texto    |       Máximo 50 caracteres         |           |
|    Departamento  | Seleção única  | Obras / Almoxarifado / Administrativo |  |
|    Ferramenta    | Seleção única   |  Escolher item do estoque        |                   |
|    Descrição do Material    | 	Área de Texto    | Obrigatório          |                   |
|    Quantidade    | 	Número    | 	Deve ser ≥ 1          |              1     |
|    Data da Solicitação    | 	Data    | Obrigatório          |             Data atual |

| **Comandos**         |  **Destino**             | **Tipo**            |
|    ---               |  ---                     |    ---              | 
| Enviar | Envia requisição ao escritório  | (default) |
| Cancelar | 	Interrompe solicitação| (default) |

**Aprovar Requisição**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome do Funcionário   | Caixa de Texto    |       Obrigatório         |           |
|    Data da Aprovação    | 	Data    | 	≥ Data da solicitação          | |
|   Observações    | 	Área de Texto    | 		Opcional      | |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Aprovar  |Prossegue para levantamento de orçamento  | (default) |
| Rejeitar |  Finaliza processo | (default) |

**Levantar Orçamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|   Fornecedor Consultado  | Caixa de Texto    |       Obrigatório         |                   |
|   Fornecedor Consultado  | Área de Texto    |       Obrigatório         |                   |
|   Valor Orçado  | Número    |       	Deve ser ≥ 0         |                   |
|    Data do Orçamento  | Data   | 	Obrigatório |     |
|    Anexo Cotação    | Arquivo  |  Obrigatório       |                   |
|    Condição do Item    | Seleção única    | Nova / Boa / Danificada          |               |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar Orçamento | Direciona para aprovação de orçamento  |  (default)|
| Cancelar | 	Interrompe o processo | (default) |


**Aprovar Orçamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome | Caixa de texto  |    Obrigatório           |                   |
| Resultado da Análise    |     Seleção única	     |       Aprovado / Reprovado         |  |
| Justificativa (se não aprovado)    |    Área de Texto  |        Obrigatória se reprovado   | |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Aprovar | Direciona para compra | (default) |
| Reprovar | Retorna para levantamento de orçamento | (default) |

**Comprar Material**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Responsável pela Compra | Caixa de texto  |    Obrigatório           |                   |
| Data da Compra   |     Data   |       ≥ Data de aprovação         |  |
| Valor Final    |    Número  |        Obrigatório       |  |
| Comprovante da Compra    |    Arquivo  |        Obrigatório       |  |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Confirmar Compra | Inicia processamento da compra | (default) |
| Cancelar | Interrompe processo | (default) |

**Processar Compra**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Responsável  | Caixa de texto  |    Obrigatório           |                   |
| Data do Processamento  |     Data   |       ≥ Data da compra         |  |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Finalizar | Gera nota fiscal	 | (default) |

**Gerar Nota Fiscal**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Número da Nota Fiscal | Caixa de texto  |    Obrigatório           |                   |
| Data de Emissão   |     Data   |       ≥ Data da compra         |  |
| Arquivo da NF    |    Arquivo  |        Obrigatório       |  |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Emitir NF | Direciona para conferência| (default) |

**Conferir Nota Fiscal**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Responsável pela Conferência | Caixa de texto  |    Obrigatório           |                  |
| NF Correta?  |     	Seleção única   |      Sim / Não	        |  |
| Observações   |    Área de Texto  |        Opcional       |  |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Sim | Finaliza processo	| (default) |
|Não | Retorna para fornecedor ou revisão| (default) |




