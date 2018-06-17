import React from 'react';
import { Menu, Dropdown, Button, Icon, } from 'antd';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';

const DiseaseclassificationSelector = (props)=>{
  const {input,Diseaseclassification} = props;
  const  handleMenuClick = ({ item, key, keyPath })=>{
    if(!!input.onChange){
      input.onChange(key);
    }
  }

  let menus = [];
  if(Diseaseclassification === '普通病人'){
    menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    menus.push(<Menu.Item key="院前压疮">院前压疮</Menu.Item>);
    menus.push(<Menu.Item key="院内压疮">院内压疮</Menu.Item>);
    menus.push(<Menu.Item key="难免压疮">难免压疮</Menu.Item>);
  }
  else if(Diseaseclassification === '院前压疮'){
    menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    menus.push(<Menu.Item key="院前压疮">院前压疮</Menu.Item>);
  }
  else if(Diseaseclassification === '院内压疮'){
    menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    menus.push(<Menu.Item key="院内压疮">院内压疮</Menu.Item>);
  }
  else if(Diseaseclassification === '难免压疮'){
    menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    menus.push(<Menu.Item key="难免压疮">难免压疮</Menu.Item>);
    menus.push(<Menu.Item key="难免转院内">难免转院内</Menu.Item>);
  }
  else if(Diseaseclassification === '难免转院内'){
    menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
    menus.push(<Menu.Item key="难免压疮">难免压疮</Menu.Item>);
    menus.push(<Menu.Item key="难免转院内">难免转院内</Menu.Item>);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menus}
    </Menu>
  );
  let curname = input.value;
  return (<Dropdown overlay={menu}>
    <Button style={{ marginLeft: 8 }}>
       {curname}<Icon type="down" />
    </Button>
  </Dropdown>);
}


export default DiseaseclassificationSelector;
