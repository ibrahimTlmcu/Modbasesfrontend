import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { WebSocketService } from '../services/web-socket.service';
import { AuthService } from '../services/auth.service';
import { UploadService } from '../services/upload.service';
import { ChatMessage, MessageType } from '../models/ChatMessage';
import { RatingComponent } from '../rating/rating.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-chat-room',
    standalone: true,
    imports: [CommonModule, FormsModule, RatingComponent, ButtonModule],
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
    roomId!: string;
    username!: string;
    message = '';
    messages: ChatMessage[] = [];
    connecting = true;

    public aiEnabled = true;
    public MessageType = MessageType;
    public showRating = false;
    public expertName = '';

    private aiResponseCount = 0;
    private routeSub?: Subscription;
    private historySub?: Subscription;

    public isRequester = false;
    public alreadyRated = false;
    public canRate = false;

    private avatarColors = ['#2196F3','#32c787','#00BCD4','#ff5652','#ffc107','#ff85af','#FF9800','#39bbb0'];

    constructor(
        private route: ActivatedRoute,
        private ws: WebSocketService,
        private auth: AuthService,
        public router: Router,
        private ngZone: NgZone,
        private http: HttpClient,
        private upload: UploadService
    ) {}

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe((pm) => {
            const nextRoomId = pm.get('roomId')!;
            const name = this.auth.getUsernameValue();
            if (!name) { this.router.navigate(['/login']); return; }

            if (this.roomId && this.roomId !== nextRoomId) {
                this.ws.disconnect(this.roomId, this.username, false);
                this.resetUiState();
            }

            this.roomId = nextRoomId;
            this.username = name;

            this.http.get<any>(`http://localhost:8081/api/rooms/${this.roomId}`).subscribe({
                next: (room) => {
                    if (room?.status === 'CLOSED') {
                        Swal.fire({ icon:'error', title:'Oda Kapandı',
                            text:'Geçmiş sohbetlere Ana Ekrandan erişebilirsiniz.',
                            confirmButtonText:'Tamam', allowOutsideClick:false })
                            .then(()=> this.router.navigate(['/dashboard']));
                    }

                    if (typeof room?.aiEnabled === 'boolean') this.aiEnabled = room.aiEnabled;
                    this.isRequester = room?.createdBy === this.username;

                    this.historySub?.unsubscribe();
                    this.historySub = this.ws.getHistory(this.roomId).subscribe((history)=>{
                        this.messages = [...(history ?? [])];

                        this.http.get<{exists:boolean}>(`http://localhost:8081/api/ratings/rooms/${this.roomId}/exists`)
                            .subscribe(res=>{ this.alreadyRated=!!res?.exists; this.updateCanRateFlag(); },
                                ()=>{ this.alreadyRated=false; this.updateCanRateFlag(); });

                        this.ws.connect(this.username,this.roomId,(msg:ChatMessage)=>{
                            this.ngZone.run(()=>{
                                if (msg.sender==='AI-Bot' && !this.aiEnabled) return;
                                this.messages.push(msg);
                                this.connecting=false;
                                if (msg.type===MessageType.JOIN && msg.sender!==this.username)
                                    this.expertName = msg.sender;
                                if (msg.sender==='AI-Bot'){ this.aiResponseCount++; }
                            });
                        });
                    });
                },
                error: ()=> this.router.navigate(['/dashboard'])
            });
        });
    }

    private updateCanRateFlag(){ this.canRate = this.isRequester && !this.alreadyRated; }

    send(): void {
        if (!this.message.trim()) return;
        const m: ChatMessage = { type:MessageType.CHAT, sender:this.username, content:this.message, roomId:this.roomId };
        this.ws.sendMessage(m); this.message='';
    }

    respondSupport(answer:'Evet'|'Hayır'){
        this.messages=this.messages.filter(m=>m.type!==MessageType.SUPPORT_OFFER);
        this.ws.sendMessage({ type:MessageType.SUPPORT_RESPONSE, sender:this.username, content:answer, roomId:this.roomId });
    }

    onExitClick(): void {
        const shouldCloseRoom = this.isRequester;
        this.showRating = shouldCloseRoom && this.canRate;
        this.aiEnabled=false;
        this.ws.disconnect(this.roomId,this.username,shouldCloseRoom);
        if (!shouldCloseRoom || !this.showRating) this.router.navigate(['/dashboard']);
    }

    ngOnDestroy(): void {
        try{ this.ws.disconnect(this.roomId,this.username,false); }catch{}
        this.routeSub?.unsubscribe(); this.historySub?.unsubscribe();
    }

    openInNew(url:string){ window.open(url,'_blank','noopener'); }

    onFileSelected(evt:Event){
        const input = evt.target as HTMLInputElement;
        if (!input.files?.length) return;
        const file = input.files[0];
        this.upload.upload(this.roomId,file).subscribe({
            next: (res:any)=>{
                const type = res.image?MessageType.IMAGE:MessageType.FILE;
                const m:ChatMessage={type,sender:this.username,content:res.url,roomId:this.roomId,
                    fileName:res.fileName,contentType:res.contentType};
                this.ws.sendMessage(m);
            },
            error:()=> Swal.fire('Hata','Dosya yüklenemedi','error')
        });
        input.value='';
    }

    getAvatarColor(sender:string):string{
        let hash=0; for(const c of sender) hash=(hash*31+c.charCodeAt(0))&0xffffffff;
        return this.avatarColors[Math.abs(hash)%this.avatarColors.length];
    }

    private resetUiState(){
        this.messages=[]; this.expertName=''; this.connecting=true; this.aiEnabled=true;
        this.showRating=false; this.aiResponseCount=0; this.isRequester=false;
        this.alreadyRated=false; this.canRate=false;
    }

    rateMessage(m:ChatMessage,liked:boolean){
        if (!m || m.id==null) return;
        this.http.post<ChatMessage>(`http://localhost:8081/api/chat/messages/${m.id}/reaction`,{liked})
            .subscribe({ next:(u)=> m.liked=u?.liked??liked,
                error:()=> Swal.fire('Hata','Puan kaydedilemedi','error') });
    }
}
