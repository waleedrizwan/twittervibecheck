import re

# t = 'shak # spea # e'
# d = '#'
# print([pos for pos, char in enumerate(t) if char == d])

print([m.start() for m in re.finditer('fuck', 'test fuck test fuck test test fuck')])

# keys = ['a', 'b', 'c']
# values = [1, 2, 3]
# dictionary = dict(zip(keys, values))
# print(dictionary) # {'a': 1, 'b': 2, 'c': 3}


# code snippet to detect any urls in a piece of string
# import re
# myString = "This is my tweet check it out http://example.com/blah"
# print(re.search("(?P<url>https?://[^\s]+)", myString).group("url"))