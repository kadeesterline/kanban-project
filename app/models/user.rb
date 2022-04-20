class User < ApplicationRecord
    has_secure_password
    has_many :members
  
    validates :username, presence: true, uniqueness: true
  end