import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
    // private url:string="http://server.veteran-chest.ru";
    private url:string="http://localhost:8080";//dev
    private baseURL:string=`${this.url}`;//prod
    
    constructor(private http: HttpClient, private graph: Apollo){ }

    //new api
    getGrid(){
        return this.http.get(`${this.baseURL}/post/grid`).toPromise();
    }
    getPostsByType(page,itemsPerPage,type){
        return this.http.get(`${this.baseURL}/post?page=${page}&itemsPerPage=${itemsPerPage}&type=${type}`).toPromise();
    }
    getPostById(id){
        return this.http.get(`${this.baseURL}/post/${id}`).toPromise();
    }
    newComment(data){
        return this.http.post(`${this.baseURL}/post/comments`,data).toPromise();
    }
    getGallery(page,itemsPerPage){
        return this.http.get(`${this.baseURL}/gallery?page=${page}&itemsPerPage=${itemsPerPage}`).toPromise();
    }
    getFullAlbum(id){
        return this.http.get(`${this.baseURL}/gallery/${id}`).toPromise();
    }
    getOrdens(page,itemsPerPage){
        return this.http.get(`${this.baseURL}/ordens?page=${page}&itemsPerPage=${itemsPerPage}`).toPromise();
    }
    getOrdenById(id){
        return this.http.get(`${this.baseURL}/ordens/${id}`).toPromise();
    }

    //old api
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

    public postComment(type:string,comment:any,commentId:number){
        return this.http.post(`${this.baseURL}/add/comment/${type}/${commentId}`,comment,{responseType:"text"}).toPromise();
    }

    getAll(query) {
        return this.graph.query({query: gql`${query}`});
    }

    get(query) {
        return this.graph.watchQuery({query: gql`${query}`}).valueChanges.toPromise();
    }

}
