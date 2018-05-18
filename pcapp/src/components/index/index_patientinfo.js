import React from 'react';
import lodashget from 'lodash.get';

const Paientinfo = (props)=>{
	const {curpaientinfo,onClickDetail,onClickEvalute} = props;
	const Patientname = lodashget(curpaientinfo,'Patientname','');
	const Patientno = lodashget(curpaientinfo,'Patientno','');
	const bedStatusString = lodashget(curpaientinfo,'bedid','') === ''?'离床':'在床';
	const depatName = lodashget(curpaientinfo,'depatid.Depatname','');
	const bedName = lodashget(curpaientinfo,'bedid.Bedname','');
	const smartDeviceString = lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.positionstring','') + lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.anglestring','');
	const isInSmartBed = lodashget(curpaientinfo,'bedid.smartdeviceid','')===''?false:true;
	const stateClassname = bedStatusString==='在床'?'statein':'stateoff';
	const Diseaseclassification = lodashget(curpaientinfo,'Diseaseclassification','普通病人');
	return (
			<div className="module-box">
				<div className="module">
					<div className="module-top">
						<h2>{Patientno}<span>{Patientname}</span></h2>
						<p>
							<span className="fontSize13">{Diseaseclassification}</span>
							<button type="" className="ant-btn-details" onClick={
								()=>{
									onClickDetail(curpaientinfo._id)
								}
							}>详细</button>
						</p>
					</div>
					<div className="module-bottom">
						 <span>病床:{isInSmartBed?smartDeviceString:'普通病床'}</span>
						<p>
							<span className={stateClassname}>{bedStatusString}</span>
							<span>{`${depatName}${bedName}`}</span>
							{
								Diseaseclassification !== '普通病人' && (<button type="" className="ant-btn-assess" onClick={
									()=>{
										onClickEvalute(curpaientinfo._id)
									}
								}>评估</button>)
							}

						</p>
					</div>
				</div>
			</div>
	)
}

export default Paientinfo;
