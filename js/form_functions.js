async function calculateFee(e,thisValue=null){
  let class_name = ''
  if(e != '' && typeof e!= "undefined"){
    if($(`.${e} .calculateFee`).prop('checked')){
         $(`.${e} .calculateFee`).attr('checked', true);
    }else{
    $(`.${e} .calculateFee`).attr('checked', false);
    }
    class_name = $($(`.${e} .calculateFee`)).data('class');
}
    let class_index = $(thisValue).data('index');
    if(class_name){
      // console(class_name);
       await calculateothercal(class_name);
    }
    await delay();
    var destinationval = $('#destination_id').val();
    var nationalityval = $('#nationality_id').val();
    var vttype = $('#git_type_id').val();
    var addService = $('#travelinsurance').val();
    let totalFee ='';
    if(vttype==''){
        var datafee = 0;
    }else{
      if($('#destination_id').val() == 'Z282MU5iRU51N3ZBNnhnWHF0eTh5dz09' && $('#livingin_id').val() == 'ZGZ3aWl1VFBMeHlYV1QreVJjdVlOdz09'){
        var datafee         = parseFloat($("#git_type_id").find('option:selected').attr("datafor")) - $('#indiadiscountvalue').val();
      }else{
        var datafee         = parseFloat($("#git_type_id").find('option:selected').attr("datafor")) - $('#pricevalue').val();
      }
       
    }
   
    let calculate_value = calculate_Fee();
    let total_service_fee = calculate_value.fee_total.reduce((a, b) => a + b, 0);

    // if(total_service_fee !='' || total_service_fee !=0){
    //   datafee         = parseFloat($("#git_type_id").find('option:selected').attr("datafor"));
    // }

    if(calculate_value.option_name.length > 0 ){
      totalFee = parseFloat($("#git_type_id").find('option:selected').attr("datafor")) + total_service_fee;
    }else{
      totalFee = total_service_fee + parseInt(datafee);
    }

    var symbol          =  $("#git_type_id").find('option:selected').attr("symbol");
    if(symbol==undefined){
       symbol = '$';
    }
    $('.div_total_fee').hide();
    if(totalFee > 0){

      $('.div_total_fee').show();
    }
    
    if($('#additional_service_status').val() != 1 && $('#fee_status').val() != 1){
      $('.div_total_fee').hide();
     }

    var strikeprice_value = $('#strikeprice_value').val();
    var strikeprice_status = $('#strikeprice_status').val();
    var del_lable='';
    var discount_value ='';
    if(strikeprice_status==1){
    strikeprice_value = parseFloat(strikeprice_value)  + parseFloat(totalFee);
    discount_value = `<span class="green-bg discount_message" style="color:#fff;float:none;${strikeprice_status == 1 ? 'display:inline-block':'display:none'}">USD <b>${parseInt($('#strikeprice_value').val())}</b> Discount Coupon Applied</span>`;
    del_lable = '<del>$'+ strikeprice_value  + ' </del>';
    }else{
    del_lable = '';
    discount_value = '';
    }
    // console.log(strikeprice_status)
    // console.log(del_lable);
    if(destinationval=='TXNWMTBmRmxrd2I1VE5sTTJwU1E0dz09'){
        if(nationalityval =='THFZUk1rNUk2d1d1VWJSZnJXb0Ridz09' || 
            nationalityval =='cCt5M1Z3RmFkYVBFc0tPcWpFVDdQdz09' || 
            nationalityval =='ZGZ3aWl1VFBMeHlYV1QreVJjdVlOdz09' || 
            nationalityval =='ZnZqSUNKdkFWQjNMUDdaRDhDNEh1UT09' || 
            nationalityval =='eGwrVnJFakl6YnJLY3lWNkVaeTV1QT09' || 
            nationalityval =='VmVPOUFqMGtoRi9HNlNCelhyVmN1dz09'){
               // $("#total_fee").html('Fee-'+symbol+parseFloat(totalFee)); 

               $("#total_fee").html(del_lable+' '+symbol+parseFloat(totalFee)+' '+discount_value); 
           }else{
                // $("#total_fee").html('Fee-'+symbol+parseFloat(totalFee)+'<br/><span class="red font12" style="width:100%">Valid visa any of Australia / Ireland / New Zeland / Schengen / UK / USA</span>');
                $("#total_fee").html(del_lable+' '+symbol+parseFloat(totalFee)+' '+discount_value+'<br/><span class="red font12" style="width:100%">Valid visa any of Australia / Ireland / New Zeland / Schengen / UK / USA</span>');

           }
       }else{

       //    $("#total_fee").html('Fee-'+symbol+parseFloat(totalFee)); 
          $("#total_fee").html(del_lable+' '+symbol+parseFloat(totalFee)+' '+discount_value); 
      }
         let option_selected = '';
         if (calculate_value.option_name.length > 2) {
          //  option_selected = 'More Than 2 item';
          option_selected = calculate_value.option_name.join(',')
         } else if (calculate_value.option_name.length > 0) {
           option_selected = calculate_value.option_name.join(',');
         }
         $('#push_option_name').val(option_selected);
       
         var fee_label = '';
         var fee_inclusive = ''; 
         if($('#pricevalue').val() > 0 || $('#indiadiscountvalue').val() > 0){
          fee_label = 'Fees';
          fee_inclusive = '';
         } else{
          fee_label = 'Total Fees';
          fee_inclusive = 'Inclusive of (Service Fee + Govt Fee + Applicable Taxes)';
         }

         $('.fee_label').html(fee_label);
         $('.fee_inclusive').html(fee_inclusive)
 
} 

function delay () {
 return new Promise(resolve => setTimeout(resolve, 300));
}

function calculate_Fee () {
 let fee_total = [];
 let option_name = [];
 
 $('.calculateFee:checked').each(function () {
   if ($(this).is(':checked') == true) {
     let id = $(this).attr('id');
     fee_total.push($(this).data('service_fee'));
     option_name.push($(this).data('option_name'));

   }
 })
//  console.log(fee_total);
 return { fee_total: fee_total, option_name: option_name }
}




function getMessageData() {
  $.ajax({
      type: "POST", 
      data: {'gofor':'getmessagedata'},
      dataType: "json",
      url:"ajax_form.php",
      beforeSend: function() {},
      success: function(messagedata) {
          var urgentnoticed = `<div class="urgentmessage row" style="font-size: 14px;display: block;background: rgb(251, 244, 214);color: #000 !important;padding: 10px 10px;border: solid 1px #b5b5b5;">
          <p style="margin:0;"><strong style="color: #ff1c1c;font-size: 16px;">${messagedata.messageheading}</strong> ${messagedata.messagecontent}</p>
          </div>`;
          $('.urgentnoticed').html(urgentnoticed)
      }
  })
}





