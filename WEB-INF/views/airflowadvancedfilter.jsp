<div class="modal fade" id="airflowadvancedfilter" tabindex="-1" role="dialog"
		aria-labelledby="modal-form" style="display: none;" aria-hidden="true">
		<div class="modal-dialog modal- modal-dialog-centered modal-lg"
			role="document">
			<div class="modal-content">
				<div class="modal-body p-0">
					<div class="card bg-secondary border-0 mb-0">
						<div class="card-header" style="height: 20px;background-color: #f5f5f5;">
							<div class="col">
								<h3 class="mb-0" style="margin-top: -11px;">Airflow - Advanced Filter</h3>
							</div>
						</div>
						<div class="card-body px-lg-5 py-lg-5">
						<div class="row">
						<div class="col-xl-12">
							<form role="form" class="row">
								<div class="form-group col-6">
									<label class="form-control-label">Start date</label> 
									<input class="form-control form-control-sm datepicker"	id="dagstartdate" placeholder="Start date" type="text" >
								</div>
								<div class="form-group col-6">
									<label class="form-control-label">End date</label> 
										<input 	class="form-control form-control-sm datepicker" id="dagenddate" placeholder="End date" type="text" >
								</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Dag Name</label> 
											<div class="autocomplete" style="width:300px;">
												<input type="text" class="form-control form-control-sm"	id="dagname" placeholder="type your dag name">
  											</div>
									</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Dag Run ID</label> <input
										type="text" class="form-control form-control-sm"
										id="dagrunid" placeholder="">
								</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlSelect1">Status</label> <select
										class="form-control form-control-sm"
										id="dagstatus" data-toggle="select">
										<option value="success">Success</option>
										<option value="failed">Failed</option>
										<option value="cancelled">Cancelled</option>
										<option value="running">Running</option>
									</select>
								</div>
								<div class="form-group col-6" style="display:none;">
									<label class="form-control-label"
										for="exampleFormControlInput1">Duration (X Minutes)</label> <input
										type="number" min="1" max="200" class="form-control form-control-sm"
										id="duration" placeholder="">
								</div>
								
								
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Assigned to</label> <input
										type="email" class="form-control form-control-sm"
										 id="assignedto" placeholder="">
								</div>
								<div class="form-group col-6" style="display:none;">
									<label class="form-control-label"
										for="exampleFormControlSelect1">Mail Sent</label> <select
										class="form-control form-control-sm"
										id="mailsent" data-toggle="select">
										<option>Yes</option>
										<option>No</option>
									</select>
								</div>
							</form>
							</div>
							<div class="col-xl-4" style="display:none">
							<h3 class="mb-0">Custom Options</h3><br>
							<button class="btn btn-icon btn-sm btn-primary" type="button" id="daggreater1hour" >
				                <span class="btn-inner--icon"><i class="ni ni-time-alarm"></i></span>
				                <span class="btn-inner--text">Duration > 1 Hour (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button" id="dagunattended">
				                <span class="btn-inner--icon"><i class="ni ni-calendar-grid-58"></i></span>
				                <span class="btn-inner--text">Unattended (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button" id="dagfailedday">
				                <span class="btn-inner--icon"><i class="ni ni-sound-wave"></i></span>
				                <span class="btn-inner--text">Failed Dags (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button" id="dagrunningtoday">
				                <span class="btn-inner--icon"><i class="ni ni-sound-wave"></i></span>
				                <span class="btn-inner--text">Running Dags (Today)</span>
              				</button></br></br>
              				<form role="form" class="row">
              				<div class="form-group col-12">
									<label class="form-control-label">Select by Month</label> 
									<input class="form-control form-control-sm"	id="afmonth" placeholder="Month" type="month" value="">
								</div>
              				</form>
							</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer" style="height: 20px;background-color: #f5f5f5;">
				<div class="row">
			        <div class="col-sm-6">
			        	<button type="button" id="dagadvancedfilterbtn" class="btn btn-sm btn-primary">Filter</button>
			        </div>
			        <div class="col-sm-6 ">
			        	<button type="button" id="afclear" class="btn btn-sm btn-warning" data-dismiss="modal">Clear</button>
			        </div>
			      </div>
                        </div>
			</div>
		</div>
	</div>