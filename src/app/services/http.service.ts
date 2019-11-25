import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
  
    constructor(private http: HttpClient){ }
      
    getMain() {
        return this.http.get('http://honor-webapp-server.std-763.ist.mospolytech.ru/getMain').toPromise();
    }

    getPostById(id) {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getPost?id=${id}`).toPromise();
    }

    getAlbums() {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getAlbums`).toPromise();
    }

    getAlbumById(id) {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getAlbum?id=${id}`).toPromise();
    }

    getNews() {
        return this.http.get('http://honor-webapp-server.std-763.ist.mospolytech.ru/getAllNews').toPromise();
    }

    getNewsById(id) {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getNews?id=${id}`).toPromise();
    }

    getRally() {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getActions/Rallies`).toPromise();
    }

    getEvents() {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getActions/Events`).toPromise();
    }

    getEventById(id) {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getAction?id=${id}`).toPromise();
    }

    getAwardById(id) {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getOrden?id=${id}`).toPromise();
    }

    getAwards() {
        return this.http.get(`http://honor-webapp-server.std-763.ist.mospolytech.ru/getOrdens`).toPromise();
    }

    postGalleryComment(comment:any,commentId:number){
        return this.http.post(`http://honor-webapp-server.std-763.ist.mospolytech.ru/addComment/${commentId}`,comment,{responseType:"text"}).toPromise();
    }

    // postRallyComment(comment:any,commentId:number){
    //     return this.http.post(`http://honor-webapp-server.std-763.ist.mospolytech.ru/addComment/${commentId}`,comment,{responseType:"text"}).toPromise();
    // }

}
