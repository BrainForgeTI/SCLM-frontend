# ENTREGA 4 - SINGLETON

Implementamos o padrão singleton neste Frontend para monitorar quando tempo o usuário permanece em cada tela referente à aventura (trilha de estudos) em que ele está.

# COMO VALIDAR?

1. Colone o repositório
2. Acesse a pasta clonada e abra com o CMD
3. Mesmo que você clone a partir da branch correta, ainda será necessário trazê-la para o repositório local que foi clonado, com os seguintes passos:

* Garanta que esteja na ``main`` com ``git status``
* Traga a branch com a implementação do singleton com o comando `git checkout -b temp/logmanager origin/temp/logmanager`

* Com isso, você estará na branch correta.

3. Digite no cmd que foi aberto anteriormente o comando ``npm install`` e aguarde até instalar as dependências

4. Com as dependências instaladas, digite no cmd o comando `npm run dev` isso iniciará o sistema em modo de desenvolvimento. Eu removi o Strict Mode que fazia a tela renderizar duas vezes seguidas, então estará tudo certo.

5. quando o sistema for iniciado, ele exibirá o link de acesso no cmd, mas deverá acessar o caminho ``localhost:3000/home`` em seu navegador.

6. Abra as Dev tools no navegador (geralmente, basta pressionar f12). A home irá mostrar algumas aventuras (mock de aventuras). clique no botão de uma delas para entrar em uma.

7. Assim que a aventura abrir, dois novos botões irão aparecer no menu lateral da esquerda. O singleton conta a permanencia somente nessas duas telas

7. A partir desse momento o Singleton contador de permanencia já estará contando. Por padrão, você estará na tela `Home` da aventura. Assim que você clicar para navegar para qualquer outra tela, os logs do singleton deverão aprecer nas dev tools.


# Como isso funciona no react?

No react temos um hook (função) que é executado a partir de mudanças. Esse hook, chamado useEffect, está configurado para chamar o singleton ao iniciar a tela e gravar o log quando ela for fechada.

A implementação do Singleton está na pasta src/utils/class/logManager.ts

Em síntese, o Singleton é uma classe estática que tem uma única instância, dentro da própria classe no atributo estático `instance` que pode ser recuperado pelo método estático `getInstance`
