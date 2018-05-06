Rails.application.routes.draw do
  get 'home/index'
  
  namespace :api do
    namespace :v1 do
      get 'search/' => 'rhb_generator#format', as: :search
    end
  end

  root to: 'home#index'  
end