function getAdditionalServiceTypeBydestinationId(git_type_id,addition_id=null){
        is_gcc_residence(0,'');
        // var visatable = `<div class="row marginFromBottom marginFromTop whiteBG borderFromBottom"  id="vtypedetails" style="font-size:14px; display:none; background:#faebd7;">
        // <div class="column-oneThird evisatable-inner-row"><div class="row paddingAll gradientBG white titleFont upperCase">Processing Time</div><div class="row paddingAll processingtime"></div></div>
        // <div class="column-oneThird evisatable-inner-row"><div class="row paddingAll gradientBG white titleFont upperCase">Visa Validity</div><div class="row paddingAll visavalidity"></div></div>
        // <div class="column-oneThird evisatable-inner-row"><div class="row paddingAll gradientBG white titleFont upperCase">Stay Validity</div><div class="row paddingAll stayvalidity"> </div></div>
        
        
        // </div> `;
        $('.vtable').empty();
      
        var visatable = `<div id="vtypedetails">
        <div class="feessectionrow processingtimedisplay row">
        <div class="row fontBold">Processing Time</div>
        <h4 class="row marginFromBottom paddingFromBottom borderFromBottom font-Weight-Normal processingtime"></h4>
        </div>
<div class="feessectionrow vvaliddisplay row">
        <div class="row fontBold">Visa Validity <div class="tooltip">
                        <i aria-hidden="true" class="fa fa-info-circle"></i><span class="tooltiptext">The visa validity will be <span id="validity_date" style="float:none">180 Days from the date of issue</span>.</span> 
                                </div></div>
        <h4 class="row marginFromBottom paddingFromBottom borderFromBottom font-Weight-Normal visavalidity"></h4>
       
        </div>
<div class="feessectionrow stayvaliddisplay row">
        <div class="row fontBold">Stay Validity<div class="tooltip">
                        <i aria-hidden="true" class="fa fa-info-circle"></i><span class="tooltiptext">The "Stay Validity" refers to the duration of time you are allowed to stay in the ${$('#destination_id').find(':selected').text().trim()} after you have entered&nbsp;the&nbsp;country.</span> 
                                </div></div>
        <h4 class="row marginFromBottom paddingFromBottom borderFromBottom font-Weight-Normal stayvalidity"></h4>
       </div> </div>`
     
        var extrasection = ``;
var testomonial='';
var faqdata = '';
var stepsdata = '';
  fetch("js/jsondata.json")
        .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log(data);
	if(data.review!=null && data.review!=undefined){
/* 	fruits.forEach((key,val){
		alert(val);
		}); */
		
		 testomonial +='';
		var obj = 	Object.values(data.review);
		$.each(obj, function( index, value ) {
  testomonial+='<div class="row testimonial-col sliderinner "><div class="test-star fl wa"><a href="#"><img src="images/ratingstar.png" width="17" alt="" /></a>';
  testomonial+='<a href="#"><img src="images/ratingstar.png" width="17" alt="" /></a><a href="#"><img src="images/ratingstar.png" width="17" alt="" /></a><a href="#"><img src="images/ratingstar.png" width="17" alt="" /></a></div>';
 testomonial+='<div class="test-date fr">'+value.date+'</div><div class="row test-text mt-20"><h4 class="fw-500">'+value.title+'</h4><p class="fw-300">'+value.description+'</p></div></div>';
});


$('.testonomialdata').html(testomonial);
	}
	
	if(data.faqDatas!=null && data.faqDatas!=undefined){
	
	var objss = Object.values(data.faqDatas);
		$.each(objss, function( key, fvalue ) {
		
	faqdata+='<div class="faqcol"><input type="radio" id="faq-'+key+'"  name="rd"><h1><label for="faq-'+key+'" onclick=`changetab("faq-'+key+'")`>'+fvalue.title+'</label></h1><div class="p">';
	
faqdata+=fvalue.description+'</div></div>';
		});
     
      
		// $('.faqcolright').html(faqdata)
        // $('.linkname').html(window.location.hostname)
		}

 
        if(data.StepsDatas!=null && data.StepsDatas!=undefined){
	$('.steps-heading').html(`<strong class="fw-600">Visa</strong> Processing Steps`)
            var objssteps = Object.values(data.StepsDatas);
			var country_status ='';
			if($('#country_name_dest').val() == ''){
  				if($('#destination_id').find(":selected").text().trim() == 'United Arab Emirates (UAE)'){
					country_status= 'UAE' ;
				}else if($('#destination_id').find(":selected").text().trim() == 'United Kingdom (UK)'){
					country_status= 'UK' ;
				}else if($('#destination_id').find(":selected").text().trim() == 'United States of America (USA)'){
					country_status= 'USA' ;
				}else {
					country_status=  $('#destination_id').find(":selected").text();
				}
				
			}else{
				if($('#country_name_dest').val() == 'uae' || $('#country_name_dest').val() == 'usa' || $('#country_name_dest').val() == 'uk' ){
					country_status = $('#country_name_dest').val().toUpperCase();
				}else{
					country_status=  $('#destination_id').find(":selected").text();
				}
			}
                $.each(objssteps, function( key, fvalue) {
                    stepsdata+=` <div class="col-25 fl steps-col pa-20 pr">
                    <img src="images/arrow-right.png" width="23" class="stepsarrow" alt="Steps" title="Steps" style=display:${fvalue.stepno != 'Step 4' ? 'block':'none' } />
                    <div class="wa fl mr-10 mt-5 stepsimg">
                      <img src="images/${fvalue.img}" width="48" alt="Steps" title="Steps" />
                    </div>
                    <div class="wa fl steps-text">
                      <h3 class="fw-500 fn">${fvalue.stepno}</h3>
                      <p>${fvalue.description.replace('DestinationName',country_status)}</p>
                    </div>
                  </div>`;
            
            
                });
                $('.steps-inner').html(stepsdata)
                
                }
	
		
		});


$('.vtable').append(visatable);
$('#push_option_name').val('');
 is_gcc_residence(0,'');
 $('#vtypedetails').css('display','none');
 $('#personaldetails').css('display','none');
 $('#personaldetails').css('display','none');
		//var git_type_id = $('git_type_id').val();


var visadetails = $('#git_type_id option[value="'+git_type_id+'"]').data('visadetails');

