### 3.3.1 Processo 1 – Empréstimo de Ferramenta

O nome do processo é "Empréstimo de Ferramenta", as melhorias adicionadas a ele são: adição de um sistema que armazena o relatório de empréstimo de cada ferramenta, um tempo máximo de uso para cada instrumento, sendo que após o término do período o funcionário deve atualizar o relatório de empréstimo da ferramenta, a adição de uma nova tarefa caso o operário venha perder a instrumento que está utilizando e por fim a geração automática de comprovante, após o funcionário devolver a ferramenta.
 
![Exemplo de um Modelo BPMN do PROCESSO 1](../images/TO-BE-emprestimo-ferramenta.png)

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


**Relatório de Empréstimo 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome    | Caixa de Texto    |       50 caracteres         |                   |
|    Dia da retirada  | Data   | tem que ser a data do dia da retirada |  |
|    Relatório    | Área de Texto    |                |                   |

| **Comandos**         |  **Destino**             | **Tipo**            |
|    ---               |  ---                     |    ---              | 
| Enviar | Inicia a atividade de usar a ferramenta | (default) |
| Cancelar | Volta para a atividade de retirar ferramenta | (default) |

**Atualizar Empréstimo de ferramenta 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome    | Caixa de Texto    |  50 caracteres     |                   |
|    Dia da retirada  | Data   | tem que ser a data do dia da retirada |  |
|    Relatório    | Área de Texto    |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar |Inicia a atividade de usar a ferramenta novamente  | (default) |
| Cancelar | Volta para a decisão de continuar ou não usando a ferramenta | (default) |

**Devolver Ferramenta 3**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| A ferramenta foi perdida? | Seleção única |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Sim | Inicia a ativdade de relatar perda de ferramenta  | seleção única |
| Não | Inicia a atividade de atualizar o empréstimo de ferramenta (após a devolução) | seleção única |
| Cancelar | Volta para a decisão de continuar ou não usando a ferramenta  | (default) |

**Atualizar Empréstimo de ferramenta (após a devolução) 4**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|    Nome    | Caixa de Texto    |   50 caracteres    |                   |
|    Dia da retirada  | Data   | tem que ser a data do dia da retirada |  |
|    Relatório    | Área de Texto    |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar |Inicia a atividade de comprovante de devolução  | (default) |
| Cancelar | Volta para a decisão de relatar ou não a perda da ferramenta  | (default) |

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
| Cancelar | Volta para a decisão de relatar ou não a perda da ferramenta | (default) |


