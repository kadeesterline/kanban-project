class ListsController < ApplicationController
	#skip_before_action :authorize_user
	# skip_before_action :authorize_member

	def index 
		render json: List.all
	end

	
	def create
		
		list = List.create!(list_params)
		render json: list, status: :created
	end

	def update
		list = find_list
		list.update(list_params)
		render json: list
	end

	def destroy
		list = find_list
		list.destroy
		head :no_content
	end

	private

	def find_list
		list = List.find(params[:id])
	end

	def list_params
		params.permit(:name, :board_id)
	end

end