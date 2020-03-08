import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
    
    private baseURL:string="http://database.ensler.ru/public";
    
    constructor(private http: HttpClient, private graph: Apollo){ }

    getAlbums() {
        return this.http.get(`${this.baseURL}/get/all/albums/1`).toPromise();
    }

    getAlbumById(id) {
        return this.http.get(`${this.baseURL}/get/album?id=${id}`).toPromise();
    }

    getAwardById(id) {
        return this.http.get(`${this.baseURL}/get/orden?id=${id}`).toPromise();
    }

    getAwards() {
        return this.http.get(`${this.baseURL}/get/all/ordens`).toPromise();
    }

    getLasts(query){
        return this.graph.watchQuery({query: gql`${query}`}).valueChanges
    }

    getLastPhotos(){
        return this.http.get<any>(`${this.baseURL}/get/last/photos`).toPromise();
    }
    postGalleryComment(comment:any,commentId:number){
        return this.http.post(`${this.baseURL}/add/comment/${commentId}`,comment,{responseType:"text"}).toPromise();
    }

    getAll(query) {
        // return this.http.get(this.baseURL+`/get/all/posts/1?count=${count}`).toPromise();
        return this.graph.watchQuery({query: gql`${query}`}).valueChanges
    }

    // postRallyComment(comment:any,commentId:number){
    //     return this.http.post(`http://honor-webapp-server.std-763.ist.mospolytech.ru/addComment/${commentId}`,comment,{responseType:"text"}).toPromise();
    // }

}
