import React from 'react';


const ReviewDetailInfo = (props)=>{
	const {info,onClickDetail} = props;
	const {evaluatebardenscore,created_at} = info;
	return (
		<tr>
			<td><div align="center">0001</div></td>
			<td><div align="center">张三丰</div></td>
			<td><div align="center">20250</div></td>
			<td><div align="center">皮肤科</div></td>
			<td><div align="center">{created_at}</div></td>
			<td><div align="center">{evaluatebardenscore}</div></td>
			<td><div align="center">杜拉拉</div></td>
			<td><div align="center">无无无-已审</div></td>
			<td><div align="center"  onClick={
				()=>{
					onClickDetail(info._id)
				}
			}>待审</div></td>
		</tr>
	)
}

export default ReviewDetailInfo;
