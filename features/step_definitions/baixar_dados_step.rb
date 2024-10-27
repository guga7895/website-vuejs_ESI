Quando /eu pressiono "Baixar Tabela" no corpo da página/ do
    find('#app > div > div:nth-child(2) > div > div.c-home__distribution-data-table.container.mx-auto.py-20.-mt-2 > div.container.mx-auto.flex.justify-center > a').click
end

Entao /eu deveria ver o titulo da pagina de downloads de arquivos/ do
    assert_title('Index of /dadosorcamentarios')
end