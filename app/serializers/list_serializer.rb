class ListSerializer < ActiveModel::Serializer
    attributes :id, :name, :rank
    has_one :board
    has_many :tasks
    
  end
  