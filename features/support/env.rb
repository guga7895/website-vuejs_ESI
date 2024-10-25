require 'capybara/cucumber'
require 'selenium-webdriver'
require 'rspec'

Capybara.default_driver = :selenium_chrome
Capybara.app_host = 'https://cuidando.vc'
Capybara.default_max_wait_time = 5

World(RSpec::Matchers)