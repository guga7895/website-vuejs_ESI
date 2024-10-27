Dado('que estou na página do mapa para verificar o ano') do
    visit '/map-despesas'
  end
  
  Então('o ano padrão deve ser o ano atual') do
    current_year = Time.now.year.to_s    
    expect(page).to have_selector('button[data-dropdown-toggle="dropdownYear"]')
    # esperar 3 segundos, pois as configurações das datas demoram um tempinho para carregar (aparece nil ao carregar).
    sleep 3
    year_button = find('button[data-dropdown-toggle="dropdownYear"]')
    expect(year_button.text).to include(current_year)
  end