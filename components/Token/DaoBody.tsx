export const DaoBody: React.FC = () => {
  return (
    <>
      <ul>
        <h3>INFO:</h3>
        <li>Immutable Token is used for governance of the Immutable Organization.</li>
        <li>All fees collected by smart contracts operated by the Immutable Organization will be distributed proportionally to all token holders.</li>
      </ul>

      <ul>
        <h3>TOKEN:</h3>
        <li>ERC 20 Token.</li>
        <li>
          TOTAL SUPPLY: 20,000,000.
          <ul>
            <li>49% Liquidity Pool.</li>
            <li>20% Organization founders.</li>
            <li>11% Organization treasury.</li>
            <li>
              The remaining 20% will be under the control of the Organization until further progress has been made for phase 1.0. It will be decided if this
              remaining amount will be burned or unlocked.
            </li>
          </ul>
        </li>

        <li>
          Track IMT on DEXTools:{' '}
          <a target='_blank' href='https://www.dextools.io/app/en/arbitrum/pair-explorer/0x36a524072f8f2ec359428df28e7ec169d3a82807'>
            DEXTools link.
          </a>
        </li>
        <li>
          Arbitrum:{' '}
          <a target='_blank' href='https://arbiscan.io/token/0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1'>
            0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1
          </a>
        </li>
        <li>
          Mainnet:{' '}
          <a target='_blank' href='https://etherscan.io/token/0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e'>
            0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e
          </a>
        </li>
      </ul>
    </>
  );
};
