import ComponentHelper from "./ComponentHelperDeliveryV2";

/**
 * Magnolia context service.
 */
function MagnoliaContextService(context) {
  this.context = context;
  if (!context) {
    //All usages of the service need to pass in the context.
    console.log("MagnoliaContextService needs valid 'context'.");
  }
}

/**
 * Return the area definition from a specific template by name.
 * Works for page and component templates. Helps supporting nested areas.
 *
 * @param templateId The id of the template in the templateDefinitions configuration.
 * @param cmsAreaName The name of the area
 */
MagnoliaContextService.prototype.getAreaDefinitionFromTemplate = function(
  templateId,
  cmsAreaName
) {
  if (!this.context.templateDefinitions) {
    return null;
  }

  let definition = this.context.templateDefinitions[templateId];
  if (!definition) {
    return null;
  }

  let area = definition.areas[cmsAreaName];
  return area;
};

/**
 * Returns the current Magnolia JCR node path.
 */
MagnoliaContextService.prototype.getCurrentNode = function() {
  return this.context.content["@path"];
};

/**
 * Return the components (actual content) of an area.
 *
 * @param cmsAreaName The name of the area
 * @param pathInPage The 'path' to the content item 'in the tree' below the CmsRootPath (the mapping point between the app and the cms.).
 */
MagnoliaContextService.prototype.getAreaComponents = function(
  cmsAreaName,
  pathInPage
) {
  var results = [];
  if (!this.context.content) {
    return results;
  }

  var content = this.context.content;

  if (content && typeof content !== "undefined") {
    var location = pathInPage.split("/").slice(1);
    location.push(cmsAreaName);
    dlog("getAreaComponents: location:" + JSON.stringify(location, null, 2));

    // Get ONLY the content of the current area by diving into the full content tree.
    var areaContent = _getNestedObject(content, location);
    if (!areaContent) {
      return;
    }

    // Get components from the content node.
    var comoponentHelper = new ComponentHelper();
    var components = comoponentHelper.getComponentsFromNode(areaContent);

    //If in editing mode - add the TemplateDefinitions to the components.
    var results = [];
    components.map(component => {
      // Get the templateDefinition in order to get the dialog for the editor hints.
      if (this.isEditionMode()) {
        //Gets the template
        var templateId = component["mgnl:template"];
        var template = this.getTemplate(templateId);
        component.templateDefinition = template;
        //dlog("CTX: def:" + templateId)
        //dlog("CTX: temp:" + JSON.stringify(template,null,2))
      }
      results.push(component);
      return null;
    });
  }
  return results;
};

/**
 * Get a subObject from an object by means of an array of nodes to go into.
 * @param {*} parentObj
 * @param {*} pathArr Array of nodes to go into.
 */
const _getNestedObject = (parentObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    parentObj
  );
};

/**
 * Return the actual content of a page.
 * (Similar to getAreaComponents)
 * ASSUMPTION: Current model is that the content object always has the current page at the top.
 */
MagnoliaContextService.prototype.getPage = function() {
  return this.context.content;
};

/**
 * Return the template definition. can be a page or component template.
 *
 * @param templateId The id of the template
 */
MagnoliaContextService.prototype.getTemplate = function(templateId) {
  if (this.context.templateDefinitions) {
    return this.context.templateDefinitions[templateId];
  } else {
    return null;
  }
};

/**
 * Return whether the page is in edition mode
 */
MagnoliaContextService.prototype.isEditionMode = function() {
  if (!this.context) {
    return false;
  } else {
    return typeof this.context.templateDefinitions !== "undefined";
  }
};

function dlog(message) {
  if (process.env.REACT_APP_LOG_LEVEL > 0) {
    console.log(message);
  }
}

export default MagnoliaContextService;
