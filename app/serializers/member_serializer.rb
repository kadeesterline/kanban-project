class MemberSerializer < ActiveModel::Serializer
    attributes :id, :is_admin
    has_one :user
    has_one :board
  end
  