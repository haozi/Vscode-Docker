"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const vscode_1 = require("vscode");
let WorkspaceService = class WorkspaceService {
    get onDidChangeConfiguration() {
        return vscode_1.workspace.onDidChangeConfiguration;
    }
    get workspaceFolders() {
        return vscode_1.workspace.workspaceFolders;
    }
    get onDidChangeWorkspaceFolders() {
        return vscode_1.workspace.onDidChangeWorkspaceFolders;
    }
    getConfiguration(section, resource) {
        return vscode_1.workspace.getConfiguration(section, resource);
    }
    asRelativePath(pathOrUri, includeWorkspaceFolder) {
        return vscode_1.workspace.asRelativePath(pathOrUri, includeWorkspaceFolder);
    }
    createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        return vscode_1.workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents);
    }
    findFiles(include, exclude, maxResults, token) {
        return vscode_1.workspace.findFiles(include, exclude, maxResults, token);
    }
};
WorkspaceService = __decorate([
    inversify_1.injectable()
], WorkspaceService);
exports.WorkspaceService = WorkspaceService;
//# sourceMappingURL=workspace.js.map