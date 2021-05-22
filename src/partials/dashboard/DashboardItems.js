import React, { Component } from 'react';
import swal from 'sweetalert';
const robohashAvatars = require("robohash-avatars");

class DashboardItems extends Component {

  render() {
    // console.log('images dasboard10 >>', this.props)
    return (
      <React.Fragment>
        { this.props.images.map((image, key) => {
          const avatarURL = robohashAvatars.generateAvatar({   
            username: image.author, 
            background: robohashAvatars.BackgroundSets.RandomBackground2,
            characters: robohashAvatars.CharacterSets.Robots,
            height: 200,
            width: 200
          });
        return (
          <div className="fit-content col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200"  key={key}>
            <header className="header_address px-5 py-4 border-b border-gray-100">
            <img
              alt="avatar"
              className='mr-2'
              width='30'
              height='30'
              src={avatarURL}
            />
            <small className="text-muted">{image.author}</small>
            </header>
            <div className="p-3">

              {/* Table */}
              <div className="overflow-x-auto">
                <img alt="posts" src={`https://ipfs.infura.io/ipfs/${image.hash}`} className="card-img-top"/>
                <div className="image-description">
                  <p>{image.description}</p>
                </div>
                  
              </div>

            </div>
            <footer className="border-t border-gray-100">
            <ul className="footer_block">
              <li className="first_list">Collected: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} DTH</li>
              <li className="right">
              <button
                  name={image.id}
                  onClick={(event) => {
                    let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                    // console.log(event.target.name, tipAmount)
                    swal({
                      title: 'Thank you',
                      text: 'for giving me some love!',
                      button: false,
                      timer: 2000
                    }).then(() => window.location.reload())
                    this.props.tipImageOwner(event.target.name, tipAmount)
                  }}
                >
                  Gimme some love 0.1 DTH
                </button>
              </li>
            </ul>
          </footer>
      </div>
    );
    })}
    </React.Fragment>
    )
  }
}

export default DashboardItems;
