import React, { Component } from 'react';
const robohashAvatars = require("robohash-avatars");

class Header extends Component {
    // constructor(props) {
    //   super(props);
    // }


    render() {
      const {sidebarOpen, setSidebarOpen} = this.props
      const avatarURL = robohashAvatars.generateAvatar({   
        username: this.props.account,
        background: robohashAvatars.BackgroundSets.RandomBackground2,
        characters: robohashAvatars.CharacterSets.Robots,
        height: 200,
        width: 200
      });
      
    return (
      <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
        
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">

            {/* Header: Left side */}
            <div className="flex">

              {/* Hamburger button */}
              <button
                className="text-gray-500 hover:text-gray-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>

            </div>

            {/* Header: Right side */}
            <div className="flex items-center">

              {/** public address */}
              {
                this.props.account
                ? <React.Fragment>
                    <p className="address">{this.props.account}</p>
                    <hr className="w-px h-6 bg-gray-200 mx-3" />
                    <img
                      alt="avatar"
                      className='ml-2 circle'
                      width='30'
                      height='30'
                      src={avatarURL}
                    />
                  </React.Fragment>
                : <span className="red">wrong network</span>
              }
              </div>

          </div>
        </div>
      </header>
    );
  }
}
export default Header;