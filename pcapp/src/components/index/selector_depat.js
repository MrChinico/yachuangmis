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
    <Button style={{ marginLeft: 8 }}>
       {curdepatname}<Icon type="down" />
    </Button>
  </Dropdown>);
}


export default DepatSelect;