if(visadetails!='' && typeof visadetails != "undefined"){
	var obj  = JSON.parse(decodeURIComponent(visadetails));
	if(obj!=null){
	$('#vtypedetails').css('display','block');
	$('#personaldetails').css('display','block');
	$('.visavalidity').html(obj.visa_validity);
	$('.stayvalidity').html(obj.stay_validity);
	$('.processingtime').html(obj.processing_time);
  $('.requireddoc').css('display',"block");
  $('#uploadmydocs').css('display','block');
  // $('.urgentnoticed').html(urgentnoticed);
  $('.urgentnoticed').css('display','block');
  $('.extras').css('display','block');
  $('.testonomialdiv').css('display','block');
  getMessageData();


  $('.tooltipcountry').html($('#destination_id').find(":selected").text());

  loadnewfooter();
  $('.footer-panel').css('display','none');
  $('.testi').css('display','block');
  $('.faq_cls').css('display','block');
  $('#validity_date').html(obj.visa_validity);
  accordian();
  getFaqData();
  $('.formtitle').html('Visa Application Form');
}
}
else{
$('#vtypedetails').css('display','none');
$('#personaldetails').css('display','none');
$('.requireddoc').css('display',"none");
$('.urgentnoticed').html("");
$('.extras').css('display','none');
$('.testonomialdiv').css('display','none');

$('.tooltipcountry').html('');
$('.faq_cls').css('display','none');
$('.testi').css('display','none');
$('#validity_date').html('');
$('.footer-panel').css('display','block');
loadnewfooter();
$('.formtitle').html('Entry Online Form');

}

       $('#push_option_name option[value=""]').html('Please Select');
      const addition_id_val = JSON.parse(addition_id);
      $('.newinsurance').empty();
      $('#additional_id').html('');
   $('#checkboxes').html('');
       var destination_id    = $('#destination_id').val();
       var nationality_id    = $('#nationality_id').val();
       var living_in_id      = $('#livingin_id').val();
       if(git_type_id==''){
          var git_type_id        = $('#git_type_id').val();
       }

       var currency =  $("#git_type_id").find('option:selected').attr("symbol");
       if(currency==undefined){
           currency = '$';
       }else if($('#living_in').val() == 'ZGZ3aWl1VFBMeHlYV1QreVJjdVlOdz09' && $('#currency_type').val() != 1){
           currency = '₹';
       }
       $('.newinsurance').empty();
   var ext_class = '';
   var straAd = '';
   straAd =  straAd+'<option value="">Please Select</option>';
  if(git_type_id!=''){
     $.ajax({
        type: "POST", 
        data: {'gofor':'getAdditionalServiceTypeBydestinationId','destination_id':destination_id,'nationality_id':nationality_id,'git_type_id':git_type_id,'living_in_id':living_in_id},
        dataType: "json",
        url:"ajax_form.php",
         success: function(dataAdd) {
           // console.log(dataAdd);
          
           var straAd = '';
           var dataAdds = dataAdd;
           straAd =  '';//straAd+'<option value="">Please Select</option>';
           let count = 0;
           let fee = '';
           //fee = parseInt(data.service_fee) +  data.total_fee && data.total_fee !=null?parseInt(data.total_fee):0;
           if(dataAdds['additionalServiceList'] != null && typeof dataAdds['additionalServiceList'] != undefined){
           $.each(dataAdds['additionalServiceList'], function(i, data){
               if(data.service_type != 'Express'){
                 count++;  
               }
               
               if(data.service_type == 'Other'){
                   ext_class = '';
               }
               if(data.service_type == 'MNG'){
                   ext_class = 'mng_class_'+count;
               }
               if(data.service_type == 'Express'){
                   ext_class = 'chb_class_'+count;
                   $('#express_count').val('1')
               }
               if(data.name == 'Travel Insurance'){
                $('#insurance_count').val('1');
                $('#insurance_id').val(`${data.additional_id}`);
              }
               
               
               if(typeof addition_id !== 'undefined' && addition_id != null){ 
                   if(addition_id_val['checked'][data.additional_id] == 1){
                       selaS ="checked='checked'";
                       var checkboxes = document.getElementById("checkboxes");	
                       checkboxes.style.display = "block";
                   }  
               }
               
                   
               data.name != 'Airport Transfer' ?  straAd += `<div class="row form-choose-option-main marginFromTop" onclick="calculateFee('${data.additional_id}');">
               <div class="row form-choose-option-col-main ${data.additional_id}">
               <input type="checkbox" name="additional_id[]" class="calculateFee ${ext_class}" data-option_name = "${data.name}" data-service_fee= "${data.service_fee}" data-class="${ext_class}" value="${data.additional_id}">
               <div class="row form-choose-option-col">
               <div class="form-choose-option-col-name">
               <p class="${data.additional_id}" style="width:auto;" addfor=${data.service_fee} value= ${data.additional_id}>${data.name}</p>
               ${data.description ? `<div class="tooltip"><i aria-hidden="true" class="fa fa-info-circle"></i><span class="tooltiptext">${data.description}</span></div>` : ""} 
               <span>Price per applicant</span>
               </div>
  
               <div class="form-choose-option-col-price fr">
               <p><del>${data.name == 'Visa Refusal Coverage' ? '$'+(data.service_fee + 10) : ''}${data.name == 'Travel Insurance' ? '$'+(data.service_fee + 100) : ''}</del> $${data.service_fee}</p>
               </div>
               
  
               </div>
               </div> 
               </div>` : '';
                   /*straAd = straAd+'<option addfor= "'+data.service_fee+'" value="'+data.additional_id+'" '+selaS+'>'+data.name+'</option>';*/
               });
           }
               if( $('#destination_id').val() == 'K29xRlF6MTV6cnRxSncyRXpMVlhQdz09' && ($('#country_type').val() == 'G2' ||  $('#country_type').val() == 'G3' || $('#country_type').val() == 'G4')){
                  is_gcc_residence(1,'Are you a Resident of GCC or Holding a valid visa for US/UK/Schengen country?');
               }
              //  console.log(straAd);
               $('.newinsurance').html(straAd);
           
         }
     });
  }else{
    $('.newinsurance').html(straAd);
        git_type_id = '';
  }

}

function getVTypeOfDestination(nationality_id){
   is_gcc_residence(0,'');
   $('.div_total_fee').hide();
   $('#push_option_name option[value=""]').html('Please Select');
     var destination_id = $('#destination_id').val();
     var git_type_id    = $('#git_type_id').val();
     var living_in_id    = $('#livingin_id').val();
     var nationality_id = nationality_id;
     $.ajax({
        type: "POST", 
        data: {'gofor':'getVisaTypeOfDestination','destination_id':destination_id,'nationality_id':nationality_id,'living_in_id':living_in_id},
        dataType: "json",
        url:"ajax_form.php",
         success: function(dataArr) {
          //  console.log(dataArr);
               var data = dataArr;
               var stra = '';
               stra =  stra+'<option value="">Please Select</option>';
               if(typeof data['visaTypeList'] !='undefined' || data['visaTypeList'] !== ''){
               if(typeof data.visaTypeList['Sticker Visa'] !='undefined'){
                   $('.div_total_fee').show();
                   $('#total_fee').html('Applicantion Not Allowed');
                   }else{
                   for(let list in data['visaTypeList']){
                       for(let vlist in data['visaTypeList'][list]){
                           if($('#destination_id').val()=='N1o0Tit2NkZjM2NLT3pGQkhiYnFXQT09'){							
                               var eVisa = vlist.replace('eVisa','');
                           }else{
                               var eVisa = vlist.replace('eVisa','Visa');
                           }
                           let visa_required      = data['visaTypeList'][list][vlist]['visa_required'];
                           let visa_required_text = data['visaTypeList'][list][vlist]['visa_required_text'];
                           if(typeof visa_required == 'undefined' || visa_required !='Visa Required'){
                               $('.div_total_fee').show();
                               $('#total_fee').html('Applicantion Not Allowed');
                               var eVisa = 'Applicantion Not Allowed';
                           }else{
                            $('.div_total_fee').hide();
                            $('#total_fee').html('');
                               var visadetails = {
                                     processing_time:data['visaTypeList'][list][vlist]['processing_time'],
                                     stay_validity:data['visaTypeList'][list][vlist]['stay_validity'],
                                     visa_validity:data['visaTypeList'][list][vlist]['visa_validity']
                     
                                }
                                visadetails = encodeURIComponent(JSON.stringify(visadetails,null));
                               stra = stra + '<option symbol="'+data['visaTypeList'][list][vlist]['symbol']+'" datafor="'+data['visaTypeList'][list][vlist]['total_fee']+'" value="'+data['visaTypeList'][list][vlist]['visa_type_id']+'" data-visadetails="'+visadetails+'">'+eVisa+'</option>';
                           }
                            $('#country_type').val(data['visaTypeList'][list][vlist]['country_type']);
                       }
                  }	
                  $('.loadnewfooter').empty();
                  $('.footer-panel').css('display','block');
           }
       }
               $('#git_type_id').html(stra);
              $('#reference_number').val() == '' ?getAdditionalServiceTypeBydestinationId(''):'';
           
         }
     });

}



