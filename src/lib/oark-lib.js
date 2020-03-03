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
    static dateToFr(dateEn){
        let d=dateEn.split('-')
        return d[2]+'-'+d[1]+'-'+d[0]
    }

    static dateFrLettre(dateEn){
        let d=this.dateToFr(dateEn).split('-')
        return d[0]+' '+this.getMoisLettre(parseInt(d[1]))+' '+d[2]
    }
    static getMoisLettre(mois){
        switch(mois){
            case 1 : return 'Janvier'
            case 2 : return 'Fevrier'
            case 3 : return 'Mars'
            case 4 : return 'Avril'
            case 5 : return 'Mai'
            case 6 : return 'Juin'
            case 7 : return 'Juillet'
            case 8 : return 'Aout'
            case 9 : return 'Septembre'
            case 10 : return 'Octobre'
            case 11 : return 'Novembre'
            case 12 : return 'Decembre'
        }
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

    static  villes=[
        { key: 'Ambatondrazaka', text: 'Ambatondrazaka', value: 'Ambatondrazaka' },
        { key: 'Antananarivo', text: 'Antananarivo', value: 'Antananarivo' },
        { key: 'Moramanga', text: 'Moramanga', value: 'Moramanga' },
        { key: 'Toamasina', text: 'Toamasina', value: 'Toamasina' },
        { key: 'Fianarantsoa', text: 'Fianarantsoa', value: 'Fianarantsoa' },
        { key: 'Farafangana', text: 'Farafangana', value: 'Farafangana' },
        { key: 'Mahajanga', text: 'Mahajanga', value: 'Mahajanga' },
        { key: 'Antsiranana', text: 'Antsiranana', value: 'Antsiranana' },
        { key: 'Fandriana', text: 'Fandriana', value: 'Fandriana' },
      ] ;
}