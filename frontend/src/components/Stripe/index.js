import React from 'react';
import Web3 from 'web3';
import dateformat from 'dateformat';
import {Button} from 'antd';

class Stripe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlockNumber: 0,
      fetchingBlockNumber: true,
      blocks: []
    };
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"+props.infuraKey));
  }

  render() {
    if (this.state.fetchingBlockNumber) {
      return (
        <div >
          <p>Loading ...</p>
        </div>
      )
    } else {
      return (
        <div>
            <Button variant="flat"  color="primary" onClick={() => this.update()}>Update</Button>
            <div >
              <h3 variant="heading">Last Block</h3>
              <h3 variant="display2">{this.state.currentBlockNumber}</h3>
            </div>
          <h3 variant="heading">Recent Blocks</h3>
          {
            this.state.blocks.length > 0 ? (
                
                <div>
                  {this.state.blocks.map((block, index) => (
                    <div key={index}>
                      <p numeric>{block.number}</p>
                      <p>{block.hash.slice(2,9)}</p>
                      <p>{block.parentHash.slice(2,9)}</p>
                      <p numeric>{block.gasLimit}</p>
                      <p numeric>{block.gasUsed}</p>
                      <p numeric>{block.difficulty}</p>
                      <p>{dateformat(new Date(block.timestamp*1000), "yyyy/mm/dd HH:MM:ss")}</p>
                    </div>
                  ))}
                </div>
            ) : (
              <p variant="display1">No Data</p>
            )
          }
        </div>
      )
    }
  }

  async update() {
    let newState
    const fetchingState = Object.assign({}, this.state, {
      fetchingBlockNumber: true,
      blocks: [],
    });
    this.setState(fetchingState);

    const blockNumber = await this.web3.eth.getBlockNumber().catch(err => err);
    if(blockNumber instanceof Error || blockNumber == null) {
      alert("Error occured in web3.eth.getBlockNumber:", blockNumber);
      newState = Object.assign({}, this.state, {
        fetchingBlockNumber: true,
      });
      this.setState(newState);
      return;
    }
    newState = Object.assign({}, this.state, {
      currentBlockNumber: blockNumber,
      fetchingBlockNumber: false,
    });
    this.setState(newState);

    const blockCount = 20;
    for (let n = blockNumber; n > blockNumber - blockCount; n--) {
      const block = await this.web3.eth.getBlock(n).catch(err => err);
      if(block instanceof Error || block == null) {
        alert("Error occured in web3.eth.getBlock:", block);
        break;
      }
      let newBlocks = new Array(...this.state.blocks);
      newBlocks.push(block);
      newState = Object.assign({}, this.state, {blocks: newBlocks});
      this.setState(newState);
    }
  }

  async componentDidMount(){
    await this.update();
  }
}

export default Stripe;