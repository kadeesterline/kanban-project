class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :image_url, :bio, :boards
    has_many :members

    def boards
      object.members.map { |m| m.board}
    end
  end