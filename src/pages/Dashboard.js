import React, { Component } from 'react';
import GhettoImages from '../abis/GhettoImages.json'
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardItems from '../partials/dashboard/DashboardItems';
import Web3 from 'web3';
import swal from 'sweetalert';


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      account: '',
      GhettoImages: null,
      images: [],
      loading: true
    }
    this.setSidebarOpen = this.setSidebarOpen.bind(this)
    this.setSidebarClose = this.setSidebarClose.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  setSidebarOpen() {
    this.setState({sidebarOpen: true})
  }

  setSidebarClose() {
    this.setState({sidebarOpen: false})
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }



  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      swal({
        title: "Warning",
        text: "Non-Ethereum browser detected. You should consider trying MetaMask! and connect to devETH Network!",
        icon: "warning",
      }).then(() => window.location.reload());
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    // console.log('account >>>', accounts)
    this.setState({ account: accounts[0] })
    // // Network ID
    const networkId = await web3.eth.net.getId()
    // console.log('networkId', networkId)
    const networkData = GhettoImages.networks[networkId]
    // console.log('networkData', networkData)
    if(networkData) {
      const ghettoimages = new web3.eth.Contract(GhettoImages.abi, networkData.address)
      this.setState({ ghettoimages })
      const imagesCount = await ghettoimages.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await ghettoimages.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }

      // console.log('this images >>>', this.state.images.flatMap(x => x.id))
      // Sort images. Show highest tipped images first
      // this.setState({
      //   images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      // })
      // this.sortHighestCollectedTips();
      this.sortTheNewesPost();

      this.setState({ loading: false})

    } else {
      swal({
        title: "Wrong Network!",
        text: "Please switch to devETH Network!.",
        icon: "warning",
      }).then(() => window.location.reload());
    }
  }

  async sortHighestCollectedTips() {
    this.setState({
      images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
    })
  }

  async sortTheNewesPost() {
    this.setState({
      images: this.state.images.reverse()
    })
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      // console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      // console.log('Ipfs result', result)
      if(error) {
        swal({
          title: "Warning",
          text: error,
          icon: "warning",
        });
        return
      }

      this.setState({ loading: true })
      this.state.ghettoimages.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.ghettoimages.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  // const [sidebarOpen, setSidebarOpen] = useState(false)
  render() {
    const {sidebarOpen, account} = this.state

    // console.log('images dasboard >>', this.state)
    return (
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={this.setSidebarClose} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={this.setSidebarOpen} account={account} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">
                {/* Card (Customers) */}
                {
                  this.state.loading
                  ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                  : (this.state.images === [])
                  ? <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                      <header className="px-5 py-4 border-b border-gray-100">
                        <h1>You Dont have any posts yet</h1>
                      </header>
                    </div>
                  : <DashboardItems 
                      images={this.state.images}
                      captureFile={this.captureFile}
                      // uploadImage={this.uploadImage}
                      tipImageOwner={this.tipImageOwner}
                   />
                }
              </div>
            </div>
          </main>

        </div>
      </div>
    );
    }
}


export default Dashboard;