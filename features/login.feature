#language: pt

Funcionalidade: Fazer login

Cenario: Abrir a pagina de login na página inicial
Dado que eu estou na tela inicial
Quando eu pressiono "Entrar" no cabeçalho
Entao eu deveria ver "Acesse nossa plataforma" dentro do css "#modal-dialog"

Cenario: Preencher o formulario de login
Dado que eu estou no formulario de login
Quando eu preencho "Nome de usuário" com "FelipeTeste1"
E eu preencho "Senha" com "12345"
E eu pressiono "Entrar" no formulario de login
Entao eu deveria ver "FelipeTeste1" dentro do css "#navbar > ul > li:nth-child(5) > button"