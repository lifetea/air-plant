"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.assetHandlers=exports.configs=exports.unload=exports.load=void 0;const load=function(){console.debug("cocos-build-template load")};exports.load=load;const unload=function(){console.debug("cocos-build-template unload")};exports.unload=unload,exports.configs={"*":{hooks:"./hooks",options:{remoteAddress:{label:"i18n:cocos-build-template.options.remoteAddress",render:{ui:"ui-input",attributes:{placeholder:"Enter remote address..."}},verifyRules:["required"]},enterCocos:{label:"i18n:cocos-build-template.options.enterCocos",description:"i18n:cocos-build-template.options.enterCocos",default:"",render:{ui:"ui-input",attributes:{placeholder:"i18n:cocos-build-template.options.enterCocos"}},verifyRules:["ruleTest"]}},verifyRuleMap:{ruleTest:{message:"i18n:cocos-build-template.ruleTest_msg",func:(e,o)=>"cocos"===e}}}},exports.assetHandlers="./asset-handlers";