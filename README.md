<!DOCTYPE html>
<html>

<head>
	<script type="text/javascript" src="karma.js"></script>
</head>

<body>
	<form action="interpretKarma()">
		<textarea name="karma-in" id="karma-in"></textarea>
		<input type="button" value="Submit" onclick="interpretKarma()"></input>
	</form>
	<p id="karma-out" style="white-space: pre;"></p>
</body>

</html>
