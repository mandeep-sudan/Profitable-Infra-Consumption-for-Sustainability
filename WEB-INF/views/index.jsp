<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" >
  <meta name="author" content="Global Payments">
  <title>Dashboard</title>
  <link rel="icon" href="../assets/img/brand/favicon.png" type="image/png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
  <link rel="stylesheet" href="../assets/css/nucleo.css" type="text/css">
  <link rel="stylesheet" href="../assets/css/all.min.css" type="text/css">
  <link rel="stylesheet" href="../assets/css/animate.min.css">
  <link rel="stylesheet" href="../assets/css/sweetalert2.min.css">
  <link rel="stylesheet" href="../assets/css/select2.min.css">
  <link rel="stylesheet" href="../assets/css/argon.css?v=1.1.0" type="text/css">
<style>
.border-line {
	border-right: 1px solid #cccaca;
}

tbody {
	height: 200px !important; /* Just for the demo          */
	overflow-y: auto; /* Trigger vertical scroll    */
	overflow-x: hidden; /* Hide the horizontal scroll */
}

.card .table td, .card .table th {
	padding-top: 5px;
	padding-bottom: 5px;
	font-size: 12px;
}

.card .table td, .card .table th {
	font-size: 12px;
	padding: 5px 10px;
}

.nav-pills .nav-link {
	font-size: 12px;
	padding: 5px 15px;
}

.sortstyle {
	font-size: .875rem;
	font-weight: 600;
	line-height: 1.5;
	padding-right: 15px;
}
.placeholder {
    width: 300;
    height: 300;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('my_placeholder.png');
}
/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9; 
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important; 
  color: #ffffff; 
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #0080007a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
</head>

<body class="pace-done mini-navbar">

