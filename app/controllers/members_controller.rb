class MembersController < ApplicationController

	def create
		member = Member.create!(member_params)
		render json: member, status: :created
	end

	private

	def member_params
		params.permit(:board_id, :user_id, :is_admin)
	end
end
