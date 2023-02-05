/*----------------------------
Roku tools
*/
'use strict';

let i;
let active = 'prime';
let active_input = $('#'+active).find('.input');
let active_result;

//-------------------
// init
//-------------------
function init(){
    $('.input').removeClass('active');
    active_input.addClass('active');
    active_result = $('#'+active).find('.result');
}
init();
// active_input.focus();
$('#'+active).find('.input').focus();

//-------------------
// focus, tap
//-------------------
$('#calc').on('focus click', '.input', function(){
    active = $(this).parent().parent().attr('id');
    active_input = $(this);
    $(this).val('');
    active_input = $(this);
    init();
})

//-------------------
// テンキー
//-------------------
let num
$('.tenkey_box li').click(function(){
    let n = $(this).html();
    active_input.val(active_input.val()+n);
    calc(active_input);
})

/*-----------------------
  計算
-----------------------*/
function calc(active_input){
    active_result.html('')
    let id = active_input.parent().parent().attr('id');
    let res;
    //-------------------------
    // 素因数分解、平方数、平方根
    //-------------------------
    if(id=='prime' || id=='squre' || id=='squre_root'){
        let val = active_input.val();
        if(val!='' && val!='-' && val!='0'){
            val = parseInt(zenToHan(val));
            switch(id){
                case 'prime':       // 素因数分解
                    res = prime(val); 
                    break;
                case 'squre':       // 平方数
                    res = val*val;
                    break;
                case 'squre_root':   // 平方根
                    res = Math.round( Math.sqrt(val) * 1000 ) / 1000;
                    break;
      
            }
            active_result.html(res)
        }
    //-------------------------
    // 円周の長さ、円の面積
    //-------------------------
    } else if(id=='pi' || id=='pi2'){
        let myInput = active_input.parent().parent().find('.input');
        let val1 = myInput.eq(0).val();
        let val2 = myInput.eq(1).val();
        let val3 = myInput.eq(2).val();

        console.log(val1, val2, val3);
        if(val1!='' && val1!='-' && val1!='0' && val3!='' && val3!='-' && val3!='0'){
            val1 = parseInt(zenToHan(val1));
            val3 = parseInt(zenToHan(val3));
            switch(id){
                case 'pi':// 円周の長さ                    
                    res = Math.round((val1+val1) * 3.14 * (val3 / 360) * 100) / 100
                    break; 
                case 'pi2':// 円の面積                    
                res = Math.round((val1*val1) * 3.14 * (val3 / 360) * 100) / 100
                    break;         
            }
            active_result.html(res)
        }
    }
}
$('#calc .input').keyup(function(){
    calc($(this));
})

/*-----------------------
  素因数分解
-----------------------*/
function prime(val){
    let primes1 = [];
    let primes2 = [];
    let primes3 = [];
    if(Number(val)){
        for(i=2; i<=50; i++){
            for(let j=0; j<10; j++){
                if(val % i ==0){
                    primes1.push(i);
                    val = val/i;
                } else {
                    break;
                }
            }
        }
        if(val>1){
            primes1.push(val);
        }
        primes1.forEach(function(i, e){
            if(primes2[i]){
                primes2[i]++;
            } else {
                primes2[i] = 1;
            }
        })
        primes2.forEach(function(i, e){
            if(i==1){
                primes3.push("<div class='prime_number'>"+e+"</div>");
            } else {
                primes3.push("<div class='prime_number'>"+e+"</div><div class='ruby'>"+i+"</div>");
            }
        })
        return primes3.join(', ');
    }
    return '';
}

/*-----------------------
  all clear
-----------------------*/
$('#js_clear').click(function(){
    active_input.val('');
    active_result.html('');
  })
  $('#js_all_clear').click(function(){
    $('.input').val('');
    $('.result').html('');
  })
