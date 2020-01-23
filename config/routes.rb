Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'lists/index'
      post 'lists/create'
      get 'lists/show/:id', to: 'lists#show'
      delete 'lists/destroy/:id', to: 'lists#destroy'
    end
  end
  root 'homepage#index'
	get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
