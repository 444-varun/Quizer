import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private payload: any;

  setPayload(payload:any){
   this.payload=payload;
  }
  getPayload():any{
   return this.payload;
  }
  
  getUserRole():string{
   return this.payload?.role||'';
  }

  isAdmin():boolean{
    return this.getUserRole()==="ROLE_ADMIN";
  }

  isUser():boolean{
    return this.getUserRole()==="ROLE_USER";
  }

}
 