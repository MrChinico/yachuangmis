import React from 'react';
import { Menu, Dropdown, Button, Icon, } from 'antd';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

const DepatSelect = (props)=>{
  const {onChangeDepat,db,curdepatid} = props;
  const  handleMenuClick = ({ item, key, keyPath })=>{
    if(!!onChangeDepat){
      onChangeDepat(key);
    }
  }

  // 菜单数组 
  let menus = [];
  menus.push(<Menu.Item key="0">所有科室</Menu.Item>);
  const {depats} = db;
  lodashmap(depats,(depat)=>{
    menus.push(<Menu.Item key={`${depat._id}`}>{`${depat.Depatname}`}</Menu.Item>);
  });
  const menu = (
    <Menu onClick={handleMenuClick}>
      {menus}
    </Menu>
  );
  let curdepatname = '所有科室';
  if(curdepatid !== '0'){
    curdepatname = lodashget(depats,`${curdepatid}.Depatname`,curdepatname);
  }

  return (<Dropdown overlay={menu}>
    {/* 这里是第一题的修改地点，由于ANTD的Button类有默认的样式对应所以导致样式混乱 */}
    {/* 解决方案使用高优先级的样式替换或者修改Button的默认样式选择器中的内容 */}
    <Button style={{ height:100+'%', marginLeft: 8 }}> 
       {curdepatname}<Icon type="down" />
    </Button>
  </Dropdown>);
}


export default DepatSelect;
