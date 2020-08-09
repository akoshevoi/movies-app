// @flow
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import PasswordForget from '../PasswordForget/PasswordForget';

import SignUpSvgIcon from '../../assets/icons/SignUpSvgIcon';
import SignInSvgIcon from '../../assets/icons/SignInSvgIcon';
import PasswordForgetSvgIcon from '../../assets/icons/PasswordForgetSvgIcon';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    'id': `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

type Props = {
  onCloseModal: Function
};

const TabsRegistration = ({ onCloseModal }: Props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='tabs'>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Sign In' icon={<SignInSvgIcon />} {...a11yProps(0)} />
          <Tab label='Sign Up' icon={<SignUpSvgIcon />} {...a11yProps(1)} />
          <Tab
            label='Password Forget'
            icon={<PasswordForgetSvgIcon />}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <SignIn onCloseModal={onCloseModal} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <SignUp onCloseModal={onCloseModal} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <PasswordForget onCloseModal={onCloseModal} />
      </TabPanel>
    </div>
  );
};

export default TabsRegistration;
