# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


#require 'faker'


b1 = Board.create(name: 'board1')
b2 = Board.create(name: 'board2')
b3 = Board.create(name: 'board3')
b4 = Board.create(name: 'board4')

u1 = User.create(username: 'Bob', password: '123', password_confirmation: '123')
u2 =
	User.create(username: 'Martha', password: '123', password_confirmation: '123')
u3 =
	User.create(username: 'Agatha', password: '123', password_confirmation: '123')
u4 =
	User.create(username: 'Prince', password: '123', password_confirmation: '123')
u5 =
	User.create(username: 'Jacob', password: '123', password_confirmation: '123')
u6 =
	User.create(username: 'Ingrid', password: '123', password_confirmation: '123')
u7 =
	User.create(
		username: 'Abraham',
		password: '123',
		password_confirmation: '123',
	)

m1 = Member.create(board: b1, user: u1, is_admin: true)
m2 = Member.create(board: b2, user: u1, is_admin: false)
m3 = Member.create(board: b3, user: u1, is_admin: false)
m4 = Member.create(board: b1, user: u2, is_admin: false)
m5 = Member.create(board: b1, user: u3, is_admin: false)
m6 = Member.create(board: b2, user: u4, is_admin: false)
m7 = Member.create(board: b4, user: u4, is_admin: false)
m8 = Member.create(board: b4, user: u5, is_admin: false)
m9 = Member.create(board: b2, user: u5, is_admin: false)
m10 = Member.create(board: b2, user: u6, is_admin: false)
m11 = Member.create(board: b3, user: u6, is_admin: false)
m12 = Member.create(board: b3, user: u7, is_admin: false)

# Board.all.each do |b|
# 	List.new(board: b1, name: 'To Do')
# 	List.new(board: b2, name: 'In Progress')
# 	List.new(board: b3, name: 'Testing')
# 	List.new(board: b4, name: 'Completed')
# end

l1 = List.create(board: b1, name: 'To Do', rank: 'A')
l2 = List.create(board: b1, name: 'In Progress', rank: 'B')
l3 = List.create(board: b1, name: 'Completed', rank: 'C')
l4 = List.create(board: b2, name: 'To Do', rank: 'D')
l5 = List.create(board: b2, name: 'In Progress', rank: 'E')
l6 = List.create(board: b2, name: 'Completed', rank: 'F')
l7 = List.create(board: b3, name: 'To Do', rank: 'G')
l8 = List.create(board: b3, name: 'In Progress', rank: 'H')
l9 = List.create(board: b3, name: 'Completed', rank: 'I')
l10 = List.create(board: b4, name: 'To Do',  rank: 'J')
l11 = List.create(board: b4, name: 'In Progress', rank: 'K')
l12 = List.create(board: b4, name: 'Completed', rank: 'L')

t1 = Task.create(list: l1, user: u1, member: m1, title: 'test title', content: 'test content', priority: 1, rank: 'M')
t2 = Task.create(list: l4, user: u2, member: m2, title: 'test title', content: 'test content', priority: 1, rank: 'N')
t3 = Task.create(list: l8, user: u3, member: m3, title: 'test title', content: 'test content', priority: 1, rank: 'O')
t4 = Task.create(list: l12, user: u4, member: m4, title: 'test title', content: 'test content', priority: 1, rank: 'P')
t5 = Task.create(list: l1, user: u1, member: m1, title: 'test', content: 'test', priority: 1, rank: 'A')

# 20.times do
# 	Task.new(
# 		list: List.all.sample,
# 		user: User.all.sample,
# 		member: Member.all.sample,
# 		title: 'new task!',
# 		content: 'content...',
# 		priority: rand(1..5),
# 		start_date: (1..500).to_a.rand.days.ago,
# 		due_date: (1..500).to_a.rand.days.ago,
# 	)
# end
