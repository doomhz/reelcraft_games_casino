import React from 'react'
import {getUserInfo, createUser, deleteUser, updateUser} from '../utils/helpers';

class Profile extends React.Component {
  constructor(props){
    super(props)
    let key = "blah"
    this.state = {
      user: {}
    }
  }
  componentDidMount(){
    this.loadUser()
  }
  loadUser(){
    getUserInfo().then((data)=>
      this.setState({user: data.data})
    )
  }
  getBalance(){
    let activeWallet = this.getActiveWallet()
    return activeWallet ? activeWallet.balance : 0
  }
  getCurrency(){
    let activeWallet = this.getActiveWallet()
    return activeWallet ? activeWallet.currency : "free"
  }
  getActiveWallet(){
    return this.getWallets().find((wallet) => wallet.selected === true)
  }
  getWallets(){
    return this.state.user.wallets || []
  }
  onCreateUserClick(){
    createUser().then((data)=>
      this.setState({user: data.data})
    )
  }
  onSignoutClick(){
    deleteUser().then((data)=>
      this.setState({user: data.data})
    )
  }
  onCurrencyChange(e){
    updateUser({currency: e.target.value}).then((data)=>
      this.setState({user: data.data})
    )
  }
  render(){
    let menu;
    if (this.state.user.id) {
      menu = (
        <div>
          <span className="label label-success">{this.getBalance()}</span>
          <select name="currency" defaultValue={this.getCurrency()} onChange={this.onCurrencyChange.bind(this)}>
            {this.getWallets().map((wallet, index) => (
              <option value={wallet.currency} key={wallet.currency}>{wallet.currency.toUpperCase()}</option>
            ))}
          </select>
          <button className="btn btn-default" onClick={()=> this.onSignoutClick()}>Sign Out</button>
        </div>
      )
    } else {
      menu = <button className="btn btn-default" onClick={()=> this.onCreateUserClick()}>Create FREE account</button>
    }
    return (
      <div id="profile-data">
        {menu}
      </div>
    )
  } 
}

export default Profile