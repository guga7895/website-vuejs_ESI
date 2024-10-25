Given('I am on the map page') do
    visit '/map-despesas'
  end
  
  Then('I should see the map container') do
    expect(page).to have_css('.c-map')
  end
  
  Then('I should see the map title and description') do
    expect(page).to have_content('Acompanhe os gastos públicos da cidade de São Paulo em tempo real')
    expect(page).to have_content('O projeto Cuidando do Meu Bairro propõe tornar mais inteligível a visualização dos dados das despesas públicas a partir da geolocalização dos gastos')
  end