import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
    private baseURL:string="http://honor-webapp-server.std-763.ist.mospolytech.ru/public";
    // private baseURL:string="http://localhost:8082/public"
    constructor(private http: HttpClient){ }
      
    getMain() {
        return this.http.get(this.baseURL+'/get/all/posts/1').toPromise();
    }

    getPostById(id) {
        return this.http.get(`${this.baseURL}/get/post?id=${id}`).toPromise();
    }

    getAlbums() {
        return this.http.get(`${this.baseURL}/get/all/albums/1`).toPromise();
    }

    getAlbumById(id) {
        return this.http.get(`${this.baseURL}/get/album?id=${id}`).toPromise();
    }

    getNews() {
        return this.http.get(`${this.baseURL}/get/all/news/1`).toPromise();
    }

    getNewsById(id) {
        return this.http.get(`${this.baseURL}/get/news?id=${id}`).toPromise();
    }

    getRally() {
        return this.http.get(`${this.baseURL}/get/actions/rallies/1`).toPromise();
    }

    getEvents() {
        return this.http.get(`${this.baseURL}/get/actions/events/1`).toPromise();
    }

    getEventById(id) {
        return this.http.get(`${this.baseURL}/get/action?id=${id}`).toPromise();
    }

    getAwardById(id) {
        return this.http.get(`${this.baseURL}/get/orden?id=${id}`).toPromise();
    }

    getAwards() {
        return this.http.get(`${this.baseURL}/get/all/ordens/1`).toPromise();
    }

    getLasts(){
        return this.http.get<any>(`${this.baseURL}/get/last/all`).toPromise();
    }
    getLastPhotos(){
        return this.http.get<any>(`${this.baseURL}/get/last/photos`).toPromise();
    }
    postGalleryComment(comment:any,commentId:number){
        return this.http.post(`${this.baseURL}/add/comment/${commentId}`,comment,{responseType:"text"}).toPromise();
    }

    // postRallyComment(comment:any,commentId:number){
    //     return this.http.post(`http://honor-webapp-server.std-763.ist.mospolytech.ru/addComment/${commentId}`,comment,{responseType:"text"}).toPromise();
    // }

}
