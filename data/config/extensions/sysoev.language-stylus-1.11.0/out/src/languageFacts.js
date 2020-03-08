"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/** Adopted from https://github.com/Microsoft/vscode-css-languageservice/blob/b3ff936/src/services/languageFacts.ts */
function getEntryStatus(status) {
    switch (status) {
        case 'e':
            return '⚠️ Property is experimental. Be cautious when using it.️\n\n';
        case 'n':
            return '🚨️ Property is nonstandard. Avoid using it.\n\n';
        case 'o':
            return '🚨️️️ Property is obsolete. Avoid using it.\n\n';
        default:
            return '';
    }
}
function getBrowserLabel(b) {
    let result = '';
    if (!b || b.all || b.count === 0) {
        return null;
    }
    for (let curr in exports.browserNames) {
        if (typeof b[curr] === 'string') {
            if (result.length > 0) {
                result = result + ', ';
            }
            result = result + exports.browserNames[curr];
            let version = b[curr];
            if (version.length > 0) {
                result = result + ' ' + version;
            }
        }
    }
    return result;
}
function getPropertyDescription(property) {
    if (!property.desc || property.desc === '') {
        return null;
    }
    let desc = '';
    if (property.status) {
        desc += getEntryStatus(property.status);
    }
    desc += property.desc;
    let browserLabel = getBrowserLabel(property.browsers);
    if (browserLabel) {
        desc += '\n(' + browserLabel + ')';
    }
    if (property.syntax) {
        desc += `\n\nSyntax: ${property.syntax}`;
    }
    return desc;
}
exports.getPropertyDescription = getPropertyDescription;
exports.browserNames = {
    E: 'Edge',
    FF: 'Firefox',
    S: 'Safari',
    C: 'Chrome',
    IE: 'IE',
    O: 'Opera'
};
//# sourceMappingURL=languageFacts.js.map