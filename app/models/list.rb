require 'lexorank/rankable'

class List < ApplicationRecord
	belongs_to :board
	has_many :tasks, dependent: :destroy

	rank!(group_by: :board)
end
