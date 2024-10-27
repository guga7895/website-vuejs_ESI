Dado('que estou na página do mapa') do
    visit '/map-despesas'
end
  
Então('devo ver o contêiner do mapa') do
    expect(page).to have_css('.c-map')
end

Então('devo ver o título e a descrição do mapa') do
    expect(page).to have_content('Acompanhe os gastos públicos da cidade de São Paulo em tempo real')
    expect(page).to have_content('O projeto Cuidando do Meu Bairro propõe tornar mais inteligível a visualização dos dados das despesas públicas a partir da geolocalização dos gastos')
end