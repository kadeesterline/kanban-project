class BoardSerializer < ActiveModel::Serializer
	attributes :id, :name
	attribute :users_membership

	has_many :members
	has_many :users, through: :members
	has_many :lists
	has_many :tasks, through: :lists
end
