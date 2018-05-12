import React from 'react';

const ContentTitleBar = (props)=>{
  const {title,titleNew,titleView,onClickNew,onClickViewPrint} = props;
  return (<div className="lapseto">
    <span>{title}</span>
    {
      !!onClickNew &&  (<button  onClick={
            ()=>{
              onClickNew();
            }
          } className="ant-btn"><img src="add.png" alt=""/>
          {titleNew}</button>)
    }

    {
      !!onClickViewPrint && (
        <button onClick={
          ()=>{
            onClickViewPrint();
          }
        } className="ant-btn"><img src="printing.png"  alt=""/>{titleView}</button>
      )
    }

  </div>);
}

export default ContentTitleBar;
