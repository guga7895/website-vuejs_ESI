Given('Estou na página do mapa') do
    visit '/map-despesas'
  end
  
  Then('Eu deveria conseguir ver o container do mapa') do
    expect(page).to have_css('.c-map')
  end
  
  Then('Eu deveria ver o título e a descrição') do
    expect(page).to have_content('Acompanhe os gastos públicos da cidade de São Paulo em tempo real')
    expect(page).to have_content('O projeto Cuidando do Meu Bairro propõe tornar mais inteligível a visualização dos dados das despesas públicas a partir da geolocalização dos gastos')
  end