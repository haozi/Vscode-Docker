"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const parser_1 = require("./parser");
const utils_1 = require("./utils");
const MAX_DECORATORS = 500;
const DEBOUNCE_TIME = 400;
let decorationType = {
    before: {
        contentText: ' ',
        border: 'solid 0.1em #000',
        margin: '0.1em 0.2em 0 0.2em',
        width: '0.8em',
        height: '0.8em'
    },
    dark: {
        before: {
            border: 'solid 0.1em #eee'
        }
    }
};
function extractColorsFromExpression(node) {
    let result = [];
    if (node.nodeName === 'expression') {
        node.nodes.forEach(valNode => {
            if (parser_1.isColor(valNode)) {
                result.push(valNode);
            }
            else if (valNode.nodeName === 'object') {
                Object.keys(valNode.vals).forEach(subValNode => {
                    result = result.concat(extractColorsFromExpression(valNode.vals[subValNode]));
                });
            }
        });
    }
    return result;
}
exports.extractColorsFromExpression = extractColorsFromExpression;
function getColors(ast) {
    return (ast.nodes || ast || []).reduce((acc, node) => {
        if (node.nodeName === 'ident') {
            acc = acc.concat(extractColorsFromExpression(node.val));
        }
        if (node.nodeName === 'property' && node.expr) {
            acc = acc.concat(extractColorsFromExpression(node.expr));
        }
        return acc;
    }, []);
}
exports.getColors = getColors;
exports.buildCallValueFromArgs = args => args.nodes.map(node => node.nodes[0].val).join(', ');
exports.getRealColumn = (textToSearch, text, lineno) => Math.max(text[lineno].indexOf(textToSearch), 0);
function normalizeColors(colors, text) {
    return colors.map(color => {
        const normalized = { column: 0, lineno: color.lineno - 1, background: 'transparent' };
        if (color.nodeName === 'ident') {
            normalized.background = color.name;
            normalized.column = exports.getRealColumn(color.name, text, normalized.lineno);
        }
        if (color.nodeName === 'rgba') {
            normalized.column = exports.getRealColumn(color.raw, text, normalized.lineno);
            normalized.background = color.raw;
        }
        if (color.nodeName === 'call') {
            normalized.column = exports.getRealColumn(color.name, text, normalized.lineno);
            normalized.background = `${color.name}(${exports.buildCallValueFromArgs(color.args)})`;
        }
        return normalized;
    });
}
exports.normalizeColors = normalizeColors;
function updateDecorators(colorsDecorationType, editor) {
    const document = editor.document.getText();
    const ast = parser_1.flattenAndFilterAst(parser_1.buildAst(document));
    const colors = normalizeColors(getColors(ast), document.split('\n'));
    const decorations = colors.map(color => {
        const pos = new vscode_1.Position(color.lineno, color.column);
        return {
            range: new vscode_1.Range(pos, pos),
            renderOptions: {
                before: { backgroundColor: color.background }
            }
        };
    }).slice(0, MAX_DECORATORS);
    editor.setDecorations(colorsDecorationType, decorations);
}
exports.updateDecorators = updateDecorators;
exports.findEditorByDocument = document => vscode_1.window.visibleTextEditors.find(editor => editor.document.uri.toString() === document.uri.toString());
exports.updateDecoratorsWrapper = (colorsDecorationType, editor) => updateDecorators(colorsDecorationType, editor);
exports.updateDecoratorsWrapperDebounced = utils_1.debounce(exports.updateDecoratorsWrapper, DEBOUNCE_TIME);
function activateColorDecorations() {
    const disposables = [];
    const colorsDecorationType = vscode_1.window.createTextEditorDecorationType(decorationType);
    disposables.push(colorsDecorationType);
    vscode_1.window.visibleTextEditors.forEach(editor => {
        if (!editor || !editor.document)
            return;
        exports.updateDecoratorsWrapper(colorsDecorationType, editor);
    });
    vscode_1.window.onDidChangeActiveTextEditor(editor => {
        if (!editor || !editor.document)
            return;
        exports.updateDecoratorsWrapperDebounced(colorsDecorationType, editor);
    });
    vscode_1.workspace.onDidChangeTextDocument(evt => {
        if (!evt.document)
            return;
        const editor = exports.findEditorByDocument(evt.document);
        if (!editor)
            return;
        exports.updateDecoratorsWrapperDebounced(colorsDecorationType, editor);
    });
    vscode_1.workspace.onDidOpenTextDocument(document => {
        if (!document)
            return;
        const editor = exports.findEditorByDocument(document);
        if (!editor)
            return;
        exports.updateDecoratorsWrapperDebounced(colorsDecorationType, editor);
    });
    vscode_1.window.onDidChangeVisibleTextEditors(editors => {
        editors.forEach(editor => {
            if (!editor.document)
                return;
            exports.updateDecoratorsWrapperDebounced(colorsDecorationType, editor);
        });
    });
    return vscode_1.Disposable.from(...disposables);
}
exports.activateColorDecorations = activateColorDecorations;
//# sourceMappingURL=color-decorators.js.map