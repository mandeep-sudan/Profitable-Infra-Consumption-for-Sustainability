<div class="modal fade" id="modal-form1" tabindex="-1" role="dialog"
		aria-labelledby="modal-form" style="display: none;" aria-hidden="true">
		<div class="modal-dialog modal- modal-dialog-centered modal-lg"
			role="document">
			<div class="modal-content">
				<div class="modal-body p-0">
					<div class="card bg-secondary border-0 mb-0">
						<div class="card-header" style="height: 20px;background-color: #f5f5f5;">
							<div class="col">
								<h3 class="mb-0" style="margin-top: -11px;">Your Assignments Filter</h3>
							</div>
						</div>
						<div class="card-body px-lg-5 py-lg-5">
						<div class="row">
						<div class="col-xl-12">
							<form role="form" class="row">
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Job ID</label> <input
										type="email" class="form-control form-control-sm"
										id="exampleFormControlInput1" placeholder="name@example.com">
								</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Job Name</label> <input
										type="email" class="form-control form-control-sm"
										id="exampleFormControlInput1" placeholder="name@example.com">
								</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlSelect1">Status</label> <select
										class="form-control form-control-sm"
										id="exampleFormControlSelect1" data-toggle="select">
										<option>Job State Done</option>
										<option>Job State Failed</option>
										<option>Job State Cancelled</option>
										<option>Job State Running</option>
									</select>
								</div>
								<div class="form-group col-6">
									<label class="form-control-label"
										for="exampleFormControlInput1">Duration (Greater than)</label> <input
										type="email" class="form-control form-control-sm"
										id="exampleFormControlInput1" placeholder="HH:MM:SS">
								</div>
								
								<div class="form-group col-6">
												<label class="form-control-label">Start date</label> <input
													class="form-control form-control-sm"
													placeholder="Start date" type="text" value="06/18/2018">
											</div>
											<div class="form-group col-6">
												<label class="form-control-label">End date</label> <input
													class="form-control form-control-sm" placeholder="End date"
													type="text" value="06/22/2018">
											</div>
							</form>
							</div>
							<div class="col-xl-4" style="display:none">
							<h3 class="mb-0">Custom Options</h3><br>
							<button class="btn btn-icon btn-sm btn-primary" type="button">
				                <span class="btn-inner--icon"><i class="ni ni-time-alarm"></i></span>
				                <span class="btn-inner--text">Duration > 1 Hour (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button">
				                <span class="btn-inner--icon"><i class="ni ni-calendar-grid-58"></i></span>
				                <span class="btn-inner--text">Unattended (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button">
				                <span class="btn-inner--icon"><i class="ni ni-sound-wave"></i></span>
				                <span class="btn-inner--text">Failed Jobs (Today)</span>
              				</button></br></br>
              				<button class="btn btn-icon btn-sm btn-primary" type="button">
				                <span class="btn-inner--icon"><i class="ni ni-sound-wave"></i></span>
				                <span class="btn-inner--text">Running Jobs (Today)</span>
              				</button></br></br>
							</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer" style="height: 20px;background-color: #f5f5f5;">
				<div class="row">
			        <div class="col-sm-6">
			        	<button type="button" class="btn btn-sm btn-primary">Filter</button>
			        </div>
			        <div class="col-sm-6 ">
			        	<button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Clear</button>
			        </div>
			      </div>
                        </div>
			</div>
		</div>
	</div>