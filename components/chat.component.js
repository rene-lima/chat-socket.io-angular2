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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var socket_service_1 = require("../sockets/socket.service");
var atendimento_service_1 = require("../services/atendimento.service");
var AtendimentoComponent = (function () {
    function AtendimentoComponent(location, _socketService, chatService) {
        this.location = location;
        this._socketService = _socketService;
        this.chatService = chatService;
    }
    AtendimentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messages = new Array();
        this._socketService.on('message-received', function (msg) {
            _this.messages.push(msg);
            console.log("init 1", msg);
            console.log("init 2", _this.messages);
        });
    };
    AtendimentoComponent.prototype.sendMessage = function () {
        var message = {
            text: this.messageText,
            date: Date.now()
        };
        this.chat.mensagem.texto = message.text;
        this.chat.mensagem.data = message.date;
        this._socketService.emit('send-message', message);
        this.messageText = '';
        this.salvarMensagem();
    };
    AtendimentoComponent.prototype.salvarMensagem = function () {
        this.chat.id = Math.floor((Math.random() * 100));
        console.log("mensagem", this.chat);
        this.chatService.atualizaChat(this.chat)
            .subscribe(function (res) { console.log("propostas realizadas (subscribe)"); }, function (error) { return console.log(error); });
    };
    /**
    * voltar - volta uma página
    */
    AtendimentoComponent.prototype.voltar = function () {
        this.location.back();
    };
    return AtendimentoComponent;
}());
AtendimentoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'atendimento',
        templateUrl: "atendimento.component.html",
        providers: [socket_service_1.SocketService, atendimento_service_1.AtendimentoService]
    }),
    __metadata("design:paramtypes", [common_1.Location, socket_service_1.SocketService, atendimento_service_1.AtendimentoService])
], AtendimentoComponent);
exports.AtendimentoComponent = AtendimentoComponent;
//# sourceMappingURL=atendimento.component.js.map