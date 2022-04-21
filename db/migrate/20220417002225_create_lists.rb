class CreateLists < ActiveRecord::Migration[6.1]
	def change
		create_table :lists do |t|
			t.belongs_to :board, null: false, foreign_key: true
			t.string :name
			t.text :rank, collation: 'C'

			t.timestamps
		end
		add_index :lists, :rank, unique: true
	end
end
