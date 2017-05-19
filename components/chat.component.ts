import { Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Location} from '@angular/common';
import {Routes, RouterModule, Router} from '@angular/router';
import {SocketService} from '../sockets/socket.service';


@Component({
  moduleId: module.id,
  selector: 'atendimento',
  templateUrl: `atendimento.component.html`,
  providers: [SocketService]
})

export class ChatComponent implements OnInit{
  messageText:string;
  messages:Array<any>;
  chat:any;
  mensagem: any;
  constructor(private location: Location, private _socketService:SocketService, private chatService:AtendimentoService) { 

  }
    
  ngOnInit(){
    this.messages = new Array();
    this._socketService.on('message-received', (msg:any)=>{
      this.messages.push(msg);
      console.log("init 1", msg);
      console.log("init 2", this.messages);
    })  
  }

  sendMessage(){
    const message = {
      text:this.messageText,
      date:Date.now()
    }
    this.chat.mensagem.texto = message.text;
    this.chat.mensagem.data = message.date;
    this._socketService.emit('send-message', message);
    this.messageText = '';
  }
}
