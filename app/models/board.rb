class Board < ApplicationRecord
    has_many :members, dependent: :destroy
	has_many :users, through: :members
	has_many :lists, dependent: :destroy
	has_many :tasks, through: :lists, dependent: :destroy
end
