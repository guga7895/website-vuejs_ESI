Quando /eu pressiono "Aprenda " no corpo da página/ do
    find('#navbar > ul > li:nth-child(2) > a').click
end
  
Entao('eu deveria estar na pagina glossario') do
    assert_current_path('/glossario')
end
  
Entao('eu deveria ver todos os videos sobre orçamento público') do
    divId = 1
    while divId <= 13
        find('#app > div > div.pg-glossary.pb-20 > div > div.w-full > div > div:nth-child('+divId.to_s+') > a > button').visible?
        divId = divId + 1
    end
end