function getNationalityByDestination(){
   $('.div_total_fee').hide();
   $('#push_option_name option[value=""]').html('Please Select');
     var destination_id = $('#destination_id').val();
    //  console.log(destination_id);
     $.ajax({
        type: "POST", 
        data: {'gofor':'getNationalityByDestination','destination_id':destination_id},
        dataType: "json",
        url:"ajax_form.php",
         success: function(data) {
          //  console.log(data);
           var straS = '';
           var datac = data;
           straS =  straS+'<option value="">Select Nationality</option>';
           $.each(datac['countryList'], function(i, data){
                   var selS="";
                   if(destination_id >0 && data.destinationId==destination_id){
                     selS ="selected='selected'";
                   }
                   straS = straS+'<option value="'+data.destinationId+'" '+selS+'>'+data.destinationName+'</option>';
               });
               $('#nationality_id').html(straS);
               var livingbyip='<option value="">Select Leaving</option>'; 
                   livingbyip+='<option value="'+data.livingbyip.destinationId+'" selected> '+ data.livingbyip.destinationName+'</option>'; 
                   $('#livingin_id').html(livingbyip);
                   $('#reference_number').val() == '' ?  getVTypeOfDestination(''):'';
               //getAdditionalServiceTypeBydestinationId('');
           
         }
     });

}



    function getMonthFromString(mon){
      var d = Date.parse(mon + "1, 2012");
      if(!isNaN(d)){
         var mm = new Date(d).getMonth() + 1;
          if (mm < 10) {
            mm = '0' + mm;
          }
         return mm;
      }
      return -1;
    }
    
    function is_gcc_residence(is_enable,msg){
           if(is_enable==1){
               $('.is_gccc_residencelable').text(msg );
               $('.is_gccc_residence').css('display','block');
               $('#gcc_residence').addClass("validate-form ");
           }else{
               $('#gcc_residence').removeClass("validate-form ");
               $('.is_gccc_residence').css('display','none');
           }
     }
     
    function calculateothercal(class_name) {
     $('.' + class_name).each(function () {
       $(this).change(function () {
         var isCheckedThis = $(this).prop('checked')
         $('.' + class_name).prop('checked', false)
         let returnvalue = false
         if (isCheckedThis === true) {
           $(this).attr('checked', 'checked')
         }
       })
     })
   }
   
   
   function showCheckboxes () {
     var expanded = false
     var checkboxes = document.getElementById('checkboxes')
     if (!expanded) {
       checkboxes.style.display = 'block'
       expanded = true
     } else {
       checkboxes.style.display = 'none'
       expanded = false
     }
   }

jQuery(document).ready(function($) {
     function resizeContent(){
     var header = document.querySelector('.upperSection');
   
     var header_height = header.offsetHeight +10+ "px";
     $( '#quick-facts' ).css( {'scroll-margin-top': header_height});
     $( '#things-to-be-done' ).css( {'scroll-margin-top': header_height});
     $( '#travel-guide' ).css( {'scroll-margin-top': header_height});
     $( '#testimonials' ).css( {'scroll-margin-top': header_height});
     $( '#faqs' ).css( {'scroll-margin-top': header_height});
     $( '#contact' ).css( {'scroll-margin-top': header_height});
     }
     resizeContent();
     $(window).resize(resizeContent);
});


