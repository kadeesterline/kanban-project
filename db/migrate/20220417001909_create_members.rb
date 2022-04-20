class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.boolean :is_admin
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end
