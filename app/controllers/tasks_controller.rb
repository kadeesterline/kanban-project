class TasksController < ApplicationController
	#skip_before_action :authorize_user

	def index
		render json: Task.ranked, status: :ok
	end

	def show
		render json: find_task
	end

	def create
		task = Task.create!(task_params)
		#task.move_to!(task.list.tasks.length.to_i)
		task.move_to!(0)
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

	#needs :dest_index, :id of task
	def move_task
		task = find_task
		# puts "before rank changes, #{task.rank}"
		task.move_to!(params[:dest_index].to_i + 1)
		# puts "#{task.rank}"
		# puts "target index, #{params[:dest_index].to_i}"
		# puts "after rank changes', #{task.rank}"
		lists = task.list.board.lists.all
		rankedLists= lists.each { |li| li.tasks.ranked}
		puts rankedLists
		render json: rankedLists
	end

	private 

	def find_task
		task = Task.find_by!(id: params[:id])
	end

	def task_params
		params.permit(:list_id, :user_id, :title, :member_id, :content, :priority, :due_date, :rank)
	end
end
