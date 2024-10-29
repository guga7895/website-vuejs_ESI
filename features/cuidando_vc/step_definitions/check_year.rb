Dado('que estou na página do mapa para verificar o ano') do
    visit '/map-despesas'
  end
  
  Então('o ano padrão deve ser diferente do atual') do
    expected_year = Time.now.year.to_s    
  
    
    expect(page).to have_selector('#app > div > div.c-map.expanded-map > div.map__card-content.container.mx-auto > div > div.bg-white.lg\:pb-10.lg\:p-10.pt-10.pb-3.mb-5.lg\:rounded-lg.lg\:shadow-lg > div:nth-child(2) > div.c-map__year-submit.grid.grid-cols-2.gap-4.h-8 > div:nth-child(1) > div > button')
        # esperar 3 segundos, pois as configurações das datas demoram um tempinho para carregar (aparece nil ao carregar).
    sleep 3
    year_button_map = find('#app > div > div.c-map.expanded-map > div.map__card-content.container.mx-auto > div > div.bg-white.lg\:pb-10.lg\:p-10.pt-10.pb-3.mb-5.lg\:rounded-lg.lg\:shadow-lg > div:nth-child(2) > div.c-map__year-submit.grid.grid-cols-2.gap-4.h-8 > div:nth-child(1) > div > button')
    expect(year_button_map.text).not_to include(expected_year)
  
    
    expect(page).to have_selector('#navbar > ul > li:nth-child(6) > div > button')
        # esperar 3 segundos, pois as configurações das datas demoram um tempinho para carregar (aparece nil ao carregar).
    sleep 3
    year_button_navbar = find('#navbar > ul > li:nth-child(6) > div > button')
    expect(year_button_navbar.text).not_to include(expected_year)
  end
  