import { NextPage } from 'next';
import React from 'react';
import { Frame } from '../components/Frame';
import { BuyBody } from '../components/Token/BuyBody';

const Buy: NextPage = () => {
  return (
    <div className='token-page'>
      <Frame className={'padding token-box'} headerText={'BUY IMT'} body={() => <BuyBody />} />
    </div>
  );
};
export default Buy;
