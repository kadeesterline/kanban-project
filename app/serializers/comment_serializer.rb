class CommentSerializer < ActiveModel::Serializer
    attributes :id, :content
    has_one :task
    has_one :member
  end