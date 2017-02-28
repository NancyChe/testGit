//XMLHttpRequest对象
var xmlHttpReq = null;

//创建XMLHttpRequest
function createXMLHttpRequest(){
	if(window.XMLHttpRequest){
		xmlHttpReq = new XMLHttpRequest();
	}else{
		try{
			xmlHttpReq = new ActiveXObject("MSXML2.XMLHTTP");
		}catch(e){
			try{
				xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){}
		}
	}
	if(!xmlHttpReq){
		alert("当前浏览器不支持");
		return null;
	}
}

//Ajax请求
function sendData(value,url){
	createXMLHttpRequest();
	xmlHttpReq.open("POST",url,false);
	xmlHttpReq.setRequestHeader("Content-Type","application/json;charset=utf-8");
	xmlHttpReq.send(value);
	return xmlHttpReq.responseText;	
}

	function load(){
		var collection = sendData(null, "stlist.do");
		var title = document.getElementById("title");
		if(collection!=null){
			//show list
			var data = JSON.parse(collection);
			var html="";
			for(var i=0;i<data.length;i++){
				
				html+="<tr><td>"+data[i].id+"</td><td>"+data[i].stNo+"</td><td>"+data[i].stName+"</td><td>"+data[i].stSex+"</td><td>"+data[i].stMajor+"</td><td><a>修改</a>&nbsp;<a>删除</a></td></tr>";

				
			}
			document.getElementById("title").innerHTML=html;
		}
	}
	
	


	function loadData(){
		var collection = sendData(null,"stlist.do");
		if(collection != null){
			//parse用于从一个字符串解析出一个json对象
			return JSON.parse(collection);
		}else{
			return [];
		}
	}
	
	function postaction () {
		var save = document.getElementById("form");
		if(save == ""){
			alert("save can not be empty, please fill in");
		}else{
			var todo = '{"stNo":"'+stNo.value+'","stName":"'+stName.value+'","stSex":"'+stSex.value+'","stMajor":"'+stMajor.value+'"}';
			// 向后端发送数据
			sendData(todo,"stadd.do");
			alert("添加成功");
			
			load();
			
		}
	}

	// remove stu
	function del(index){
		sendData(index+","+uip,"stdelete.do");
		load();
	}
	window.onload = load();
	//form submit
	var form = document.getElementById("form");
	form.addEventListener("submit",postaction,false);
	
	
