/*----------------------------
Roku tools
*/
'use strict';

let i;
let active = 'prime';   // default
// let target_index = 0;
let active_input = $('#'+active).find('.input').eq(0);
// let active_input = $('#'+active).find('.input').eq(target_index);
let active_result;
let input1, input2, input3;
let division_decimal = $('#division_decimal');
let keta=1;
for(i=0; i<division_decimal.val(); i++){
  keta = keta*10;
}

// let active_input = $('#'+active).find('.input');



// //-------------------
// // init
// //-------------------
// function init(){
//     $('.input').removeClass('active');
//     active_input.addClass('active');
//     active_result = $('#'+active).find('.result');
// }
// init();
// $('#'+active).find('.input').focus();

// //-------------------
// // focus, tap
// //-------------------
// $('#calc').on('focus click', '.input', function(){
//     active = $(this).parent().parent().attr('id');
//     active_input = $(this);
//     init();
// })

// //-------------------
// // キーボード
// //-------------------
// $('#calc .input').keyup(function(){
//     calc($(this));
// })

// $('#calc .input').change(function(){
//     $(this).val(zenToHan($(this).val()));
//     console.log(111,active);
// })

// //-------------------
// // テンキー
// //-------------------
// let num
// $('.tenkey_box li').click(function(){
//     let n = $(this).html();
//     active_input.val(active_input.val()+n);
//     calc(active_input);
// })
// //-------------------
// // 小数点指定変更されたら
// division_decimal.change(function(){
//     keta=1;
//     for(i=0; i<division_decimal.val(); i++){
//         keta = keta*10;
//     }
// })

/*-----------------------
  計算
-----------------------*/
function calc(active_input){
    active_result.html('')
    let id = active_input.parent().parent().attr('id');
    console.log('id',id);

    let inputs = $('#'+id).find('.input');
    if(inputs.eq(0).length){
        input1 = inputs.eq(0).val();
    }
    if(inputs.eq(1).length){
        input2 = inputs.eq(1).val();
    }
    if(inputs.eq(2).length){
        input3 = inputs.eq(2).val();
    }

    //-------------------------
    // 素因数分解、平方数、平方根
    //-------------------------
    let res;
    switch(id){
        case 'prime':
            // 素因数分解
            res = prime(input1); 
            break;
        case 'squre': 
            // 平方数
            res = input1*input1;
            break;
        case 'squre_root':
            // 平方根
            res = Math.round( Math.sqrt(input1) * 1000 ) / 1000;
            break;
        case 'pi':
            // 円周の長さ
            res = Math.round((input1 + input1) * 3.14 * (input3 / 360) * 100) / 100
            break; 
        case 'pi2': 
            // 円の面積
            res = Math.round((input1 * input1) * 3.14 * (input3 / 360) * 100) / 100
            break;        
        case 'multi':   
            // 掛け算
            if(Number.isInteger(input1 * input2)){
                res = input1*input2;
            } else {
                res = Math.round(input1 * input2 * keta) / keta;
            }
            break;
        case 'division':  
            // 割り算
            res = Math.round(input1 / input2 * keta) / keta;
            break;
        case 'rate1':  
            // 150点中90点は6割
            res = Math.round(input2 / input1 * 10 * 2) / 2
            break;  
        case 'rate2':  
            // 150点の6割は90点
            res = input1 * input2 / 10;
            break;
    }
    // 結果
    active_result.html('')
    if(!(Number.isNaN(res) || res=='Infinity' || res==0)){
        active_result.html(res)
    }
}

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
// ダブルクリックで上書き
$('#calc').on('dblclick', '.input', function(){
    $(this).val('');
})
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
