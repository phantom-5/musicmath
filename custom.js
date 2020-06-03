var prev_glow_id=''
var values_global_lis=[]
var idlis=[]
var qflag=0;

window.onload=function(){
    for(i=0;i<10;i++){
        var id='Piano/p ('+(i+1).toString()+').ogg'
        idlis.push( new Howl({src:[id]}))
    }
}

Promise
    .all(files.map(function(file) {
        return new Promise(function(resolve) {
            var tmp = new Audio();
            tmp.src = file;
            tmp.addEventListener('loadeddata', resolve);
        });
    })).then(function() {
        alert('Preloading done!');
    });

function ret_glow(retValue){
    prev_glow_id.style.visibility='hidden'
    var el=document.getElementById(retValue)
    el.style.visibility='visible'
    prev_glow_id=el
}

function genF(){
    var values_lis=[1]
    var el=document.getElementById('seq').value
    var count=1
    var n=1
    var m=1
    //uses p and q to avoid conflict with sin,cos,tan etc.
    var temp_for=''
    var temp_q=''
    el=el.split('')
    while(count<=200){
        for(i=0;i<el.length;i++){
            //console.log(el[i])
            if(el[i]==='p'){
                if(qflag===0){temp_for+=(n).toString()}
                else{temp_q+=(n).toString()}
            }else if(el[i]==='q'&& qflag===1){
                temp_q+=(m).toString()
            }else if(el[i]==='['){
                qflag=1
            }else if(el[i]===']'){
                qflag=0
                var index=Math.round(math.evaluate(temp_q))
                try{
                var temp_x=values_lis[index].toString()
                temp_for+=temp_x
                }
                catch(err){
                temp_for+=0
                }
               temp_q=''
            }
            else{
                if(qflag===0){temp_for+=el[i]}
                else{temp_q+=el[i]}
            }
        }
        n+=1
        m+=1
        var retAns=0
        try{
        values_lis.push(Math.round(math.evaluate(temp_for)))
       // console.log(values_lis)
        retAns=1
        }catch(err){}
        temp_for=''
        count+=1
    }
    var el=document.getElementById('status')
    if(retAns===1){
    el.innerHTML='Success: '+values_lis.slice(0,16)+'...'
    var el=document.getElementById('glowForm')
    el.style.visibility='visible'
    prev_glow_id=document.getElementById('g0')
    values_global_lis=values_lis
   }
    else{ el.innerHTML='Failed: '+'Invalid Expression, Please Follow Instructions.'}
    var status_form=document.getElementById('status_form')
    status_form.style.visibility='visible'
   
}

function exit(){
    window.open('index.html','_self')
}


async function compose(){
    var el=document.getElementById('playing')
    el.innerHTML='Now Playing'
  for(i=0;i<values_global_lis.length;i++){
      var delay=math.random([800,1500])
      var num=math.mod(values_global_lis[i],10)
      if(num>10){swal("Sorry! Number Exceeded Limit",values_global_lis[i].toString()
      )
      break
      } else{
      idlis[num].play()
      await new Promise(r => setTimeout(r, delay));
      var glowId='g'+num.toString()
      ret_glow(glowId)
      }
  }
}
