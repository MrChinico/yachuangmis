import React from 'react';
import { Menu, Dropdown, Button, Icon, } from 'antd';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';

const DiseaseclassificationSelector = (props)=>{
  const {onChangeDiseaseclassification,curdiseaseclassification} = props;
  const  handleMenuClick = ({ item, key, keyPath })=>{
    if(!!onChangeDiseaseclassification){
      onChangeDiseaseclassification(key);
    }
  }

  let menus = [];
  menus.push(<Menu.Item key="0">所有病人</Menu.Item>);
  menus.push(<Menu.Item key="院前压疮">院前压疮病人</Menu.Item>);
  menus.push(<Menu.Item key="难免压疮">难免压疮病人</Menu.Item>);
  menus.push(<Menu.Item key="难免转院内">难免转院内病人</Menu.Item>);
  const menu = (
    <Menu onClick={handleMenuClick}>
      {menus}
    </Menu>
  );
  let curname = '所有病人';
  if(curdiseaseclassification !== '0'){
    curname = curdiseaseclassification;
  }

  return (<Dropdown overlay={menu}>
    <Button style={{ marginLeft: 8 }}>
       {curname}<Icon type="down" />
    </Button>
  </Dropdown>);
}


export default DiseaseclassificationSelector;
