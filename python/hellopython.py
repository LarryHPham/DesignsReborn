import random
import sys
import os

grocery_list = ['Juice', 'Tomatoes', 'Potatoes', 'Bananas']

print('First Item', grocery_list[0])

grocery_list[0] = "Green Juice"
print('First Item', grocery_list[0])

print(grocery_list[1:3])

other_events = ['Wash Car', 'Pick Up Kids', 'Cash Check']

to_do_list = [other_events, grocery_list]
print(to_do_list)

print( (to_do_list[1][2]) )

grocery_list.append('Onions')
print(to_do_list)

grocery_list.insert(1, "Pickle")
grocery_list.remove("Pickle")

grocery_list.sort()

grocery_list.reverse()

del grocery_list[4]
print(to_do_list)

todo_lists2 = other_events + grocery_list

print(len(todo_lists2))
print(max(todo_lists2))
print(min(todo_lists2))
