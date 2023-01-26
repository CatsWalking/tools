/*----------------------------
Roku tools
*/
'use strict';

let i;
let active = 'prime';
let active_input = $('#'+active).find('.input');
let active_result;

/*-----------------------
  init
-----------------------*/
function init(){
    active_input = $('#'+active).find('.input');
    active_result = $('#'+active).find('.result');
    $('.input').removeClass('active');
    active_input.addClass('active');
}
init();
active_input.focus();
$('#'+active).find('.input').focus();

// focus
$('#calc').on('focus', '.input', function(){
    active = $(this).parent().parent().attr('id');
    init();
})
$('#calc').on('click', '.input', function(){
    $(this).select();
})
$('#calc').on('click', 'tr', function(){
    active = $(this).attr('id');
    init();
})

/*-----------------------
  テンキー
-----------------------*/
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
    let val = active_input.val();
    let id = active_input.parent().parent().attr('id');
    let res;
    active_result.html('')
    if(val!='' && val!='-' && val!='0'){
        val = parseInt(zenToHan(val));
        switch(id){
            case 'prime':
                res = prime(val);
                break;
            case 'squre':   
                // 平方数
                res = val*val;
                break;
            case 'squre_root':
                // 平方根
                res = Math.round( Math.sqrt(val) * 1000 ) / 1000;
                break;
            case 'pi':
                // 円周率
                res = Math.round(val*3.14*100)/100
                break; 
            case 'pi2':
                // 円周面積
                res = Math.round(val*val*3.14*100)/100
                break;         
        }
        active_result.html(res)
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
