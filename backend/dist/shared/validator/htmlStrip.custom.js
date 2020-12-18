"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeHtml = require("sanitize-html");
// export default (joi ) => {
function htmlStrip(joi) {
    return {
        name: 'string',
        base: joi.string(),
        language: {
            htmlStrip: 'content invalid',
        },
        rules: [{
                name: 'htmlStrip',
                validate(params, value, state, options) {
                    const clean = sanitizeHtml(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (clean) {
                        return clean;
                    }
                    return this.createError('string.htmlStrip', { value }, state, options);
                },
            }],
    };
}
exports.htmlStrip = htmlStrip;
//# sourceMappingURL=htmlStrip.custom.js.map