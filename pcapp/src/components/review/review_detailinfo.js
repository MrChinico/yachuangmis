import React from 'react';
import lodashget from 'lodash.get';

const ReviewDetailInfo = (props)=>{
	const {info,onClickDetail,db} = props;
	const curpaientinfo = db.paientinfos[info.userpatientid];
	if(!curpaientinfo){
		return <tr></tr>
	}
	const curdepat = db.depats[curpaientinfo.depatid];
	const {evaluatebardenscore,created_at} = info;
	const Patientname = lodashget(curpaientinfo,'Patientname','');
	const Patientno = lodashget(curpaientinfo,'Patientno','');
	const Staffname = info.usercreatorid.Staffname;

	// const bedStatusString = lodashget(curpaientinfo,'bedid','') === ''?'离床':'在床';
	const depatName = curdepat.Depatname;
	let ApprovalString_headnurse = '未审';
	let ApprovalString_nursingdepartment = '未审';

	if(!!info.signed_nurse){
		ApprovalString_headnurse = '已审';
	}
	if(!!info.signed_nursingdepartment){
		ApprovalString_nursingdepartment = '已审';
	}
	// const bedName = lodashget(curpaientinfo,'bedid.Bedname','');
	// const smartDeviceString = lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.positionstring','') + lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.anglestring','');
	// const isInSmartBed = lodashget(curpaientinfo,'bedid.smartdeviceid','')===''?false:true;
	// const stateClassname = bedStatusString==='在床'?'statein':'stateoff';
	return (
		<tr>
			<td><div align="center">{Patientname}</div></td>
			<td><div align="center">{Patientno}</div></td>
			<td><div align="center">{depatName}</div></td>
			<td><div align="center">{created_at}</div></td>
			<td><div align="center">{evaluatebardenscore}</div></td>
			<td><div align="center">{Staffname}</div></td>
			<td><div align="center">{ApprovalString_headnurse}</div></td>
			<td><div align="center"  onClick={
				()=>{
					onClickDetail(info.userpatientid,info._id);
				}
			}>{ApprovalString_nursingdepartment}</div></td>
		</tr>
	)
}

export default ReviewDetailInfo;
