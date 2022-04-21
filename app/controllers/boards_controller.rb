class BoardsController < ApplicationController
	skip_before_action :authorize, only: [:index]

	def index
		render json: Board.all, status: :ok, each_serializer: BoardAllSerializer
	end

	def show
		render json: find_board,
		       user_id: params[:user_id],
		       include: %w[lists lists.tasks members],
		       serializer: BoardSerializer
	end

	def create
		board = Board.create!(board_params)
		member =
			Member.create!(
				user_id: params[:user_id],
				board_id: board.id,
				is_admin: true,
			)
		render json: board, status: :created
	end

	def update
		board = find_board
		if is_admin?
			board.update(board_params)
			render json: board
		else
			render json: { error: 'Not admin of board' }, status: :unauthorized
		end
	end

	def destroy
		board = find_board
		if is_admin?
			board.destroy
			head :no_content
		else
			render json: { error: 'Not admin of board' }, status: :unauthorized
		end
	end

	private

	def is_admin?
		member = Member.find_by!(user_id: @current_user.id, board_id: params[:id])
		member.is_admin
	end

	def find_board
		board = Board.find(params[:id])
	end

	def board_params
		params.permit(:name)
	end
end