function validateTravelDetails(btns){ 
		
  if(btns.value == 'popupexpressyes'){
    $('#submit_r').attr('data-submitType',"click");
    $('.popupBG').css("display","none");
  $('#IDRpopUpBody').css("display","none");
    return false;
  }
  else if(btns.value == 'popupexpressno'){
     $('#submit_r').attr('data-submitType',"auto");
    $('#submit_r').click();
    $('.popupBG').css("display","none");
  $('#IDRpopUpBody').css("display","none");
  }else if(btns.value == 'popuptravelyes'){
    $('#IDRpopUpBody').css("opacity","0");
    $('.paymentloader-overlay').show();
    submitpopup('yes');
    submitpopup('yes').then(()=>{
    $('#submit_r').attr('data-submitType',"auto");
   
    $('#submit_r').click();
 })
  }else if(btns.value == 'popuptravelno') {
    $('#IDRpopUpBody').css("opacity","0");
      $('.paymentloader-overlay').show();
      submitpopup('no');
      submitpopup('no').then(()=>{
          $('#insurance_id').val('');
          $('#submit_r').attr('data-submitType',"auto");
          $('#submit_r').click();
   })
  }else{}
  let submitType = $('#submit_r').attr('data-submitType');

  if(submitType == 'auto'){
    $('.popupBG').css("display","none");
    $('#IDRpopUpBody').css("display","none");
    return true;
  }
  
  var formnew = document.vForm;
var flagnew = 0;
  if($('#reference_number').val()==''){ 
    // console.log('okk');
  if(formnew.destination_id.value == 'K29xRlF6MTV6cnRxSncyRXpMVlhQdz09' && (formnew.country_type.value == 'G2' ||  formnew.country_type.value == 'G3' || formnew.country_type.value == 'G4')){
    if(formnew.gcc_residence.value!=""){				
      $('#gcc_residence').removeClass('error');
      
    }else{
      flagnew=1;
      $('#gcc_residence').addClass('error');
      formnew.gcc_residence.focus();
    }
      
    }
   }
   if(formnew.destination_id.value!=""){				
    $('#destination_id').removeClass('error');
    
  }else{
    flagnew=1;
    $('#destination_id').addClass('error');
    formnew.destination_id.focus();
  }
   if(formnew.nationality_id.value!=""){				
    $('#nationality_id').removeClass('error');
    
  }else{
    flagnew=1;
    $('#nationality_id').addClass('error');
    formnew.nationality_id.focus();
  }
  if(formnew.git_type_id.value!=""){				
    $('#git_type_id').removeClass('error');
    
  }else{
    flagnew=1;
    $('#git_type_id').addClass('error');
    formnew.git_type_id.focus();
  }
    if(formnew.first_name.value!=""){				
    $('#first_name').removeClass('error');
    
  }else{
    flagnew=1;
    $('#first_name').addClass('error');
    formnew.first_name.focus();
  }
  
  if(formnew.last_name.value!=""){				
    $('#last_name').removeClass('error');
    
  }else{
    flagnew=1;
    $('#last_name').addClass('error');
    formnew.last_name.focus();
  }
  if(formnew.passport_number.value!=""){				
    $('#passport_number').removeClass('error');
    
  }else{
    flagnew=1;
    $('#passport_number').addClass('error');
    formnew.passport_number.focus();
  }
  

  if(formnew.address1.value!=""){				
    $('#address1').removeClass('error');
    
  }else{
    flagnew=1;
    $('#address1').addClass('error');
    formnew.address1.focus();
  }
  
  if(formnew.state.value!=""){				
    $('#state').removeClass('error');
    
  }else{
    flagnew=1;
    $('#state').addClass('error');
    formnew.state.focus();
  }
  
  if(formnew.email_id.value!=""){				
    $('#email_id').removeClass('error');
    
  }else{
    flagnew=1;
    $('#email_id').addClass('error');
    formnew.state.focus();
  }
  
  if(formnew.pincode.value!=""){				
    $('#pincode').removeClass('error');
    
  }else{
    flagnew=1;
    $('#pincode').addClass('error');
    formnew.pincode.focus();
  }
  
  if(formnew.city.value!=""){
    $('#city').removeClass('error');
  }else{
    flagnew=1;
    $('#city').addClass('error');
    formnew.city.focus();
  }

   if(formnew.start_date_day.value!=""){			
    $('#start_date_day').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_day').addClass('error');
  }
  if(formnew.start_date_month.value!=""){			
    $('#start_date_month').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_month').addClass('error');
  }
  if(formnew.start_date_year.value!=""){			
    $('#start_date_year').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_year').addClass('error');
  }
  
  if(formnew.start_date_day.value!="" && formnew.start_date_month.value!='' && formnew.start_date_year.value!=''){
    var travelDate = formnew.start_date_year.value+'-'+getMonthFromString(formnew.start_date_month.value)+'-'+formnew.start_date_day.value;  	
     if(travelDate < todayVal){
       flagnew=1;
         $('#start_date_year').addClass('error');
       $('#start_date_month').addClass('error');
       $('#start_date_day').addClass('error');
       
     }
  }
  
   if(formnew.start_date_dayPass.value!=""){			
    $('#start_date_dayPass').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_dayPass').addClass('error');
  }
  if(formnew.start_date_monthPass.value!=""){			
    $('#start_date_monthPass').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_monthPass').addClass('error');
  }
  if(formnew.start_date_yearPass.value!=""){			
    $('#start_date_yearPass').removeClass('error');
  }else{
    flagnew=1;
    $('#start_date_yearPass').addClass('error');
  }
  
  

// ---- Arrival DATE ----
  
if((formnew.start_date_year.value % 4 == 0) && (formnew.start_date_year.value % 100 != 0) || (formnew.start_date_year.value % 400 == 0)){   
if(getMonthFromString(formnew.start_date_month.value) == "02"){	
  if(formnew.start_date_day.value > 29){	
     flagnew=1;
         $('#start_date_year').addClass('error');
       $('#start_date_month').addClass('error');
       $('#start_date_day').addClass('error');
        }
    }	
}else
{
if(getMonthFromString(formnew.start_date_month.value) == "02"){	
  if(formnew.start_date_day.value > 28){	
     flagnew=1;
         $('#start_date_year').addClass('error');
       $('#start_date_month').addClass('error');
       $('#start_date_day').addClass('error');
        }
    }			
}

if(getMonthFromString(formnew.start_date_month.value) == "04" || getMonthFromString(formnew.start_date_month.value) == "06" || getMonthFromString(formnew.start_date_month.value) == "09" || getMonthFromString(formnew.start_date_month.value) == "11"){	
  if(formnew.start_date_day.value > 30){	
       flagnew=1;
         $('#start_date_year').addClass('error');
       $('#start_date_month').addClass('error');
       $('#start_date_day').addClass('error');
        }
}

// ---  Passport Expiry Day ----	

if(formnew.start_date_yearPass.value!="" && formnew.start_date_monthPass.value!='' && formnew.start_date_dayPass.value!=''){
    var passportDate = formnew.start_date_yearPass.value+'-'+getMonthFromString(formnew.start_date_monthPass.value)+'-'+formnew.start_date_dayPass.value;  	
     if(passportDate < todayVal){
       flagnew=1;
         $('#start_date_dayPass').addClass('error');
       $('#start_date_monthPass').addClass('error');
       $('#start_date_yearPass').addClass('error');
       
     }
  }

  
if((formnew.start_date_yearPass.value % 4 == 0) && (formnew.start_date_yearPass.value % 100 != 0) || (formnew.start_date_yearPass.value % 400 == 0)){   
if(getMonthFromString(formnew.start_date_monthPass.value) == "02"){	
  if(formnew.start_date_dayPass.value > 29){	
     flagnew=1;
         $('#start_date_yearPass').addClass('error');
       $('#start_date_monthPass').addClass('error');
       $('#start_date_dayPass').addClass('error');
        }
    }	
}else
{
if(getMonthFromString(formnew.start_date_monthPass.value) == "02"){	
  if(formnew.start_date_dayPass.value > 28){	
     flagnew=1;
          $('#start_date_yearPass').addClass('error');
       $('#start_date_monthPass').addClass('error');
       $('#start_date_dayPass').addClass('error');
        }
    }			
}

if(getMonthFromString(formnew.start_date_monthPass.value) == "04" || getMonthFromString(formnew.start_date_monthPass.value) == "06" || getMonthFromString(formnew.start_date_monthPass.value) == "09" || getMonthFromString(formnew.start_date_monthPass.value) == "11"){	
  if(formnew.start_date_dayPass.value > 30){	
       flagnew=1;
       $('#start_date_yearPass').addClass('error');
     $('#start_date_monthPass').addClass('error');
     $('#start_date_dayPass').addClass('error');
        }
}				
  
  if(document.getElementById('mobile').value!=""){
    $('#mobile').removeClass('error');
  }else{
    flagnew=1;
    $('#mobile').addClass('error');
    formnew.mobile.focus();
  }
  
  if(document.getElementById('country_isd_code').value!=""){
    $('#country_isd_code').removeClass('error');
  }else{
    flagnew=1;
    $('#country_isd_code').addClass('error');
    formnew.country_isd_code.focus();
  }
  
  if(document.getElementById('acceptterms').checked==true) {
    $('#checkTerms').removeClass('error');
  }
  else{
    flagnew=1;
    $('#checkTerms').addClass('error');
  }
  
if(formnew.personal_dob_day.value!=""){			
  $('#personal_dob_day').removeClass('error');
}else{
  flagnew=1;
  $('#personal_dob_day').addClass('error');
}
if(formnew.personal_dob_month.value!=""){			
  $('#personal_dob_month').removeClass('error');
}else{
  flagnew=1;
  $('#personal_dob_month').addClass('error');
}
if(formnew.personal_dob_year.value!=""){			
  $('#personal_dob_year').removeClass('error');
}else{
  flagnew=1;
  $('#personal_dob_year').addClass('error');
}

if((formnew.personal_dob_year.value % 4 == 0) && (formnew.personal_dob_year.value % 100 != 0) || (formnew.personal_dob_year.value % 400 == 0)){   
if(getMonthFromString(formnew.personal_dob_month.value) == "02"){	
  if(formnew.personal_dob_day.value > 29){	
     flagnew=1;
          $('#personal_dob_day').addClass('error');
       $('#personal_dob_month').addClass('error');
       $('#personal_dob_year').addClass('error');
        }
    }	
}else
{
if(getMonthFromString(formnew.personal_dob_month.value) == "02"){	
  if(formnew.personal_dob_day.value > 28){	
     flagnew=1;
         $('#personal_dob_day').addClass('error');
       $('#personal_dob_month').addClass('error');
       $('#personal_dob_year').addClass('error');
        }
    }			
}

if(getMonthFromString(formnew.personal_dob_month.value) == "04" || getMonthFromString(formnew.personal_dob_month.value) == "06" || getMonthFromString(formnew.personal_dob_month.value) == "09" || getMonthFromString(formnew.personal_dob_month.value) == "11"){	
  if(formnew.personal_dob_day.value > 30){	
       flagnew=1;
          $('#personal_dob_day').addClass('error');
       $('#personal_dob_month').addClass('error');
       $('#personal_dob_year').addClass('error');
        }
}


if(formnew.personal_dob_year.value!="" && formnew.personal_dob_month.value!='' && formnew.personal_dob_day.value!=''){
   var birthDate = formnew.personal_dob_year.value+'-'+getMonthFromString(formnew.personal_dob_month.value)+'-'+formnew.personal_dob_day.value;
     if(birthDate > todayVal){
       flagnew=1;
         $('#personal_dob_day').addClass('error');
       $('#personal_dob_month').addClass('error');
       $('#personal_dob_year').addClass('error');
       
     }
 }	

  //  --------- Date Validation End  ------
//   alert(flagnew);

//File uploading CCode

function filephotoValidation() {
  var filephotoInput = document.getElementById('additional_document5_upload');
  var filephotoInputpath = filephotoInput.value;

  var allowedExtensions = /(\.jpg|\.jpeg|\.jpe|\.jif|\.jfif|\.jfi|\.jp2|\.j2k|\.jpf|\.jpx|\.jpm|\.jxr|\.hdp|\.mj2|\.png|\.gif|\.webp|\.tiff|\.tif|\.psd|\.cdr|\.xcf|\.raw|\.arw|\.cr2|\.sr2|\.nrw|\.nef|\.pef|\.orf|\.k25|\.bmp|\.dib|\.heif|\.heic|\.ind|\.indd|\.indt|\.svg|\.svgz|\.ai|\.pdf|\.eps|\.Exif|\.ppm|\.pgm|\.pbm|\.pnm|\.hdr|\.rgbe|\.bpg|\.iff|\.lbm|\.drw|\.ecw|\.fits|\.fit|\.fts|\.flif|\.ico|\.wdp|\.liff|\.nrrd|\.pam|\.sgi|\.rgb|\.rgba|\.bw|\.int|\.inta|\.sid|\.ras|\.sun|\.tga|\.icb|\.vda|\.vst|\.vicar|\.afp|\.ies|\.cpt|\.kra|\.pdn|\.tub|\.psp|\.sai|\.psb|\.rle|\.dib|\.tdi|\.pcx|\.pdp|\.pxr|\.sct)$/i;

  if (!allowedExtensions.exec(filephotoInputpath)) {
      flagnew=1
    
  }
}


function filepassportValidation() {
  var filepassportInput = document.getElementById('passport_copy_upload');
    var filepassportInputpath = filepassportInput.value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.jpe|\.jif|\.jfif|\.jfi|\.jp2|\.j2k|\.jpf|\.jpx|\.jpm|\.jxr|\.hdp|\.mj2|\.png|\.gif|\.webp|\.tiff|\.tif|\.psd|\.cdr|\.xcf|\.raw|\.arw|\.cr2|\.sr2|\.nrw|\.nef|\.pef|\.orf|\.k25|\.bmp|\.dib|\.heif|\.heic|\.ind|\.indd|\.indt|\.svg|\.svgz|\.ai|\.pdf|\.eps|\.Exif|\.ppm|\.pgm|\.pbm|\.pnm|\.hdr|\.rgbe|\.bpg|\.iff|\.lbm|\.drw|\.ecw|\.fits|\.fit|\.fts|\.flif|\.ico|\.wdp|\.liff|\.nrrd|\.pam|\.sgi|\.rgb|\.rgba|\.bw|\.int|\.inta|\.sid|\.ras|\.sun|\.tga|\.icb|\.vda|\.vst|\.vicar|\.afp|\.ies|\.cpt|\.kra|\.pdn|\.tub|\.psp|\.sai|\.psb|\.rle|\.dib|\.tdi|\.pcx|\.pdp|\.pxr|\.sct)$/i;

  if (!allowedExtensions.exec(filepassportInputpath)) {
      flagnew=1
  
  }
}
//File types validation

