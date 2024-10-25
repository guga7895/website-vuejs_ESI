require 'capybara/cucumber'
require 'selenium-webdriver'
require 'rspec'

Capybara.default_driver = :selenium_chrome
Capybara.app_host = 'http://localhost:8080'

World(RSpec::Matchers)