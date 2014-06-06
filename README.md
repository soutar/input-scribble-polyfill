input-scribble-polyfill
=======================

A JS implementation of &lt;input type="scribble"> from HTML 3, built for the sake of it during/after Bruce Lawson's talk on standards at Scotch on the Rocks 2014, Edinburgh

How to use
----------

### The input(s)

We're using a regular old hidden input here, using data-interact to denote our scribble behaviour. Using type="scribble" was my first approach, but having to manually hide the input is a bit of a pain.

	<input name="{input_name}" type="hidden" data-interact="scribble" src="{image_uri}" width="{height}" height="{width}">

**Required attributes**

- data-interact="scribble"
- src
- width
- height

### The script

	<!doctype html>
	<html>
	<head>...</head>
	<body>
	  ...

	  <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	  <script type="text/javascript" src="scribble.0.3.js"></script>
	</body>
	</html>


### Dependencies

- jQuery (tested on 1.11.0+)