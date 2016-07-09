---

layout: default
title: Convert multiple .xls files to .csv
tags: 
- general 
- guide
group: general

---

# Convert multiple `.xls` files to `.csv`

Here's a Ruby script to batch convert Microsoft Excel files to comma separated values format. 

## usage

`cd` to the directory with the `.xls` files in it

`irb`, then paste in the script below

## xls-to-csv.rb

    #!/usr/bin/env ruby
    require 'rubygems'
    require 'roo'
     
    pwd       = File.dirname(__FILE__)
     
    Dir.glob("#{pwd}/*.xls") do |file|
      file_path = "#{pwd}/#{file}"  
      file_basename = File.basename(file, ".xls")  
      xls = Roo::Excel.new(file_path)
      xls.to_csv("#{pwd}/#{file_basename}.csv")
    end