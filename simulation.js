define("DS/Simulation/scripts/Simulation",
[
	"UWA/Drivers/jQuery",
	"DS/UIKIT/Form",
	"DS/UIKIT/Toggler",
	"DS/WAFData/WAFData",
	"DS/UIKIT/Input/Select",
	"DS/UIKIT/SuperModal",
	"DS/UIKIT/Modal",
	"DS/UIKIT/Input/Text"

], function(
	$,
	Form,
	Toggler,
	WAFData,
	Select,
	SuperModal,
	Modal,
	Text
){

var myWidget = {
	
	widgetURL:"",	
	Type:"",
	fullData : [],	
	  templatePref: "",
	connectedProductInfo:{},  
	jsonArray: [],
	elemId: "#Bio_Product",
	dataResp: [],
	relatedObjectsData: [],
		
         onTypeSelection: function () {
			
		 //debugger;
		 console.log("inside onTypeSelection");
                templatePref = widget.getValue('RunStatus_Template');
                var wdgUrl = widget.getUrl();
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
            var url = wdgUrl + "/SimulationWidget/SimulationWidgetSevice/Preference";
                WAFData.authenticatedRequest(url, {
                    method: 'GET',
                    crossOrigin: true,
                    type: 'jsonp',
                    timeout: 700000,
                    accept: 'application/json',
                    data: {
                        preference: templatePref
                    },
                    onComplete: function (dataResp) {
                        console.log("\n\n dataResp"+dataResp);
                        jsonArray = JSON.stringify(dataResp);
						//console.log("myWidget.allTasks.taskData"+myWidget.allTasks.taskData);
                        jsonArray = JSON.parse(dataResp);
						
                        myWidget.allTasks = jsonArray;
                        myWidget.columnLabels = jsonArray.columnLabel;
                        myWidget.isMaplistEmpty = jsonArray.isMapListEmpty;
						console.log("\n \n myWidget.allTasks.taskData"+myWidget.allTasks.taskData);
						myWidget.fullData=myWidget.allTasks.taskData;
						//debugger;
						var elemId1="#Bio_Product";
						
						console.log("\n templatePref:::"+templatePref);
						//if(templatePref==="Completed" ){
						//myWidget.ListProduct(myWidget.allTasks.taskData,dataResp,elemId1);
						myWidget.ListProduct(myWidget.allTasks.taskData,dataResp,elemId1);
						//}
						
						

                    },
                    onFailure: function (error) {
                        widget.body.innerHTML += "<p>Call Faillure</p>";
                        widget.body.innerHTML += "<p>" + JSON.stringify(error) + "</p>";
                    }
				});
            },
      
      


productClick : function(objData,elemId){
	console.log("inside productClick:::::")
	
	widget.body.getElement(elemId).empty();

	var contentHtml='<nav class="tab tab-pills" id="Biovia_Product"><a class="tab-item" id="productInformation">Product Information</a><a class="tab-item" id="productHome">Product Home</a></nav><section id="BioviaProduct-bios"><section class="hideBio" id="General"></section><section class="hideBio" id="Batch"></section></section>';

	$(elemId).html(contentHtml);

	var productToggler = new Toggler({
		container: document.querySelector('#Biovia_Product'),
		bind:document.querySelector('#BioviaProduct-bios'),
		events: {
			onToggle: function () {
				var elem=arguments[0];
				if(elem.id==="productInformation"){
					//alert("general info");
					widget.body.getElement('#General').empty();
					
					
					var generalBlockHeader = UWA.createElement('div', {
                                    class: "generalBlockHeader"
                                }).inject(document.querySelector('#General'));

                        $(generalBlockHeader).append('<span class="block-header-icon fonticon fonticon-info"></span>');
                        $(generalBlockHeader).append('<span class="block-header-label">Product Attribute</span>');



					var generalBlock= UWA.createElement('div',{
						class:"generalBlock"
						}).inject(document.querySelector('#General'));

                    /**************************************************/	
                    var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Type         : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.Type
                                }).inject(generalSubBlockValue);
					/*************************************************			
								
                     var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Name         : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.Name
                                }).inject(generalSubBlockValue);
					/**************************************************/
					 var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Creation Date       : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.StartDate
                                }).inject(generalSubBlockValue);
                    /**************************************************/
					var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Title        : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.Title
                                }).inject(generalSubBlockValue);
					/**************************************************/
					var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Run Status        : "
                                }).inject(generalSubBlockValue);

                                
								if(objData.RunStatus==="Completed")
								{
									UWA.createElement('span', {
                                    class: "standard-valueCompleted",
                                    text: objData.RunStatus
                                   }).inject(generalSubBlockValue);
								}
								else if(objData.RunStatus==="Aborted")
								{
									UWA.createElement('span', {
                                    class: "standard-valueAborted",
                                    text: objData.RunStatus
                                   }).inject(generalSubBlockValue);
								}
								else if(objData.RunStatus==="Failed")
								{
									UWA.createElement('span', {
                                    class: "standard-valueFailed",
                                    text: objData.RunStatus
                                   }).inject(generalSubBlockValue);
								}
								else if(objData.RunStatus==="Running")
								{
									UWA.createElement('span', {
                                    class: "standard-valueRunning",
                                    text: objData.RunStatus
                                   }).inject(generalSubBlockValue);
								}
								else {
									UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.RunStatus
                                   }).inject(generalSubBlockValue);
								}
								
					/**************************************************/
					var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);
								
                                UWA.createElement('span', {
                                    class: "standard-label",
                                    text:"Owner        : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.Owner
                                }).inject(generalSubBlockValue);
					/**************************************************/
					var generalSubBlockValue = UWA.createElement('div', {
                                    class: "generalSubBlockValue"
                                }).inject(generalBlock);

                               
								UWA.createElement('span', {
                                    class: "standard-label",
                                  	text: "Modification Date  : "
                                }).inject(generalSubBlockValue);

                                UWA.createElement('span', {
                                    class: "standard-value",
                                    text: objData.EndDate
                                }).inject(generalSubBlockValue);
                    /**************************************************/

				}
				else if(elem.id==="productBatches"){
					//alert("batch info");
					myWidget.listBatch(objData,"#Batch");
				}
				else{
					//alert("home");
				//	myWidget.callData(elemId);
				myWidget.callData(elemId);
				//myWidget.ListProduct(jsonArray,dataResp,"#Bio_Product");
				}
			}
		}
	});
},