if ($('#document_upload_val') == "1" && $('#passport_copy_upload').get(0).files.length != 0) {
  filepassportValidation();
}

if ($('#document_upload_val') == "1" && $('#additional_document5_upload').get(0).files.length != 0) {
  filephotoValidation();
}

  
  if(flagnew==1){
      return false;
  }else{		
  if(btns.value == 'Add Another Person'){
    $('#insurance_id').val('');
    return true;
  }

  if($('#additional_service_status').val() == 0){
    return true;
  }
  
      var selectedDay = $("#start_date_day").val();
              var selectedMonth = $("#start_date_month").find(':selected').attr('idd');
              var selectedYear = $("#start_date_year").val();

              var selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
      
              var today = new Date();
              var tomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);

              if (
                  selectedDate.toDateString() === today.toDateString() ||
                  selectedDate.toDateString() === tomorrow.toDateString()
              ) {
        if(btns.value == 'Submit Application'){
          if($('#express_count').val() == 1 && $('#push_option_name').val().search('Express') == -1){
    
            popupmessage('Travel dates are extremely close so do you want to Opt for Express Service ?',
            `Expedite your Visa processing with Express Service.`,'express');
            return false;
          }

          if($('#insurance_count').val() == 1 && $('#push_option_name').val().search('Travel Insurance') == -1){
            popupmessage('Would you like to opt for Travel Insurance?',
            `Travel Insurance, with COVID-19 coverage is mandatory, 
            as per the Government directive. 
            Book the Government approved travel insurance along with your to avail a 
            flat discount of $100 on the insurance fee.`,'travel');
            
            return false;
          }
        }
              } else {
        if( $('#push_option_name').val().search('Travel Insurance') == -1){
            // $('.popuptexthead').text('Would you like to opt for Travel Insurance?.');
            // $('.popuppara').text('Travel Insurance, with COVID-19 coverage is mandatory, as per the Turkey Government directive. Book the Government approved travel insurance along with your to avail a flat discount of $100 on the insurance fee.');

            // $('.popupBG').show();
            // $('#IDRpopUpBody').show();
            popupmessage('Would you like to opt for Travel Insurance?',
            `Travel Insurance, with COVID-19 coverage is mandatory, 
            as per the Government directive. 
            Book the Government approved travel insurance along with your to avail a 
            flat discount of $100 on the insurance fee.`);
            
            return false;
          }
              }
  return true;
   
  }
}

