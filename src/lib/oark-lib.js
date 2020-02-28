import React from 'react';
Array.prototype.remove=function(){
    var what, a=arguments, L=a.length, ax ;
    while(L && this.length){
        what=a[--L]
        while((ax=this.indexOf(what))!==-1){
            this.splice(ax,1)
        }
    }
    return this
}

export class Conversion{
    static dateToEn(dateFr){
        let d=dateFr.split('-')
        return d[2]+'-'+d[1]+'-'+d[0]
    }
}

export class Dictionnaire{
    static getPersonne(cin){
        let url="http://localhost:9095/records/citoyen/"+cin
        fetch(url,{
        method:'GET',
        headers:{
            "content-type":"application/json"
        }
        }).then(async(response)=>{
            let data=await response.json()
            return data
        })
        return {}
    }
}