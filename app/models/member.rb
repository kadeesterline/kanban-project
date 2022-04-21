class Member < ApplicationRecord
	belongs_to :user
	belongs_to :board
	has_many :tasks
	has_many :lists, through: :tasks
	has_many :comments, through: :tasks

	validates :user, uniqueness: {scope: :board}
end