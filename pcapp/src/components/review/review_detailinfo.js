import React from 'react';


const ReviewDetailInfo = (props)=>{
	const {curpaientinfo,onClickDetail,onClickEvalute} = props;
	const {Patientno,Patientname} = curpaientinfo;
	return (
			<div className="module-box">
				<div className="module">
					<div className="module-top">
						<h2>{Patientno}<span>{Patientname}</span></h2>
						<p>
							<span className="fontSize13">普通压疮</span>
							<button type="" className="ant-btn-details" onClick={
								()=>{
									onClickDetail(curpaientinfo._id)
								}
							}>详细</button>
						</p>
					</div>
					<div className="module-bottom">
						<span>病床:左转45度</span>
						<p>
							<span className="state">在床</span>
							<span>压疮三区A15</span>
							<button type="" className="ant-btn-assess" onClick={
								()=>{
									onClickEvalute(curpaientinfo._id)
								}
							}>评估</button>
						</p>
					</div>
				</div>
			</div>
	)
}

export default ReviewDetailInfo;
