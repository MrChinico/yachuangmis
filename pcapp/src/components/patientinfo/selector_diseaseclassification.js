import React from 'react';
import { Menu, Dropdown, Button, Icon, } from 'antd';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';

const DiseaseclassificationSelector = (props)=>{
  const {input} = props;
  const  handleMenuClick = ({ item, key, keyPath })=>{
    if(!!input.onChange){
      input.onChange(key);
    }
  }

  let menus = [];
  menus.push(<Menu.Item key="普通病人">普通病人</Menu.Item>);
  menus.push(<Menu.Item key="院前压疮">院前压疮</Menu.Item>);
  menus.push(<Menu.Item key="压疮高危">压疮高危</Menu.Item>);

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
