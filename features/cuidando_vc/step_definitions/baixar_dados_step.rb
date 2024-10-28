Dado /que eu estou na pagina de downloads/ do
    steps %Q{
      Dado que eu estou na tela inicial
      Quando eu pressiono "Baixar Tabela" no corpo da página
    }
  
  end

Quando /eu pressiono "Baixar Tabela" no corpo da página/ do
    find('#app > div > div:nth-child(2) > div > div.c-home__distribution-data-table.container.mx-auto.py-20.-mt-2 > div.container.mx-auto.flex.justify-center > a').click
end

Entao /eu deveria estar pagina de downloads de arquivos/ do
    switch_to_window { title == 'Index of /dadosorcamentarios' }
    assert_current_path('https://devcolab.each.usp.br/dadosorcamentarios/')
end

Entao('eu deveria ver todos os arquivos .csv de 2003 ate o ano atual') do
    anoAtual = Time.now.year.to_i
    anoTestado = 2003
    while anoTestado <= anoAtual
        find_link(anoTestado.to_s + '.csv').visible?
        anoTestado = anoTestado + 1
    end
end
    