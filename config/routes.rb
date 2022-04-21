Rails.application.routes.draw do
	resources :comments, except: %i[index update]
	resources :tasks
	resources :lists
	resources :members
	resources :boards, except: [:show]
	resources :users, except: %i[create show]

	# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
	# Defines the root path route ("/")
	# root "articles#index"

	post '/signup', to: 'users#create'
	post '/login', to: 'sessions#create'
	delete '/logout', to: 'sessions#destroy'
	get '/sessions/:user_id', to: 'sessions#show'
	get '/autologin', to: 'users#show'
	post '/joinboard', to: 'sessions#join_board'
	post '/boards/:id', to: 'boards#show'

	# Routing logic: fallback requests for React Router.
	# Leave this here to help deploy your app later!
	get '*path',
	    to: 'fallback#index',
	    constraints: ->(req) { !req.xhr? && req.format.html? }
end
