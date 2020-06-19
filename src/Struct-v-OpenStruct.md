---
title: Struct v. OpenStruct v. Hash
---

## Definitions
Hashes are your basic key:value hash maps denoted by `{}` in ruby
Contrary to the name Structs and Openstructs are different things 
Taken from the [official docs](ruby-dock.org/core/ruby-struct):
"A Struct is a convenient way to bundle a number of attributes together, using accessor methods, without having to write an explicit class.. The Struct class generates new subclasses that hold a set of members and their values. For each member a reader and writer method is created similar to Module#attr_accessor."

Structs have the same implementation as classes so this:

```ruby
class Person < Struct.new(:firstname, :lastname)
end
```

Is the same thing as this:

```ruby
Person = Struct.new(:firstname, :lastname)
```

Taken from the [official docs](ruby-dock.org/core/ruby-struct):
"An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their accompanying values. This is accomplished by using Ruby's metaprogramming to define methods on the class itself."


## Performance
Structs are almost *twice* as fast as hashes in my benchmarks and OpenStructs are significantly slower than Hashes since it actually implements one internally

```ruby
require 'benchmark'

Benchmark.bm 10 do |bench|
  bench.report "Hash: " do
    50_000_000.times do { name: "John Smith", age: 45 } end
  end

  bench.report "Struct: " do
    klass = Struct.new(:name, :age)
    50_000_000.times do klass.new("John Smith", 45) end
  end

end

#                user     system      total        real
# Hash:        23.260000   0.090000  23.350000 ( 23.373496)
# Struct:       8.380000   0.010000   8.390000 (  8.411647)
#
```

## Usages
I personally use Structs whenever I notice that I am collecting data in a Hash that represents something.
For instance:

```ruby 
array_of_messages = []
data.map do |x|
  { text: 'text', attachments: 'attachment' }
end
```

This looks fine, but compare it to this:

```ruby
Message = Struct.new(:text, :attachments)

array_of_messages = []
data.map do |x|
  Message.new('text', 'attachment')
end
```
I prefer this implementation to the former as it's both faster and clearer.
It also holds the benefit of being able to identify what it is that we are passing around elsewhere in the code

```ruby 
array_of_messages.first.class
#=> Message
```

I love having this ability to keep track of my data without relying on variable names and there's some magic you can do as well

```ruby
def message(data) # Lets say that this is nil
  if data
    Message.new(data)
  else
    Message.new(nil)
  end
end
```

See what we did there? We used a Struct with canned data to ensure that whenever this method is called it will _never_ return nil instead it will return an object of the type that we want just with nil values for its attributes. Using this method is a great way to prevent the dreaded "undefined method 'name' for nil Nil:class" because the canned object still has all of the methods that we expect so we can safely do things like 
```
if message(data).text
  puts texts
else
  puts "nothing to see here"
end
```
without worrying about causing an undefined method runtime error.

Structs have a great many uses and if you come from a C-like language you're most likely familiar with their uses. Being able to create more readable code is a great benefit. The fact that it's fast is a bonus! 
