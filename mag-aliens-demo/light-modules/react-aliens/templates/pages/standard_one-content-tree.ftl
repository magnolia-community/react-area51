<!doctype html>
<!-- IN THIS VERSION.
There is just one content tree that is always loaded, and everyone uses.
It gets subnodes and sub pages all in one tree.
-->
<html lang="en">
	<head>
		<title>Area51 Aliens</title>

		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="${ctx.contextPath}/.resources/react-aliens/webresources/favicon.ico">
		<link href="${ctx.contextPath}/.resources/react-aliens/webresources/static/css/bootstrap337.min.css" rel="stylesheet">

		<link rel="manifest" href="${ctx.contextPath}/.resources/react-aliens/webresources/manifest.json">
		<link href="${ctx.contextPath}/.resources/react-aliens/webresources/static/css/main.css" rel="stylesheet">

		[@cms.page /]

		<script>
			window.singlePageConfig = {
				templateDefinitions: ${model.getTemplateDefintionsOnOnePageJson(content["mgnl:template"])!},
				content: ${model.getContent_FullTreeFromTopAncestor(content["@path"])!}
				
			}
		</script>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>

		<div id="root"></div>
		${resfn.js("/react-aliens/webresources/static/js/main.*js")}
	
	
	</body>
</html>