ListProduct : function(jsonArray,dataResp,elemId) {
   //debugger;
   widget.body.getElement(elemId).empty();
   console.log("inside ListProduct..."+templatePref);
	var objData=[];
	for(var i=0; i<jsonArray.length; i++){
		objData[i]=jsonArray[i];
         //console.log("inside completed ListProduct..."+objData[i]);
	   if(objData[i].RunStatus==="Completed")
	   {
		    var objectDiv =UWA.createElement('div',{
		    class : 'object',
			id:objData[i].Id,
			title:objData[i].Title,
			name:objData[i].Name,
			type:objData[i].Type,
			runStatus:objData[i].RunStatus,
			owner:objData[i].Owner,
			events: {
				click: function() {
					var productId=this.getAttribute("id");
                   // console.log("productId:::44444::"+productId)
					var selectedProduct={};
					for(var i=0; i<myWidget.fullData.length; i++){
						var objData=myWidget.fullData[i];
						//console.log("\n\n  myWidget.fullData[i]):::::"+myWidget.fullData[i])
					//	console.log("\n\n  objData:::::"+objData)
						if(productId===objData.Id){
							selectedProduct=objData;
							//console.log("selectedProduct:::::"+selectedProduct)
						}
					}
					//console.log("selectedProduct.Type:::::"+selectedProduct.Type)
					if(selectedProduct.Type==="Simulation Job")    // has prev value as Bio_Product
					{
						myWidget.productClick(selectedProduct,elemId);
					}	
				}
			}	}).inject(document.querySelector(elemId));
	   }
	  else if(objData[i].RunStatus==="Aborted")
	   {
		    var objectDiv =UWA.createElement('div',{
		    class : 'objectThree',
			id:objData[i].Id,
			title:objData[i].Title,
			name:objData[i].Name,
			type:objData[i].Type,
			runStatus:objData[i].RunStatus,
			owner:objData[i].Owner,
			events: {
				click: function() {
					var productId=this.getAttribute("id");
                   
					var selectedProduct={};
					for(var i=0; i<myWidget.fullData.length; i++){
						var objData=myWidget.fullData[i];
						
						if(productId===objData.Id){
							selectedProduct=objData;
						
						}
					}
					if(selectedProduct.Type==="Simulation Job")    // has prev value as Bio_Product
					{
						myWidget.productClick(selectedProduct,elemId);
					}	
				}
			}	}).inject(document.querySelector(elemId));
	   }
	   else if(objData[i].RunStatus==="Failed")   //&& templatePref==="Failed"
	   {
		    var objectDiv =UWA.createElement('div',{
		    class : 'objectTwo',
			id:objData[i].Id,
			title:objData[i].Title,
			name:objData[i].Name,
			type:objData[i].Type,
			runStatus:objData[i].RunStatus,
			owner:objData[i].Owner,
			events: {
				click: function() {
					var productId=this.getAttribute("id");
					var selectedProduct={};
					for(var i=0; i<myWidget.fullData.length; i++){
						var objData=myWidget.fullData[i];
						if(productId===objData.Id){
							selectedProduct=objData;
							//console.log("selectedProduct:::::"+selectedProduct)
						}
					}
					//console.log("selectedProduct.Type:::::"+selectedProduct.Type)
					if(selectedProduct.Type==="Simulation Job")    // has prev value as Bio_Product
					{
						myWidget.productClick(selectedProduct,elemId);
					}	
				}
			}	}).inject(document.querySelector(elemId));
	   }
	   else if(objData[i].RunStatus==="Running")   //&& templatePref==="Failed"
	   {
		    var objectDiv =UWA.createElement('div',{
		    class : 'objectFour',
			id:objData[i].Id,
			title:objData[i].Title,
			name:objData[i].Name,
			type:objData[i].Type,
			runStatus:objData[i].RunStatus,
			owner:objData[i].Owner,
			events: {
				click: function() {
					var productId=this.getAttribute("id");
					var selectedProduct={};
					for(var i=0; i<myWidget.fullData.length; i++){
						var objData=myWidget.fullData[i];
						if(productId===objData.Id){
							selectedProduct=objData;
							//console.log("selectedProduct:::::"+selectedProduct)
						}
					}
					//console.log("selectedProduct.Type:::::"+selectedProduct.Type)
					if(selectedProduct.Type==="Simulation Job")    // has prev value as Bio_Product
					{
						myWidget.productClick(selectedProduct,elemId);
					}	
				}
			}	}).inject(document.querySelector(elemId));
	   }
	   			
	
		if(myWidget.Type=="Bio_Product"){
			//console.log("\n\n objData[i].Name:::"+objData[i].Name)
		//UWA.createElement('h3',{
		//		text:objData[i].Name
		//		}).inject(objectDiv);
		
		
		UWA.createElement('h4',{
				text:objData[i].Title
				}).inject(objectDiv);
				
		UWA.createElement('h5',{
				text:objData[i].RunStatus
				}).inject(objectDiv);
				
		UWA.createElement('h6',{
				text:objData[i].Owner
				}).inject(objectDiv);
				
		
		}
			

	}
    
},




