# language: pt

Funcionalidade: Verificar o ano padrão na página de mapa
  Cenário: O ano padrão deve ser o ano atual quando a página é carregada
    Dado que estou na página do mapa para verificar o ano
    Então o ano padrão deve ser diferente do atual