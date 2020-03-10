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
        return this.graph.watchQuery({query: gql`${query}`}).valueChanges
    }

    get(query) {
        return this.graph.watchQuery({query: gql`${query}`}).valueChanges.toPromise();
    }

}
