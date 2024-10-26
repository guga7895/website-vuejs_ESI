Dado /que eu estou na tela inicial/ do
  visit ''
end

Quando /eu pressiono "Entrar"/ do
  find(:css, '#navbar > ul > li:nth-child(5) > a').click
end

Entao /eu deveria ver "(.*)" dentro do id "(.*)"/ do |texto, id|
  find_by_id(id).assert_text(texto)
end