function popupmessage(heading, para,type){
  $('.popuptexthead').text(heading);
  $('.popuppara').text(para);

  $('.popupBG').show();
  $('#IDRpopUpBody').show();

  if(type == 'express'){
    $('.yes').val('popupexpressyes');
    $('.no').val('popupexpressno');
  }else{
    $('.yes').val('popuptravelyes');
    $('.no').val('popuptravelno');
  }
  
}

function validateAddMore(){
  top.window.onbeforeunload = null;

    var formnew = document.vForm;
	var flagnew = 0;
	    $.each($('.validate-form'), function (index, element) {
		if (
		  element.name != 'livingin_id' ||
		  element.name != 'destination_id' ||
		  element.name != 'git_type_id'
			) {
		  if ($(element).val() != '') {
			$(element).removeClass('error')
		  } else {
			flagnew = 1
			$(element).addClass('error')
			$(element).focus()
		  }
		}
	  })
	    if(formnew.first_name.value!=""){				
			$('#first_name').removeClass('error');
			
		}else{
			flagnew=1;
			$('#first_name').addClass('error');
			formnew.first_name.focus();
		}
		if(formnew.last_name.value!=""){				
			$('#last_name').removeClass('error');
			
		}else{
			flagnew=1;
			$('#last_name').addClass('error');
			formnew.last_name.focus();
		}
		if(formnew.passport_number.value!=""){				
			$('#passport_number').removeClass('error');
			
		}else{
			flagnew=1;
			$('#passport_number').addClass('error');
			formnew.passport_number.focus();
		}
		
		 if(formnew.start_date_dayPass.value!=""){			
			$('#start_date_dayPass').removeClass('error');
		}else{
			flagnew=1;
			$('#start_date_dayPass').addClass('error');
		}
		if(formnew.start_date_monthPass.value!=""){			
			$('#start_date_monthPass').removeClass('error');
		}else{
			flagnew=1;
			$('#start_date_monthPass').addClass('error');
		}
		if(formnew.start_date_yearPass.value!=""){			
			$('#start_date_yearPass').removeClass('error');
		}else{
			flagnew=1;
			$('#start_date_yearPass').addClass('error');
		}
		
	if(formnew.personal_dob_day.value!=""){			
		$('#personal_dob_day').removeClass('error');
	}else{
		flagnew=1;
		$('#personal_dob_day').addClass('error');
	}
	if(formnew.personal_dob_month.value!=""){			
		$('#personal_dob_month').removeClass('error');
	}else{
		flagnew=1;
		$('#personal_dob_month').addClass('error');
	}
	if(formnew.personal_dob_year.value!=""){			
		$('#personal_dob_year').removeClass('error');
	}else{
		flagnew=1;
		$('#personal_dob_year').addClass('error');
	}
	
	if((formnew.personal_dob_year.value % 4 == 0) && (formnew.personal_dob_year.value % 100 != 0) || (formnew.personal_dob_year.value % 400 == 0)){   
	if(getMonthFromString(formnew.personal_dob_month.value) == "02"){	
		if(formnew.personal_dob_day.value > 29){	
			 flagnew=1;
			      $('#personal_dob_day').addClass('error');
				 $('#personal_dob_month').addClass('error');
				 $('#personal_dob_year').addClass('error');
      		}
		  }	
	}else
	{
	if(getMonthFromString(formnew.personal_dob_month.value) == "02"){	
		if(formnew.personal_dob_day.value > 28){	
			 flagnew=1;
			     $('#personal_dob_day').addClass('error');
				 $('#personal_dob_month').addClass('error');
				 $('#personal_dob_year').addClass('error');
      		}
		  }			
	}

	if(getMonthFromString(formnew.personal_dob_month.value) == "04" || getMonthFromString(formnew.personal_dob_month.value) == "06" || getMonthFromString(formnew.personal_dob_month.value) == "09" || getMonthFromString(formnew.personal_dob_month.value) == "11"){	
		if(formnew.personal_dob_day.value > 30){	
				 flagnew=1;
			      $('#personal_dob_day').addClass('error');
				 $('#personal_dob_month').addClass('error');
				 $('#personal_dob_year').addClass('error');
      		}
}
	if(formnew.personal_dob_year.value!="" && formnew.personal_dob_month.value!='' && formnew.personal_dob_day.value!=''){
		 var birthDate = formnew.personal_dob_year.value+'-'+getMonthFromString(formnew.personal_dob_month.value)+'-'+formnew.personal_dob_day.value;
			 if(birthDate > todayVal){
				 flagnew=1;
			     $('#personal_dob_day').addClass('error');
				 $('#personal_dob_month').addClass('error');
				 $('#personal_dob_year').addClass('error');
				 
			 }
	 }	
	

// ---  Passport Expiry Day ----	

if(formnew.start_date_yearPass.value!="" && formnew.start_date_monthPass.value!='' && formnew.start_date_dayPass.value!=''){
		  var passportDate = formnew.start_date_yearPass.value+'-'+getMonthFromString(formnew.start_date_monthPass.value)+'-'+formnew.start_date_dayPass.value;  	
			 if(passportDate < todayVal){
				 flagnew=1;
			     $('#start_date_dayPass').addClass('error');
				 $('#start_date_monthPass').addClass('error');
				 $('#start_date_yearPass').addClass('error');
				 
			 }
		}	
		
if((formnew.start_date_yearPass.value % 4 == 0) && (formnew.start_date_yearPass.value % 100 != 0) || (formnew.start_date_yearPass.value % 400 == 0)){   
	if(getMonthFromString(formnew.start_date_monthPass.value) == "02"){	
		if(formnew.start_date_dayPass.value > 29){	
			 flagnew=1;
			     $('#start_date_yearPass').addClass('error');
				 $('#start_date_monthPass').addClass('error');
				 $('#start_date_dayPass').addClass('error');
      		}
		  }	
	}else
	{
	if(getMonthFromString(formnew.start_date_monthPass.value) == "02"){	
		if(formnew.start_date_dayPass.value > 28){	
			 flagnew=1;
			      $('#start_date_yearPass').addClass('error');
				 $('#start_date_monthPass').addClass('error');
				 $('#start_date_dayPass').addClass('error');
      		}
		  }			
	}

	if(getMonthFromString(formnew.start_date_monthPass.value) == "04" || getMonthFromString(formnew.start_date_monthPass.value) == "06" || getMonthFromString(formnew.start_date_monthPass.value) == "09" || getMonthFromString(formnew.start_date_monthPass.value) == "11"){	
		if(formnew.start_date_dayPass.value > 30){	
				 flagnew=1;
		     $('#start_date_yearPass').addClass('error');
			 $('#start_date_monthPass').addClass('error');
			 $('#start_date_dayPass').addClass('error');
      		}
}		


  //File uploading CCode

		function filephotoValidation() {
		var filephotoInput = document.getElementById('additional_document5_upload');
		var filephotoInputpath = filephotoInput.value;

		var allowedExtensions = /(\.jpg|\.jpeg|\.jpe|\.jif|\.jfif|\.jfi|\.jp2|\.j2k|\.jpf|\.jpx|\.jpm|\.jxr|\.hdp|\.mj2|\.png|\.gif|\.webp|\.tiff|\.tif|\.psd|\.cdr|\.xcf|\.raw|\.arw|\.cr2|\.sr2|\.nrw|\.nef|\.pef|\.orf|\.k25|\.bmp|\.dib|\.heif|\.heic|\.ind|\.indd|\.indt|\.svg|\.svgz|\.ai|\.pdf|\.eps|\.Exif|\.ppm|\.pgm|\.pbm|\.pnm|\.hdr|\.rgbe|\.bpg|\.iff|\.lbm|\.drw|\.ecw|\.fits|\.fit|\.fts|\.flif|\.ico|\.wdp|\.liff|\.nrrd|\.pam|\.sgi|\.rgb|\.rgba|\.bw|\.int|\.inta|\.sid|\.ras|\.sun|\.tga|\.icb|\.vda|\.vst|\.vicar|\.afp|\.ies|\.cpt|\.kra|\.pdn|\.tub|\.psp|\.sai|\.psb|\.rle|\.dib|\.tdi|\.pcx|\.pdp|\.pxr|\.sct)$/i;

		if (!allowedExtensions.exec(filephotoInputpath)) {
			flagnew=1
			
		}
		}


		function filepassportValidation() {
		var filepassportInput = document.getElementById('passport_copy_upload');
			var filepassportInputpath = filepassportInput.value;

		// Allowing file type
		var allowedExtensions = /(\.jpg|\.jpeg|\.jpe|\.jif|\.jfif|\.jfi|\.jp2|\.j2k|\.jpf|\.jpx|\.jpm|\.jxr|\.hdp|\.mj2|\.png|\.gif|\.webp|\.tiff|\.tif|\.psd|\.cdr|\.xcf|\.raw|\.arw|\.cr2|\.sr2|\.nrw|\.nef|\.pef|\.orf|\.k25|\.bmp|\.dib|\.heif|\.heic|\.ind|\.indd|\.indt|\.svg|\.svgz|\.ai|\.pdf|\.eps|\.Exif|\.ppm|\.pgm|\.pbm|\.pnm|\.hdr|\.rgbe|\.bpg|\.iff|\.lbm|\.drw|\.ecw|\.fits|\.fit|\.fts|\.flif|\.ico|\.wdp|\.liff|\.nrrd|\.pam|\.sgi|\.rgb|\.rgba|\.bw|\.int|\.inta|\.sid|\.ras|\.sun|\.tga|\.icb|\.vda|\.vst|\.vicar|\.afp|\.ies|\.cpt|\.kra|\.pdn|\.tub|\.psp|\.sai|\.psb|\.rle|\.dib|\.tdi|\.pcx|\.pdp|\.pxr|\.sct)$/i;

		if (!allowedExtensions.exec(filepassportInputpath)) {
			flagnew=1

		}
		}
		//File types validation

		if ($('#document_upload_val') == "1" && $('#passport_copy_upload').get(0).files.length != 0) {
		filepassportValidation();
		}

		if ($('#document_upload_val') == "1" && $('#additional_document5_upload').get(0).files.length != 0) {
		filephotoValidation();
		}

    if(flagnew==1){
        return false;
    }else{			
	   return true;			
    }
}