callData : function(elemId){

	//clear
	widget.body.getElement(elemId).empty();
		
			var wdgUrl = widget.getUrl();
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
			wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
            var url = wdgUrl + "/SimulationWidget/SimulationWidgetSevice/Preference";
                WAFData.authenticatedRequest(url, {
                    method: 'GET',
                    crossOrigin: true,
                    type: 'jsonp',
                    timeout: 700000,
                    accept: 'application/json',
                    data: {
                        preference: templatePref
                    },
                    onComplete: function (dataResp) {
                        console.log("\n\n dataResp"+dataResp);
                        jsonArray = JSON.stringify(dataResp);
						//console.log("myWidget.allTasks.taskData"+myWidget.allTasks.taskData);
                        jsonArray = JSON.parse(dataResp);
						
                        myWidget.allTasks = jsonArray;
                        myWidget.columnLabels = jsonArray.columnLabel;
                        myWidget.isMaplistEmpty = jsonArray.isMapListEmpty;
						console.log("\n \n myWidget.allTasks.taskData"+myWidget.allTasks.taskData);
						myWidget.fullData=myWidget.allTasks.taskData;
						//debugger;
						var elemId1="#Bio_Product";
						
						console.log("\n templatePref:::"+templatePref);
						//if(templatePref==="Completed" ){
						//myWidget.ListProduct(myWidget.allTasks.taskData,dataResp,elemId1);
						myWidget.ListProduct(myWidget.allTasks.taskData,dataResp,elemId1);
						//}
			
			
			
					},
					onFailure: function(error){
						widget.body.innerHTML += "<p>Call Faillure</p>";
						widget.body.innerHTML += "<p>"+JSON.stringify(error)+"</p>";
						console.error("Call Faillure : "+JSON.stringify(error));
					}
				});




},



display : function(preference){
//console.log("In display function");
	var characterToggler = new Toggler({
		container: document.querySelector('#Biovia'),
		bind: document.querySelector('#Biovia-bios'),
		events: {
			onToggle: function () {
				var elem=arguments[0];
				//console.log(elem);
				if(elem.id==="product"){
					myWidget.Type="Bio_Product";
					myWidget.callData("#Bio_Product");
				}
			}
		}
	});
}

	
};		

return myWidget;
});
