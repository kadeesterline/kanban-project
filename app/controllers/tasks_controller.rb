class TasksController < ApplicationController
	#skip_before_action :authorize_user
	# skip_before_action :authorize_member

	def index
		render json: Task.all, status: :ok
	end

	def show
		render json: find_task
	end

	def create
		task = Task.create!(task_params)
		render json: task, status: :created
	end

	def update
		task = find_task
		task.update(task_params)
		render json: task
	end

	def destroy
		task = find_task
		task.destroy
		head :no_content
	end

	private

	def find_task
		task = Task.find_by!(id: params[:id])
	end

	def task_params
		params.permit(:list_id, :user_id, :title, :member_id, :content, :priority)
	end
end
