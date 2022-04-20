# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_17_002335) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "task_id", null: false
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_comments_on_member_id"
    t.index ["task_id"], name: "index_comments_on_task_id"
  end

  create_table "lists", force: :cascade do |t|
    t.bigint "board_id", null: false
    t.string "name"
    t.text "rank"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id"], name: "index_lists_on_board_id"
    t.index ["rank"], name: "index_lists_on_rank", unique: true
  end

  create_table "members", force: :cascade do |t|
    t.boolean "is_admin"
    t.bigint "user_id", null: false
    t.bigint "board_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id"], name: "index_members_on_board_id"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "list_id", null: false
    t.bigint "user_id", null: false
    t.bigint "member_id", null: false
    t.string "title"
    t.text "content"
    t.integer "priority"
    t.datetime "start_date"
    t.datetime "due_date"
    t.text "rank"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["list_id"], name: "index_tasks_on_list_id"
    t.index ["member_id"], name: "index_tasks_on_member_id"
    t.index ["rank"], name: "index_tasks_on_rank", unique: true
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "image_url"
    t.string "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "members"
  add_foreign_key "comments", "tasks"
  add_foreign_key "lists", "boards"
  add_foreign_key "members", "boards"
  add_foreign_key "members", "users"
  add_foreign_key "tasks", "lists"
  add_foreign_key "tasks", "members"
  add_foreign_key "tasks", "users"
end
