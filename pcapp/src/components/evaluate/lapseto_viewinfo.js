import React from 'react';


const ReviewDetailInfo = (props)=>{
	const {info} = props;
	const {evaluatebardenscore,created_at} = info;
	return (
		<ul>
			<li><div align="center">0001</div></li>
			<li><div align="center">张三丰</div></li>
			<li><div align="center">20250</div></li>
			<li><div align="center">皮肤科</div></li>
			<li><div align="center">{created_at}</div></li>
			<li><div align="center">{evaluatebardenscore}</div></li>
			<li><div align="center">杜拉拉</div></li>
			<li><div align="center">无无无-已审</div></li>
		</ul>
	)
}

export default ReviewDetailInfo;