function ShowLoading(e) {
    document.getElementById(e).style.display = '';
    return true;   
    
}
function addDays(theDate, days) {
return new Date(theDate.getTime() + days*24*60*60*1000);
}

function formatDate(rawDate) {
var day = ("0" + rawDate.getDate()).slice(-2);
var month = ("0" + (rawDate.getMonth() + 1)).slice(-2);
return rawDate.getFullYear() + "-" + (month) + "-" + (day);
}

var now = new Date();
var passportExp  = formatDate(addDays(now, 1));
var todayVal     = formatDate(addDays(now, 0));
var sevenBackVal = formatDate(addDays(now, -7));

  var today = new Date();
  today.setDate(today.getDate());
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();
   if(dd<10){
       dd='0'+dd
   } 
   if(mm<10){
       mm='0'+mm
   } 
   var endYear =2030;
   var today = mm+'/'+dd+'/'+yyyy;
   
  
    

var body = document.getElementsByClassName('wrapper')
var checkboxess = document.getElementById('checkboxes')
var except = document.getElementById('except')
if (checkboxess != null) {
  body[0].addEventListener(
    'click',
    function () {
      document.getElementById('checkboxes').style.display = 'none'
    },
    false
  )
}
if (except != null) {
  except.addEventListener(
    'click',
    function (ev) {
      ev.stopPropagation()
    },
    false
  )
}

var messageArrayInsurance = [
  'Processing Visa application in the System.',
  'Generating Your Visa Application Reference Number',
  'Adding your travel insurance to the application as requested.',
  'We are now in the final steps of generating the payment link for you.',
  'Redirecting & You may proceed to make the payment now. Thank you!'
]

var messageArrayWithoutInsurance = [
  'Processing Visa application in the System.',
  'Generating Your Visa Application Reference Number',
   'We are now in the final steps of generating the payment link for you.',
  'Redirecting & You may proceed to make the payment now. Thank you!'
]

function submitpopup(type){
  
  return new Promise((resolve, reject) => {
                   
                      
                      
      type == 'yes' ? messageArrayInsurance.forEach((item, index, arr) => { 
          
       setTimeout(() => {

       $('.slides-new').html(`<li class=slide><p>${item}</p></li>`);

       if(index == arr.length - 1){
           resolve(true);
       }
   },index * 2000)
           })  :

      messageArrayWithoutInsurance.forEach((item, index, arr) => { 
  
      setTimeout(() => {
  
      $('.slides-new').html(`<li class=slide><p>${item}</p></li>`);

      if(index == arr.length - 1){
          resolve(true);
      }
  },index* 2000)
          }) 

})
}