
$(document).ready(function(){
	builderIndex();
	calculateMoney();
	setRemove();
	$("#addItemButton").click(
		function(){
			$("#items").children("div").last().after($("#items").children("div").first().clone());
			setRemove();
			$("#items").find("button").attr("disabled",false);
			builderIndex();
			$(".money").change(
				function(){
					calculateMoney();
				}
			);
			calculateMoney();
		}
	);
	$(".money").change(
		function(){
			calculateMoney();
		}
	);
	$("#cause").change(
		function(){
			calculateMoney();
		}
	)
});// JavaScript Document

function builderIndex(){
	$.each($("#items").children(),function(i,val){
		$("#items").children("div").eq(i).children().eq(0).find("select").attr("name","items["+i+"].item");
		$("#items").children("div").eq(i).children().eq(1).find("input").attr("name","items["+i+"].amount");
		$("#items").children("div").eq(i).children().eq(2).find("input").attr("name","items["+i+"].comment");

	});
}
function calculateMoney(){
	var totalMoney=0;
	var totalReimbursementMoney=0;
	$.each($(".money"),function(i,val){
		totalMoney+=parseFloat($(".money").eq(i).val());
	});
	var select = document.getElementById("cause");
	var option = select.options;
	var index=select.selectedIndex;

	if (isNaN(totalMoney)||totalMoney==0){
		$("#totalMoney").attr("value","");
		$("#totalReimbursementMoney").attr("value","");
	}else{
		$("#totalMoney").attr("value",totalMoney);
		switch($("#cause option:selected").val()){
			case "ѧ��":
			case "��ְְ��":
			case "����Ⱥ��":
				if(totalMoney <= 1300)
					$("#totalReimbursementMoney").attr("value",0.8*totalMoney);
				else
					$("#totalReimbursementMoney").attr("value",0.9*totalMoney);
				break;
			case "������Ա":
			case "������Ա":
				if(totalMoney <= 1300)
					$("#totalReimbursementMoney").attr("value",0.9*totalMoney);
				else
					$("#totalReimbursementMoney").attr("value",totalMoney);
				break;
			default:
				window.alert("û��ƥ��");
				totalMoney = -6;
		}
	}
}


function setRemove(){
	$("#items").children("div").children("div").find("button").click(
		function(){
			$(this).parent().parent().remove();
			if($("#items").children("div").size()==1){
				$("#items").find("button").attr("disabled",true);
			}
			builderIndex();
			calculateMoney();
		}
	);
}