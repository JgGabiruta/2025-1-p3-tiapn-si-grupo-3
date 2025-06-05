
# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes).

 Apresente as principais interfaces da plataforma. Discuta como ela foi elaborada de forma a atender os requisitos funcionais, não funcionais e histórias de usuário abordados na <a href="02-Especificacao.md"> Especificação do projeto</a></span>.

 ## User flow
 
 O fluxo de navegação da aplicação Manejo GR foi cuidadosamente planejado para garantir uma experiência intuitiva e funcional ao usuário, desde o acesso inicial até a gestão completa dos recursos internos da empresa. A estrutura de telas cobre todo o ciclo de uso da plataforma, iniciando com login, cadastro e assinatura, e seguindo por seções como gestão de funcionários, controle de estoque, agendamentos, departamentos, configurações e relatórios. Cada interface foi desenhada para facilitar a execução das tarefas com agilidade e clareza, refletindo o objetivo central da aplicação: simplificar a gestão de materiais e recursos para empresas que buscam modernizar seus processos operacionais.
 
![User flow Manejo GR](images/UserFlow_Manejo.jpg)


### Diagrama de fluxo

O diagrama de fluxo a seguir ilustra o processo detalhado de autenticação do usuário em uma tela de login. Ele descreve as etapas sequenciais desde a entrada das credenciais pelo usuário até a validação dessas informações e a consequente autorização para acesso ao sistema. Este fluxo inclui as verificações de erros, como dados incorretos ou campos vazios, além das ações tomadas em caso de sucesso ou falha no login, garantindo uma compreensão clara do funcionamento e das possíveis interações dentro dessa funcionalidade.
![Diagrama de fluxo Login](images/Manejo_DiagramaFluxo.png)

## Wireframes

Os wireframes do projeto Manejo apresentam a estrutura visual e a organização das principais telas do sistema, proporcionando uma visão clara da navegação e das funcionalidades disponíveis. O projeto contempla telas essenciais como a Home, Login e Cadastro para acesso e registro dos usuários, além de telas específicas para Empréstimo, Funcionário, Estoque, Agenda, Configuração e Departamento. Cada wireframe foi elaborado para facilitar a interação do usuário, otimizando o fluxo de trabalho e garantindo uma experiência intuitiva e eficiente dentro do sistema.

![Tela-Login-Cadastro-Assinatura](images/Manejo_TelasLCA.png)
![Tela-Home](images/Manejo_Home.png)
![Tela-Empréstimo](images/Manejo_TelasEmprestimo.png)
![Tela-Funcionários](images/Manejo_TelasFunc.png)
![Tela-Agenda](images/Manejo_TelasAgenda.png)
![Tela-Estoque](images/Manejo_TelasEstoque.png)
![Tela-Configurações](images/Manejo_Configuracoes.png)
![Tela-Departamento](images/Manejo_TelasDep.png)
 

## Interface do sistema

### Tela principal do sistema

Tela Home: é a tela inicial do projeto, utilizada como um painel de controle para visualizar rapidamente o número de funcionários ativos e a quantidade de ferramentas disponíveis em estoque. Conta também com uma aba de lembretes, onde é possível adicionar, excluir e marcar itens como lidos, facilitando a organização das atividades do dia a dia.

![Tela-Home](images/Manejo_Home.png)



###  Telas de Emprestimo

Tela de Empréstimo: permite o gerenciamento dos empréstimos de materiais solicitados pelos funcionários. Nela, é possível listar os empréstimos em andamento, registrar um novo empréstimo para um funcionário, editar informações relacionadas ao departamento e até bloquear funcionários de realizar novos empréstimos, quando necessário. Essa tela centraliza o controle das movimentações de recursos, garantindo mais organização e rastreabilidade.

![image](https://github.com/user-attachments/assets/5b18b3d0-b54f-4a38-9c45-b2f9e45cb88b)


Na tela de Listar Empréstimos, o usuário consegue ver e filtrar todos os empréstimos que estão ativos, além de conseguir devolvê-los.

![image](https://github.com/user-attachments/assets/ea619bb8-3cd5-4c6a-adb3-3190dcfc3cc4)




### Tela de Estoque

Tela de Estoque: permite ao usuário uma visualização clara e objetiva de todas as ferramentas sob responsabilidade da empresa, facilitando sua organização e manejo. A tela exibe informações como código da ferramenta, nome, quantidade disponível, categoria, localização e uma ação que, ao ser clicada, permite visualizar o histórico de uso da ferramenta e seus detalhes. Além disso, o sistema possibilita a geração de relatórios sobre sua utilização, contribuindo para um controle mais eficiente e estratégico dos recursos. 


![image](https://github.com/user-attachments/assets/62aff239-7ff3-4d63-b74d-a3180adbba44)

O usuário consegue ver e editar todas as ferramentas que estão no estoque, assim como ver o histórico de uso de cada uma.

![image](https://github.com/user-attachments/assets/862466ed-6ada-4839-9f0e-8c5a7c6be5de)
![image](https://github.com/user-attachments/assets/001335a9-44a9-4738-9344-46960b0e3e26)


