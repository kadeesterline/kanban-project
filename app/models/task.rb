require 'lexorank/rankable'

class Task < ApplicationRecord
	belongs_to :list
	belongs_to :user
	belongs_to :member
	rank!

	# validates :title, presence: true
end