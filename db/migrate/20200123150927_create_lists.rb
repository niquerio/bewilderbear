class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.boolean :active, default: true
      t.string :name, null: false

      t.timestamps
    end
  end
end
