"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const commandManager_1 = require("../../application/types/commandManager");
const types_1 = require("../../common/types");
const types_2 = require("../../viewers/types");
const registration_1 = require("../registration");
const types_3 = require("../types");
let GitCommitViewExplorerCommandHandler = class GitCommitViewExplorerCommandHandler {
    constructor(commandManager, commitViewerFactory) {
        this.commandManager = commandManager;
        this.commitViewerFactory = commitViewerFactory;
    }
    hideCommitView(_commit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commandManager.executeCommand('setContext', 'git.commit.view.show', false);
        });
    }
    showCommitView(_commit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commandManager.executeCommand('setContext', 'git.commit.view.show', true);
        });
    }
    showFilesView(_commit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.commitViewerFactory.getCommitViewer().showFilesView();
        });
    }
    showFolderView(_commit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.commitViewerFactory.getCommitViewer().showFolderView();
        });
    }
};
__decorate([
    registration_1.command('git.commit.view.hide', types_3.IGitCommitViewExplorerCommandHandler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CommitDetails]),
    __metadata("design:returntype", Promise)
], GitCommitViewExplorerCommandHandler.prototype, "hideCommitView", null);
__decorate([
    registration_1.command('git.commit.view.show', types_3.IGitCommitViewExplorerCommandHandler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CommitDetails]),
    __metadata("design:returntype", Promise)
], GitCommitViewExplorerCommandHandler.prototype, "showCommitView", null);
__decorate([
    registration_1.command('git.commit.view.showFilesOnly', types_3.IGitCommitViewExplorerCommandHandler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CommitDetails]),
    __metadata("design:returntype", Promise)
], GitCommitViewExplorerCommandHandler.prototype, "showFilesView", null);
__decorate([
    registration_1.command('git.commit.view.showFolderView', types_3.IGitCommitViewExplorerCommandHandler),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CommitDetails]),
    __metadata("design:returntype", Promise)
], GitCommitViewExplorerCommandHandler.prototype, "showFolderView", null);
GitCommitViewExplorerCommandHandler = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(commandManager_1.ICommandManager)),
    __param(1, inversify_1.inject(types_2.ICommitViewerFactory)),
    __metadata("design:paramtypes", [Object, Object])
], GitCommitViewExplorerCommandHandler);
exports.GitCommitViewExplorerCommandHandler = GitCommitViewExplorerCommandHandler;
//# sourceMappingURL=commitViewExplorer.js.map