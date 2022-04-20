class TaskSerializer < ActiveModel::Serializer
    attributes :id, :title, :content, :priority, :start_date, :due_date, :rank
    has_one :list
    has_one :user
    has_one :member
  end
  