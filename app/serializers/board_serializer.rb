class BoardSerializer < ActiveModel::Serializer
	attributes :id, :name
	attributes :users_membership, :board_admin, :members

	# has_many :members
	has_many :users, through: :members
	has_many :lists
	# has_many :tasks, through: :lists

	# def tasks
	# 	puts "#{object.lists.all}"
	# end
	def members
		object.members.map { |m| m&.user&.username }
	end

	def users_membership
		object.members.find_by(user_id: instance_options[:user_id])
	end

	def board_admin
		object.members.find_by(is_admin: true)&.user&.username
	end
end
