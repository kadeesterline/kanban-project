class MembersController < ApplicationController
	#skip_before_action :authorize_user

	def create
		member = Member.create!(member_params)

		# session[:member_id] = member.id
		render json: member, status: :created
	end

	private

	def member_params
		params.permit(:board_id, :user_id, :is_admin)
	end
end
