# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

## Modelagem da situação atual (Modelagem AS IS)

Para o processo de fluxo de ferramentas entre funcionários é feito da seguinte forma: O funcionário retira a ferramenta, anota a retirada de ferramentas de forma manual, logo em seguida usa a ferramenta e após o seu tempo de uso, devolve a ferramenta e, assim, o processo é encerrado.


![Imagem do WhatsApp de 2025-04-02 à(s) 19 52 20_0797c325](https://github.com/user-attachments/assets/06680ce1-6ac9-49a8-a590-2fd381970c41)


Para o processo de compra de materiais funciona da seguinte forma: O funcionário de campo envia a requisição do material faltante e em seguida o escritório recebe esta requisição e a aprova, nesse momento faz um levantamento orçamentário da compra do material requisitado contatando o fornecedor e recebendo sua resposta, caso o orçamento inicial não seja aprovado a tarefa se repete, no momento em que o orçamento é aprovado pelo escritório o processo de compra do material é iniciado, e a seguir é feito o processamento de compra pelo fornecedor, e em seguida gera o documento da nota fiscal, essa nota fiscal é enviada ao funcionário de campo que requisitou a compra dos materiais após ter informado que a compra foi feita, este então confere a nota fiscal e se ela estiver errada o processo de gerar nota fiscal acontece novamente e se ela estiver correta o processo de compra é encerrado.

![Imagem do WhatsApp de 2025-04-07 à(s) 14 00 53_757b960f](https://github.com/user-attachments/assets/363e9584-b8cc-4b1f-af2b-f0aa48cf064a)

## Descrição geral da proposta (Modelagem TO BE)

Para otimizar o fluxo de empréstimo de ferramentas entre funcionários, foi proposto um modelo com melhorias no processo. A primeira mudança consiste na formalização do registro: ao realizar o empréstimo de uma ferramenta, o próprio funcionário deverá gerar um relatório documentado, substituindo as anotações informais anteriormente utilizadas. Essa formalização aumenta a rastreabilidade das ferramentas e promove maior responsabilidade individual, contribuindo diretamente para o controle eficiente dos ativos da empresa e a redução de perdas.

Outra melhoria prevista é a verificação do uso da ferramenta após um período de 48 horas. Caso o equipamento ainda esteja sendo utilizado, o sistema de empréstimo é atualizado para refletir essa continuidade. Se não estiver mais em uso, a ferramenta deverá ser devolvida, com a atualização no sistema e emissão de um comprovante de devolução. Esse acompanhamento periódico proporciona maior visibilidade sobre a utilização dos recursos e favorece a eficiência operacional, ao garantir que ferramentas não permaneçam em desuso ou em poder de funcionários sem necessidade.

Além disso, foi definido um procedimento específico para situações em que a ferramenta for perdida, exigindo que a ocorrência seja formalmente registrada. Essa medida contribui para a responsabilização dos envolvidos e fortalece a gestão de riscos, ao manter um histórico confiável dos materiais e promover a proteção do patrimônio da empresa. No conjunto, essas melhorias visam tornar o processo mais transparente, seguro e alinhado aos objetivos estratégicos de controle, eficiência e redução de desperdícios.


![TO-BE - Processo 1](https://github.com/user-attachments/assets/77a6eae2-1979-4d32-93c5-13e8fa5a22ac)

No processo de compra de materiais, como a empresa já possui um fluxo bem definido e funcional, foi realizada uma melhoria pontual com a inclusão de uma tarefa sistêmica de notificação sobre baixo estoque logo após o início do processo. Essa notificação permite que os funcionários sejam informados com antecedência sobre a necessidade de reposição de determinado material, possibilitando que a requisição seja enviada ao escritório, responsável pelas aquisições, de forma mais ágil. A partir desse ponto, o fluxo segue normalmente conforme os procedimentos já estabelecidos. Essa antecipação reduz o intervalo entre a identificação da escassez e o início do processo de compra, otimizando o tempo de resposta e evitando impactos nas atividades que dependem dos materiais em questão.

Ao garantir maior previsibilidade e agilidade na reposição de itens, essa melhoria contribui para a eficiência operacional, fortalece o planejamento interno e minimiza o risco de interrupções nos processos, alinhando-se diretamente aos objetivos da empresa de manter a continuidade das operações e reduzir desperdícios de tempo e recursos.

![TO-BE - Processo 2](https://github.com/user-attachments/assets/3fd0cb72-f7d5-474b-b59b-e38445cffe1e)

## Modelagem dos processos

[PROCESSO 1 - Empréstimo de Ferramentas]<a href="02-Especificacao.md"> Especificação do projeto</a>
(./images/TO-BE-emprestimo-ferramenta.png "Detalhamento do processo 1.")


[PROCESSO 2 - Compra de Material]<a href="TO-BE-Compra-de-Materia.md"> Detalhamento do processo 2</a>
(./processes/TO-BE-Compra-de-Materia.md "Detalhamento do processo 2.")



## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Tempo de uso de ferramentas entre os funcionarios | Verificar se o tempo de uso esta dentro do esperado | Mede quanto tempo, em média, as ferramentas ficam com os funcionários | Tabela Empréstimos / Log de Retirada e Devolução | soma de (hora da devolução - hora da retirada) / número total de usos |
| Percentual de ferramentas não devolvidas | Monitorar perdas ou esquecimentos de devolução| Mede a % de ferramentas que foram retiradas e ainda não devolvidas | Tabela de Empréstimos | (número de ferramentas não devolvidas / número total de retiradas) * 100 |
| Percentual de devoluções fora do prazo | Avaliar o cumprimento dos prazos estabelecidos de devolução | Mede quantas devoluções aconteceram após o tempo permitido | Tabela Empréstimos / Regras de Tempo de Uso | (número de devoluções atrasadas / total de devoluções) * 100 |
| Tempo médio de aprovação de compra | Reduzir burocracia e agilizar o processo |Mede o tempo médio entre a solicitação e a aprovação da compra | Tabela de Solicitações / Log de Aprovação | soma dos tempos entre solicitação e aprovação / número de solicitações |
|Controlar o orçamento da empresa|Mede o valor médio gasto em cada compra realizada| Tabela de Pedidos / Tabela Financeira | soma dos valores dos pedidos / número de pedidos|


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