<div class="modal" id="pleasewait" role="dialog" style="display:none">
		 <center><img src="../assets/img/icons/loading.gif" style="height: 52px;margin-top: 300px;"></img></center>
	</div>
	
   <%@include file="navbar.jsp"%>
   
  <div class="main-content" id="panel">
    <div class="header bg-primary pb-6" id="topbar-section">
    
      <!-- ========================================== TOP BAR SECTION ============================================== -->
      
    </div>
    <div class="container-fluid mt--6" id="body_section">
        
        <!-- ========================================== BODY SECTION ============================================== -->
        </div>
        
  </div>
  <%@include file="assignments.jsp"%>
  
  <%@include file="assignto.jsp"%>
  
  <%@include file="notify.jsp"%>
  
  <%@include file="comment.jsp"%>
  
  <%@include file="slo.jsp"%>
  
  <%@include file="airflowadvancedfilter.jsp"%>
   
  <%@include file="dataflowadvancedfilter.jsp"%>
   
  <%@include file="airflow.jsp"%>
  
  <script src="../assets/libs/jquery.min.js"></script>
  <script src="../assets/libs/freeze-table.js"></script>
  <script src="../assets/libs/bootstrap.bundle.min.js"></script>
  <script src="../assets/libs/js.cookie.js"></script>
  <script src="../assets/libs/jquery.scrollbar.min.js"></script>
  <script src="../assets/libs/jquery-scrollLock.min.js"></script>
  <script src="../assets/libs/sweetalert2.min.js"></script>
  <script src="../assets/libs/bootstrap-notify.min.js"></script>
  <script src="../assets/libs/bootstrap-datepicker.min.js"></script>
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
 
  
  
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
 
  
  <script type="text/javascript" src="JS1/Loader/constants.js"></script>
  <script type="text/javascript" src="JS1/Library/underscore.js"></script>
	<script type="text/javascript" src="JS1/Library/backbone-min.js"></script>
	<script type="text/javascript" src="JS1/Library/BackboneData.js"></script>
	<script type="text/javascript" src="JS1/Loader/initializer.js"></script>
	
	<script type="text/javascript" src="JS1/Backbone/View/airflowlist-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dataflowlist-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/airflowTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/composerTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/composerlist-RenderView.js"></script>
	
	<script type="text/javascript" src="JS1/Backbone/View/dqauditlist-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dqauditTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dqqualitylist-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dqqualityTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dqtimeseries-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dqtimeSeriesTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/postrequests-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/onPremtoCloudTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/tokenizationTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/onpremtocloud-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/tokenization-RenderView.js"></script>
	
	
	
	<script type="text/javascript" src="JS1/Backbone/View/dataflowTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/summary-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/summaryTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dimsAlertTopbar-RenderView.js"></script>
	<script type="text/javascript" src="JS1/Backbone/View/dimsalert-RenderView.js"></script>
	<script type="text/javascript" src="SOY/SoyUtils/soyutils.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/airflowlist-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/composerpage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dataflowlist-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/airflow-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/composer-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dimsalert-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dataflow-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/summarypage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/summary-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/onpremtocloud-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/tokenization-topbar-view.js"></script>
	
	
	
	<script type="text/javascript" src="SOY/SoyViewJs/onpremtocloudpage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/tokenizationpage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqauditpage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqaudit-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqqualitypage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqquality-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqtimeseriespage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dqtimeseries-topbar-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/postrequestspage-view.js"></script>
	<script type="text/javascript" src="SOY/SoyViewJs/dimsalert-view.js"></script>
	<link rel="stylesheet" href="../assets/css/select2.min.css">
  	<link rel="stylesheet" href="../assets/css/argon.css?v=1.1.0" type="text/css">
  	
	
	
	
  <script>
	var placement = $(this).attr('data-placement');
	var align = $(this).attr('data-align');
	var icon = $(this).attr('data-icon');
	var type = $(this).attr('data-type');
	var animIn = $(this).attr('data-animation-in');
	var animOut = $(this).attr('data-animation-out');
	var indexcount =0;
	var bqindexcount=0;
	var afdurationsort = false;
	var afexecutionsort = true;
	var afstatussort = false;
	
	var dfdurationsort = false;
	var dfexecutionsort = true;
	var dfstatussort = false;
	
	var dimsexecutiondatesort = true;
	var dimserrorcodesort = false;
	var dimsstatesort = false;
	
	var today_date=getCurrentDate();	
	document.getElementById("component_check_start_date_1").value = today_date;
	document.getElementById("component_check_end_date_1").value = today_date;
	document.getElementById("rule_execution_from_date_txt_q").value = today_date;
	document.getElementById("rule_execution_to_date_txt_q").value = today_date;
	document.getElementById("create_from_date_txt_q").value = today_date;
	document.getElementById("create_to_date_txt_q").value = today_date;
	
	document.getElementById('dfstatus').selectedIndex = -1;
	document.getElementById('dfmailsent').selectedIndex = -1;
	document.getElementById('mailsent').selectedIndex = -1;
	document.getElementById('dagstatus').selectedIndex = -1;
	document.getElementById('state').selectedIndex = -1;
	
</script>
	
	<script type="text/javascript" src="JS1/Actions/common.js?"></script>
	<script type="text/javascript" src="JS1/Fetch/fetch.js?"></script>
	<script type="text/javascript" src="JS1/Actions/renderview.js?"></script>
	<script type="text/javascript" src="JS1/Actions/populate.js"></script>
	<script type="text/javascript" src="JS1/Routers/router.js"></script>
	<script type="text/javascript" src="JS1/Actions/clicks.js"></script>
	<script type="text/javascript" src="JS1/Actions/sort.js"></script>
	<script type="text/javascript" src="JS1/Actions/tsorter.min.js"></script>
	<script type="text/javascript" src="JS1/Actions/myalerts.js"></script>
	<script type="text/javascript" src="../assets/libs/select2.min.js"></script>
	<script src="../assets/libs/list.min.js"></script>
	<script src="../assets/libs/demo.min.js"></script>
	<script src="../assets/libs/argon.js?v=1.1.0"></script>
	
	
</body>

</html>