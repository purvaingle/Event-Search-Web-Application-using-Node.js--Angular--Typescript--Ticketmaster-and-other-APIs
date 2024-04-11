import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event.service'
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Table } from './tableofevents';
import { MatTabsModule } from '@angular/material/tabs';
import { EventCard } from 'src/app/eventCard';
import { Spotify } from '../spotify';
import { Venue } from '../venue';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GoogleMapsModule } from '@angular/google-maps'
import { CarouselComponent } from 'src/app/carousel/carousel.component';
import { NgIf } from '@angular/common';


// import { Suggest } from '../suggestion';
declare var window:any;


@Component({
  // selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  gmModal:any;
  showTable=false;
  submitedForm=false;
  fav_toggle=false;
  total=0;
  progressColor='red';
  ischecked=false;

  fav_name=''
       f_genres='';
       f_time='';
       f_date='';
       f_venue='';

       favevent={
        id:'',
    date:'',
    fav_name:'',
    fav_venue:'',
    fav_gen:'',
      };
  
  
  options={}
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  showMore1 = false;
  showMore2 = false;
  showMore3 = false;
  disabledipbox="";
  marker={position:{lat:0,lng:0}};
  opengmp=false;
  f:Spotify[]=[];

  f_name=0;
  f_add=0;
  f_phone=0;
  f_oh=0;
  f_gr=0;
  f_cr=0;
  gm_lat!:string;
  gm_lng!:string;

  keyw!: string;
  sugg!: string[];

  // sugg:any;
  // keyw:string='';

  
//  marker1 = {
//     position: { lat: 38.9987208, lng: -77.2538699 },
//  }
display = "none";
  lat='';
  lng='';
  data='';
  result='';
  resp2='';
  venres='';
  selectedRow=false;
  table: Table[]=[];
  ec:EventCard[]=[];
  spot:Spotify[]=[];
  ven:Venue[]=[];
  check=0;
  music=true;
  disableip:boolean=false;
  // sug:Suggest[]=[];
  
  eventID:string='';
  item:any;
  datetime:string='';

  myForm = this.fb.group({
  key:['',Validators.required],
  dist:10,
  categ:"Default",
  loc:['',Validators.required]
  
  
  });



  constructor(private http: HttpClient, private fb: FormBuilder){
  

  }

  ngOnInit(){
    this.gmModal=new window.bootstrap.Modal(document.getElementById('gmaps'))
    
  }

  back(){
    this.selectedRow=false;
  }

  showGmaps(){
    this.display="block";
  }

  closeGmaps(){
    this.display="none";
  }

  
  
    
  detloc(e:any){
    if(e.target.checked){
      this.myForm.controls['loc'].reset();

      this.myForm.controls['loc'].disable();

      
    
    console.log("inside detloc()");
    fetch("https://ipinfo.io/json?token=1601cde681c5d6")
    .then(response => response.json())
    .then(jsonResponse => {
    const ip_latlong=jsonResponse.loc; 
    var locArr = ip_latlong.split(',');
    console.log(locArr[0], locArr[1])
    this.lat=locArr[0]
    this.lng=locArr[1]
    console.log("using ipinfo");
    console.log(this.lat,this.lng)

    this.disableip = true;
    this.disabledipbox="disabledTextInput";
    this.check=1;
    
  
  })}
else{
  this.disableip = false;
  this.myForm.controls['loc'].enable();
  this.disabledipbox="";
  this.check=0;
}}

  // findloc(address:string){
  //   const geocodeUrl = 
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsUT6mL4V3D2SQDX5ltEWbuh2C5g0pph4`;
        
  //       fetch(geocodeUrl)
  //       .then(response => response.json())
  //       .then(data => {
  //       this.lat = data.results[0].geometry.location.lat;
  //       this.lng = data.results[0].geometry.location.lng;
  //       console.log("ip loc box");
  //       console.log(this.lat,this.lng);
  // })} 


 
  
    

  onclickList(s:string){
    this.keyw=s;
    this.sugg=[];
  }

  clickedRow(selectedEvent:Table){
    console.log(selectedEvent);
    this.selectedRow=true;
    this.item=selectedEvent;

    this.http.get("https://finalsubhw8.uw.r.appspot.com/getevent?id=" + selectedEvent.id).subscribe((result)=>{ 
    console.log("before parsing"+result);  
    this.result=JSON.stringify(result);
      // console.log(data);
      let resjson=JSON.parse(this.result);
      console.log("abchdsjvdv");
      console.log(resjson);
      // this.item=respjson;
      // const respjson=respjson;
      var genres='';
      var artists='';
      var ltime='';
      var ldate='';
      var lprice='';
      var lvenue='';
      var lstatus='';
      var st_color='';
      var artistsSpotify=[];
      this.spot=[];
      
    
      if(resjson._embedded.events[0].hasOwnProperty("dates")){
        console.log("*************************")
        if(resjson._embedded.events[0].dates.hasOwnProperty("start")){
            if (resjson._embedded.events[0].dates.start.hasOwnProperty("localDate")){
                ldate= ldate+ resjson._embedded.events[0].dates.start.localDate
    }}}

    if(resjson._embedded.events[0].hasOwnProperty("dates")){
        if(resjson._embedded.events[0].dates.hasOwnProperty("start")){
            if (resjson._embedded.events[0].dates.start.hasOwnProperty("localTime")){
                ltime=ltime+ resjson._embedded.events[0].dates.start.localTime
    }}}

      if (resjson._embedded.events[0].hasOwnProperty("classifications")){
        if(resjson._embedded.events[0].classifications[0].hasOwnProperty("genre")){
          if ((resjson._embedded.events[0].classifications[0].genre.hasOwnProperty("name")) && (resjson._embedded.events[0].classifications[0].genre.name!='Undefined')){
          genres= genres+resjson._embedded.events[0].classifications[0].genre.name + ' | '
      }}
  
  
      if(resjson._embedded.events[0].classifications[0].hasOwnProperty("subGenre")){
      if ((resjson._embedded.events[0].classifications[0].subGenre.hasOwnProperty("name"))&& (resjson._embedded.events[0].classifications[0].subGenre.name!='Undefined')){
          genres=genres+resjson._embedded.events[0].classifications[0].subGenre.name + ' | '
      }}
  resjson
      if(resjson._embedded.events[0].classifications[0].hasOwnProperty("type")){
      if ((resjson._embedded.events[0].classifications[0].type.hasOwnProperty("name")) && (resjson._embedded.events[0].classifications[0].type.name!='Undefined')){
          genres=genres+resjson._embedded.events[0].classifications[0].type.name + ' | '
      }}
  
  resjson
      if(resjson._embedded.events[0].classifications[0].hasOwnProperty("subType")){
      if ((resjson._embedded.events[0].classifications[0].subType.hasOwnProperty("name")) && (resjson._embedded.events[0].classifications[0].subType.name!='Undefined')){
          genres=genres+resjson._embedded.events[0].classifications[0].subType.name
      }}
      }
resjson
      if(resjson._embedded.events[0]._embedded.hasOwnProperty("attractions")){
        for(var k=0; k<resjson._embedded.events[0]._embedded.attractions.length; ++k){
        if (resjson._embedded.events[0]._embedded.attractions[k].hasOwnProperty("name")){
        artists=artists+resjson._embedded.events[0]._embedded.attractions[k].name + ' | '
        }
    }}

    if(resjson._embedded.events[0].hasOwnProperty("priceRanges")){
      if (resjson._embedded.events[0].priceRanges[0].hasOwnProperty("min") && resjson._embedded.events[0].priceRanges[0].hasOwnProperty("max")){
          lprice=resjson._embedded.events[0].priceRanges[0].min + ' - ' + resjson._embedded.events[0].priceRanges[0].max + ' '+ resjson._embedded.events[0].priceRanges[0].currency 
      }}

      if(resjson._embedded.events[0]._embedded.hasOwnProperty("venues")){
        if (resjson._embedded.events[0]._embedded.venues[0].hasOwnProperty("name")){
            lvenue=resjson._embedded.events[0]._embedded.venues[0].name
        }}

        if(resjson._embedded.events[0].hasOwnProperty("dates")){
          if(resjson._embedded.events[0].dates.hasOwnProperty("status")){
              if (resjson._embedded.events[0].dates.status.hasOwnProperty("code")){
                  lstatus=resjson._embedded.events[0].dates.status.code
      }}}

      var tick_link='';
      var seatmp='';
      var tm_link='';

      if (resjson._embedded.events[0].hasOwnProperty("url")){
        tick_link=tick_link+resjson._embedded.events[0].url
    }

    if(resjson._embedded.events[0].hasOwnProperty("seatmap")){
    if(resjson._embedded.events[0].seatmap.hasOwnProperty("staticUrl")){
        seatmp=resjson._embedded.events[0].seatmap.staticUrl
    }}

    if (resjson._embedded.events[0].hasOwnProperty('url')){
      tm_link=resjson._embedded.events[0].url;
    }
  
      if (lstatus=="onsale"){
          st_color="green";
  
      }
      if (lstatus=="offsale"){
          st_color="red";
  
      }
      if (lstatus=="rescheduled"){
          st_color="yellow";
  
      }
  
      if (lstatus=="canceled"){
          st_color="black";
  
      }
  
      if (lstatus=="postponed"){
          st_color="orange";
  
      }
  
      if (ldate==''){
          ldate='NA'
      }

      if (ltime==''){
        ltime='NA'
    }
  
      if (artists==''){
          artists='NA'
      }
  
      if (lvenue==''){
          lvenue='NA'
      }
  
      if (genres==''){
          genres='NA'
      }
  
      if (lprice==''){
          lprice='NA'
      }
  
      if (lstatus==''){
          lstatus='NA'
      }

      if (tick_link==''){
        tick_link='NA'
    }

    if (seatmp==''){
        seatmp='NA'
    }

      console.log(ldate,ltime,artists,lvenue,genres);
  
      this.ec=[];
      this.ec.push({
        e_id:resjson._embedded.events[0].id,
        e_name:resjson._embedded.events[0].name,
        e_date:ldate,
        e_time:ltime,
        e_artists:artists,
        e_venue:lvenue,
        e_genre:genres,
        price:lprice,
        ts:lstatus,
        tl:tick_link,
        sm:seatmp,
        tm:tm_link,
        st_color:st_color,

      });

      console.log("eventc:" + this.ec );

      // if(resjson._embedded.events[0]._embedded.hasOwnProperty("attractions")){
        // for(var k=0; k<resjson._embedded.events[0]._embedded.attractions.length; ++k){
       

    for(var k=0; k<resjson._embedded.events[0]._embedded.attractions.length; ++k){
      console.log("entered for");
      if (resjson._embedded.events[0]._embedded.attractions[k].hasOwnProperty("classifications")){
      if (resjson._embedded.events[0]._embedded.attractions[k].classifications[0].hasOwnProperty("segment")){
        console.log("entered if a");
        if (resjson._embedded.events[0]._embedded.attractions[k].classifications[0].segment.hasOwnProperty("name")){
          console.log("entered if b");
          if (resjson._embedded.events[0]._embedded.attractions[k].classifications[0].segment.name=='Music'){
            console.log("entered if");
            this.music=true;

            var art_name=resjson._embedded.events[0]._embedded.attractions[k].name
            console.log(art_name);
            const MYURL2="https://finalsubhw8.uw.r.appspot.com/getspotify?artist=" +  art_name;
          //  resjson._embedded.events[0]._embedded.attractions[k].name
            this.http.get(MYURL2).subscribe((resp2)=>{
            this.resp2=JSON.stringify(resp2);
            let resp2json=JSON.parse(this.resp2);
            console.log("SPOTIFY)")
            console.log(resp2json);

            // console.log(resp2json.artistData.body.artists.items[0].name);
            const albImg: string[]=[];

            for (var i = 0; i<resp2json.top3.length; i++){
              albImg.push(resp2json.top3[i].images[0].url)
            }

            // if (albImg.length>0){
            //   this.f=albImg[0];
            // }

            
            this.spot?.push({
              a_name: resp2json.artistData.body.artists.items[0].name,
              a_foll:resp2json.artistData.body.artists.items[0].followers.total,
              a_popularity:resp2json.artistData.body.artists.items[0].popularity,
              a_link:resp2json.artistData.body.artists.items[0].external_urls.spotify,
              a_img:resp2json.artistData.body.artists.items[0].images[0].url,
              alb: albImg 
              
            });
            console.log("SPOTIFY DATATATATAT");
            console.log(this.spot);
            this.f[0]=this.spot[0];

            });

           

          }
          else{
            this.music=false;
          }
        // artistsSpotify.push(resjson._embedded.events[0]._embedded.attractions[k].name)
        }
      }
    }
  }

  // here
  console.log(lvenue)
  if (lvenue!='NA'){
    // https://newfinalhw8.uw.r.appspot.com
      this.http.get("https://finalsubhw8.uw.r.appspot.com/getvenue?keyword=" + lvenue).subscribe((venres)=>{
      this.venres=JSON.stringify(venres);
      let venjson=JSON.parse(this.venres);
      console.log("VENUEEEEEEEE")
      console.log(venjson);
      var v_name=lvenue;
      var v_address='';
      var phone='';
      var hours='';
      var g_rule='';
      var c_rule='';

      this.f_name=1;
      this.f_add=0;
      this.f_phone=0;
      this.f_oh=0;
      this.f_gr=0;
      this.f_cr=0;

      if (venjson._embedded.venues[0].hasOwnProperty('address') && venjson._embedded.venues[0].address.line1!=undefined &&  venjson._embedded.venues[0].hasOwnProperty('state') && venjson._embedded.venues[0].state.hasOwnProperty('stateCode') &&venjson._embedded.venues[0].state.stateCode!=undefined && 
      venjson._embedded.venues[0].hasOwnProperty('postalCode') && venjson._embedded.venues[0].postalCode!=undefined && venjson._embedded.venues[0].hasOwnProperty('city') && venjson._embedded.venues[0].city!=undefined){

        v_address= v_address+ ' ' + venjson._embedded.venues[0].address.line1 + ' ' + venjson._embedded.venues[0].city.name + ' ' + venjson._embedded.venues[0].state.stateCode +' ' + venjson._embedded.venues[0].postalCode
        this.f_add=1;

      }
      if (venjson._embedded.venues[0].hasOwnProperty('boxOfficeInfo')){
      if (venjson._embedded.venues[0].boxOfficeInfo.hasOwnProperty('phoneNumberDetail')){
          phone=phone+venjson._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;
          this.f_phone=1;
      }
      if (venjson._embedded.venues[0].boxOfficeInfo.hasOwnProperty('openHoursDetail')){
        hours=hours+venjson._embedded.venues[0].boxOfficeInfo.openHoursDetail;
        this.f_oh=1;

      }
    }

      

      if (venjson._embedded.venues[0].hasOwnProperty('generalInfo') && venjson._embedded.venues[0].generalInfo.hasOwnProperty('childRule')){
        c_rule=c_rule+venjson._embedded.venues[0].generalInfo.childRule;
        this.f_cr=1;
      }

      if (venjson._embedded.venues[0].hasOwnProperty('generalInfo') && venjson._embedded.venues[0].generalInfo.hasOwnProperty('generalRule')){
        g_rule=g_rule+venjson._embedded.venues[0].generalInfo.generalRule;
        this.f_gr=1;
      }

      this.ven=[];
      
      this.ven.push({
        venname:v_name,
        venAddress:v_address,
        venPhone:phone,
        venHours:hours,
        venCRules:c_rule,
        venGRules:g_rule
      });


    });
    }
  

    

    

    });
  //   if(respjson.hasOwnProperty("dates")){
  //     if(respjson.dates.hasOwnProperty("start")){
  //         if (respjson.dates.start.hasOwnProperty("localDate")){
  //             datetime=datetime+ respjson.dates.start.localDate
  // }}}

  // if(respjson.hasOwnProperty("dates")){
  //     if(respjson.dates.hasOwnProperty("start")){
  //         if (respjson.dates.start.hasOwnProperty("localTime")){
  //             datetime=datetime+ respjson.dates.start.localTime

  // }}}
    
   



  }

  // keywordIP.value=''; sugg=[]; showTable=false; selectedRow=false; 
  clearFunc(checkbox: HTMLInputElement){
    
    checkbox.checked = false;
    this.ischecked=false;
    this.sugg=[]; 
    this.showTable=false; 
    this.selectedRow=false; 
  }




  submitbtn(){
    this.submitedForm=true;
    this.selectedRow=false;
    this.showTable=true;
    this.sugg=[];
      // var keyword=this.myForm.value.key;
      var keyword=this.keyw;
      var distance=this.myForm.value.dist;
      var category=this.myForm.value.categ;
      var address=this.myForm.value.loc;

    

    if(this.check==0){
      
      const geocodeUrl = 
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsUT6mL4V3D2SQDX5ltEWbuh2C5g0pph4`;
        
        fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
        this.lat = data.results[0].geometry.location.lat;
        this.lng = data.results[0].geometry.location.lng;
        console.log("ip loc box");
        console.log(this.lat,this.lng);
    })}
   



    const MYURL="https://finalsubhw8.uw.r.appspot.com/getdata?keyword=" + keyword + "&location=" + location + "&distance=" + distance + "&category=" + category +"&lat=" + this.lat + "&long=" + this.lng; 

    this.http.get(MYURL).subscribe((data)=>{
      // console.log(data);
      this.table=[];
      this.data=JSON.stringify(data);
      // console.log(data);
      let resultjson=JSON.parse(this.data);
      console.log(resultjson);

      this.total=resultjson.page.totalElements;
      console.log("TOTAL:"+this.total)

      var num=0;
      if (this.total>=20){
        num=20;
      }
      else{
        num=this.total
      }

      for (var i=0; i<num;i++){
        if(resultjson._embedded.events[i].id && resultjson._embedded.events[i].images[0].url && resultjson._embedded.events[i].name && resultjson._embedded.events[i].classifications[0].segment.name && resultjson._embedded.events[i]._embedded.venues[0].name){
        this.table.push({
          id: resultjson._embedded.events[i].id,
          date: resultjson._embedded.events[i].dates.start.localDate,
          time: resultjson._embedded.events[i].dates.start.localTime,
          icon:resultjson._embedded.events[i].images[0].url,
          name:resultjson._embedded.events[i].name,
          genre:resultjson._embedded.events[i].classifications[0].segment.name,
          venue:resultjson._embedded.events[i]._embedded.venues[0].name

        })}

      }
      console.log("before sorting");
      console.log(this.table)
      // STACKOVERFLOW FOR SORTING https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
      this.table.sort((a, b) => {
        const date1 = new Date(`${a.date} ${a.time}`);
        const date2 = new Date(`${b.date} ${b.time}`);
        return date1.getTime() - date2.getTime();
      });

      console.log("sorted:")
      console.log(this.table)

    

    });

    

  }

  addToFavorites(i:string, n:string){
    // localStorage.setItem(i, );
    if (!localStorage.getItem(i)){
      alert("Event Added to Favorites!")

      this.fav_toggle=true;

      console.log("inside first if")

    this.http.get("https://finalsubhw8.uw.r.appspot.com/getevent?id=" + i).subscribe((result)=>{
      this.result=JSON.stringify(result);
      // console.log(data);
      let favjson=JSON.parse(this.result);
      console.log(favjson);
      // this.item=respjson;
      // const respjson=respjson;
      this.fav_name=''
       this.f_genres='';
       this.f_date='';
       this.f_venue='';

       
    
      if(favjson._embedded.events[0].hasOwnProperty("dates")){
        console.log("*************************")
        if(favjson._embedded.events[0].dates.hasOwnProperty("start")){
            if (favjson._embedded.events[0].dates.start.hasOwnProperty("localDate")){
                this.f_date= this.f_date+ favjson._embedded.events[0].dates.start.localDate
    }}}


      if (favjson._embedded.events[0].hasOwnProperty("classifications")){
        if(favjson._embedded.events[0].classifications[0].hasOwnProperty("genre")){
          if ((favjson._embedded.events[0].classifications[0].genre.hasOwnProperty("name")) && (favjson._embedded.events[0].classifications[0].genre.name!='Undefined')){
            this.f_genres= this.f_genres+favjson._embedded.events[0].classifications[0].genre.name + ' | '
      }}
  
  
      if(favjson._embedded.events[0].classifications[0].hasOwnProperty("subGenre")){
      if ((favjson._embedded.events[0].classifications[0].subGenre.hasOwnProperty("name"))&& (favjson._embedded.events[0].classifications[0].subGenre.name!='Undefined')){
        this.f_genres=this.f_genres+favjson._embedded.events[0].classifications[0].subGenre.name + ' | '
      }}

      if(favjson._embedded.events[0].classifications[0].hasOwnProperty("type")){
      if ((favjson._embedded.events[0].classifications[0].type.hasOwnProperty("name")) && (favjson._embedded.events[0].classifications[0].type.name!='Undefined')){
        this.f_genres=this.f_genres+favjson._embedded.events[0].classifications[0].type.name + ' | '
      }}
  
  
      if(favjson._embedded.events[0].classifications[0].hasOwnProperty("subType")){
      if ((favjson._embedded.events[0].classifications[0].subType.hasOwnProperty("name")) && (favjson._embedded.events[0].classifications[0].subType.name!='Undefined')){
        this.f_genres=this.f_genres+favjson._embedded.events[0].classifications[0].subType.name
      }}
      }

      if(favjson._embedded.events[0]._embedded.hasOwnProperty("venues")){
        if (favjson._embedded.events[0]._embedded.venues[0].hasOwnProperty("name")){
          this.f_venue=favjson._embedded.events[0]._embedded.venues[0].name
        }}
      
  

  this.favevent={
    id:i,
    date:this.f_date,
    fav_name:n,
    fav_venue:this.f_venue,
    fav_gen:this.f_genres,

  }

  console.log("favvvvvv");
  console.log(this.favevent)

  var itemJSON = JSON.stringify(this.favevent);



  localStorage.setItem(i, itemJSON);

});

  

}


else{
  this.fav_toggle=false;
  console.log("inside else")
  localStorage.removeItem(i)
    
}


  }

  

  IPsuggestion(){
    this.http.get('https://finalsubhw8.uw.r.appspot.com/autocomplete?keyword='+this.keyw).subscribe(
      (sugresp:any)=>{

        this.sugg= sugresp;
        console.log(this.sugg);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showGM(v:string){
    
    if(v.length>0){
      this.opengmp=true;

      const geocodeUrl2 = 
      `https://maps.googleapis.com/maps/api/geocode/json?address=${v}&key=AIzaSyAsUT6mL4V3D2SQDX5ltEWbuh2C5g0pph4`;
      fetch(geocodeUrl2)
      .then(response => response.json())
      .then(data => {
      this.gm_lat = data.results[0].geometry.location.lat;
      this.gm_lng = data.results[0].geometry.location.lng;
      console.log("showGM");
      console.log(this.gm_lat,this.gm_lng);
        console.log("MARKER")
      this.marker={ position:{ lat:Number(this.gm_lat), lng:Number(this.gm_lng)}}
      console.log(this.marker)

      this.options = {
        center: this.marker.position, // set the center to the marker position
        zoom: 18,
        mapTypeId: 'roadmap'
      };

     
      
      



    })
   
        
    }

  }



}
